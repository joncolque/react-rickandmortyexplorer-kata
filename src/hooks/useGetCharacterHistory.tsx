import { useQuery } from "@tanstack/react-query";
import { getCharacterHistory } from "../services/character";

export const useGetCharacterHistory = (id: number) => {
  const { isPending, error, data: response } = useQuery({
    queryKey: ["history", { id }],
    queryFn: () => getCharacterHistory(id),
  })

  return {
    history: response,
    isPending,
    error,
  }
};
