import { Photo } from '../Search';

import './photo-card.scss';

interface PhotCardProps {
  name: string;
  surname: string;
  photo: Photo;
}
export default function PhotoCard({ name, surname, photo }: PhotCardProps) {
  return (
    <div className="photo-card">
      <div>
        <img
          src={photo.urls.thumb}
          alt={photo.alt_description || ''}
          width="200"
          height="134"
        />
        <h4>
          <b>{`${name} ${surname}`}</b>
        </h4>
      </div>
    </div>
  );
}
