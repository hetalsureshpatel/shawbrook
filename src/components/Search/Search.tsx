import { useState } from 'react';
import classNames from 'classnames';
import { createApi } from 'unsplash-js';

import useIsMounted from '../../hooks/useIsMounted';
import Spinner from '../Spinner';

import './search.scss';

export interface Photo {
  id: string;
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
  alt_description: string | null;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
}

enum TOPIC {
  PLACE_HOLDER = '',
  TRAVEL = 'Travel',
  CARS = 'Cars',
  WILDLIFE = 'Wildlife',
  TECH = 'Technology',
  OTHER = 'Other',
}

const api = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_KEY as string,
});

interface SearchProps {
  onSearch: (name: string, surname: string, photo: Photo) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const isMounted = useIsMounted();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [other, setOther] = useState('');
  const [topic, setTopic] = useState<TOPIC>(TOPIC.PLACE_HOLDER);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="search">
          <h4>Search</h4>
          <form>
            <label htmlFor="name-input">Name</label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="surname-input">Surname</label>
            <input
              id="surname-input"
              type="text"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
            <label htmlFor="topic-selective">Preferred Topic</label>
            <select
              id="topic-selective"
              value={topic}
              onChange={(e) => {
                let topic: TOPIC;

                switch (e.target.value) {
                  case TOPIC.TRAVEL:
                    topic = TOPIC.TRAVEL;
                    break;

                  case TOPIC.CARS:
                    topic = TOPIC.CARS;
                    break;

                  case TOPIC.WILDLIFE:
                    topic = TOPIC.WILDLIFE;
                    break;

                  case TOPIC.TECH:
                    topic = TOPIC.TECH;
                    break;

                  case TOPIC.OTHER:
                    topic = TOPIC.OTHER;
                    break;

                  default:
                    topic = TOPIC.PLACE_HOLDER;
                    break;
                }

                setTopic(topic);
              }}
            >
              <option value={TOPIC.PLACE_HOLDER}>Please select a topic</option>
              <option value={TOPIC.TRAVEL}>{TOPIC.TRAVEL}</option>
              <option value={TOPIC.CARS}>{TOPIC.CARS}</option>
              <option value={TOPIC.WILDLIFE}>{TOPIC.WILDLIFE}</option>
              <option value={TOPIC.TECH}>{TOPIC.TECH}</option>
              <option value={TOPIC.OTHER}>{TOPIC.OTHER}</option>
            </select>
            <input
              id="other-input"
              type="text"
              className={classNames({ hidden: topic !== TOPIC.OTHER })}
              value={other}
              onChange={(e) => {
                setOther(e.target.value);
              }}
            />
          </form>
          <button
            type="button"
            onClick={() => {
              if (name && surname) {
                let t: string = '';

                if (topic === TOPIC.OTHER && other) {
                  t = other;
                } else if (topic !== TOPIC.OTHER) {
                  t = topic;
                }

                if (t) {
                  setIsLoading(true);
                  api.search
                    .getPhotos({ query: t, page: 1, perPage: 1 })
                    .then((response) => {
                      if (
                        isMounted() &&
                        response.status === 200 &&
                        response.response !== undefined &&
                        response.response.results.length > 0
                      ) {
                        onSearch(
                          name,
                          surname,
                          response.response.results[0] as Photo
                        );
                        setIsLoading(false);
                      }
                    })
                    .catch(() => {
                      console.log('something went wrong!');
                      setIsLoading(false);
                      setName('');
                      setSurname('');
                      setTopic(TOPIC.PLACE_HOLDER);
                    });
                }
              }
            }}
          >
            Search
          </button>
        </div>
      )}
    </>
  );
}
