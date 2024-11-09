import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../services/character";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useGetCharacters = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const name = searchParams.get("name");
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { isPending, error, data: response } = useQuery({
    queryKey: ["characters", { page, name }],
    queryFn: () => getCharacters(Number(page), name ?? ''),
    staleTime: 1000 * 60 * 1,
  })
  const navigate = useNavigate();

  const handleNext = () => {
    if (response?.info.next) {
      const path = response?.info.next.split('?')[1]
      navigate(`/?${path}`);
    }
  };

  const handlePrev = () => {
    if (response?.info.prev) {
      const path = response?.info.prev.split('?')[1]
      navigate(`/?${path}`);
    }
  };

  const handleSearch = (value: string) => {
    navigate(`/?page=${1}&name=${value}`);
  };

  useEffect(() => {
    if (error && error.message) {
      setErrorMessage(error?.message)
    } else {
      setErrorMessage('')
    }
  }, [error])

  return {
    currentPage: Boolean(page) ? Number(page) : 1,
    pages: response?.info.pages,
    handlePrev,
    handleNext,
    errorMessage,
    characters: response?.results ?? [],
    handleSearch,
    isPending,
    searchQuery: name
  }
};
