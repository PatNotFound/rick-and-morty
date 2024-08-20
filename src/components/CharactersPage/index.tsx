import { ReactElement } from 'react';
import RickAndMortyTitle from '../../images/RickAndMortyTitle';
import CharactersList from '../charactersList';

const CharactersPage = (): ReactElement => {
  return (
    <div className="flex h-full w-full flex-col px-5">
      <h1 className="flex w-max flex-col items-center p-4 text-gray-400">
        <RickAndMortyTitle />
        Wubba Lubba Dub Dub!
      </h1>
      <CharactersList />
    </div>
  );
};

export default CharactersPage;
