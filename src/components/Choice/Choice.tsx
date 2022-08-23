import { Photo } from '../Search';

import './choice.scss';

interface ChoiceProps {
  photo: Photo;
  onChoice: (hasAccepted: boolean) => void;
}
export default function Choice({ photo, onChoice }: ChoiceProps) {
  const { user, urls } = photo;

  return (
    <div className="choice">
      <img
        className="img"
        src={urls.regular}
        alt={photo.alt_description || ''}
      />
      <a
        className="credit"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a>
      <div className="options">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();

            onChoice(true);
          }}
        >
          Accept
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();

            onChoice(false);
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
