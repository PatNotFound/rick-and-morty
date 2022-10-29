import React, { ReactElement } from "react";
import RickAndMortyTitle from "../../images/RickAndMortyTitle";
import CharactersList from "../CharactersList";

const CharactersPage = (): ReactElement => {
  return (
    <div className="flex w-full flex-col px-5">
      <h1 className="flex flex-col items-center justify-center p-4 text-gray-400">
        <RickAndMortyTitle />
        Wubba Lubba Dub Dub!
      </h1>
      <CharactersList />
    </div>
  );
};

export default CharactersPage;
