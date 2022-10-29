import { useQuery } from "@tanstack/react-query";

const useFetchCharacterList = (searchParams: URLSearchParams) => {
  return useQuery(
    [
      "repoData",
      searchParams.get("name") || "",
      searchParams.get("species") || "",
      searchParams.get("status") || "",
      searchParams.get("gender") || "",
      searchParams.get("page") || "",
    ],
    ({ queryKey }) =>
      fetch(
        `https://rickandmortyapi.com/api/character?name=${queryKey[1]}&species=${queryKey[2]}&status=${queryKey[3]}&gender=${queryKey[4]}&page=${queryKey[5]}`
      ).then((res) => res.json())
  );
};

export default useFetchCharacterList;
