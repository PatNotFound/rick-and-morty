import React from 'react';
import { ReactElement, useState } from 'react';
import { CharacterType } from '../../../types/character';
import Modal from './Modal';

const COLOR = {
  Alive: 'text-green-600',
  Dead: 'text-red-600',
  unknown: 'text-gray-600',
};

function Card(character: CharacterType): ReactElement {
  const {
    episode,
    gender,
    id,
    image,
    location: { name: locationName },
    name,
    origin: { name: originName },
    species,
    status,
  } = character;

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const toggleModalVisibility = () => setModalIsVisible(!modalIsVisible);

  return (
    <li>
      <button
        className="flex w-full cursor-pointer items-center gap-4 rounded-xl p-6 shadow-xl"
        onClick={() => toggleModalVisibility()}
        aria-label={`${name} card`}
      >
        <img src={image} alt={`${name}-${id}`} className="h-24 rounded-full" />
        <div className="truncate text-left">
          <div className="truncate text-lg font-medium">{name}</div>
          <div className="flex items-center gap-1">
            <i
              className={`fa-solid fa-circle text-xs ${
                COLOR[status as keyof typeof COLOR]
              } opacity-40`}
            />
            <span className="capitalize">{status}</span>
          </div>
          <div className="flex">
            {species === 'Human' ? '👤' : '👽'}{' '}
            <div className="ml-1 truncate capitalize">{species}</div>
          </div>
        </div>
        {modalIsVisible && (
          <Modal
            toggleVisibility={toggleModalVisibility}
            title={name}
            image={image}
            data={[
              { label: 'Status', value: status },
              { label: 'Species', value: species },
              { label: 'Gender', value: gender },
              { label: 'Location', value: locationName },
              { label: 'Origin', value: originName },
              { label: 'Number of appearances', value: episode.length },
            ]}
          />
        )}
      </button>
    </li>
  );
}

export default Card;
