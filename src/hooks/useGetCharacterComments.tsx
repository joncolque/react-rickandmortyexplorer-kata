import { useQuery } from "@tanstack/react-query";
import { getCharacterComments } from "../services/character";

export const useGetCharacterComments = (id: number) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["comment", { id }],
    queryFn: () => getCharacterComments(id),
  })

  return {
    comments: data,
    isPending,
    error,
  }
};
