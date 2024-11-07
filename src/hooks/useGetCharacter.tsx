import { useQuery } from "@tanstack/react-query";
import { getCharacter } from "../services/character";
import { Character } from "../interfaces/character";

export const useGetCharacter = (id: number) => {
  const { isPending, error, data: response } = useQuery({
    queryKey: ["characters", { id }],
    queryFn: () => getCharacter(id),
  })

  return {
    character: response as Character,
    isPending,
    error,
  }
};
