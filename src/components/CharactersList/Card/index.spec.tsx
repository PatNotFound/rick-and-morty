import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Card from ".";
import { CharacterType } from "../../../types/character";

describe("Card", () => {
  const getRender = (props: CharacterType) => render(<Card {...props} />);

  const mockedProps = {
    created: "2017-11-04T18:50:21.651Z",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
    ],
    gender: "Male",
    id: 2,
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    name: "Morty Smith",
    origin: { name: "unknown", url: "" },
    species: "Human",
    status: "Alive",
    type: "",
    url: "https://rickandmortyapi.com/api/character/2",
  };

  it("should render the component", () => {
    const { container } = getRender(mockedProps);

    expect(container).toMatchSnapshot();
  });

  it("should trigger the modal when clicking the card", () => {
    const { getByLabelText } = getRender(mockedProps);

    const card = getByLabelText(`${mockedProps.name}-card`);

    fireEvent.click(card);

    const modal = getByLabelText(`${mockedProps.name}-modal`);

    expect(modal).toBeInTheDocument();
  });
});
