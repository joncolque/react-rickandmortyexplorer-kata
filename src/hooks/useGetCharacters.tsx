import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../services/character";
import { useEffect, useState } from "react";

export const useGetCharacters = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { isPending, error, data: response } = useQuery({
    queryKey: ["characters", { page: currentPage, name: searchQuery }],
    queryFn: () => getCharacters(currentPage, searchQuery),
    staleTime: 1000 * 60 * 1
  })

  const handleNext = () => {
    if (response?.info.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (response?.info.prev) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (value: string) => {
    setCurrentPage(1)
    setSearchQuery(value)
  };

  useEffect(() => {
    setErrorMessage(error ? 'No results found' : '')
  }, [error])

  return {
    currentPage,
    pages: response?.info.pages,
    handlePrev,
    handleNext,
    errorMessage,
    characters: response?.results ?? [],
    handleSearch,
    isPending
  }
};
