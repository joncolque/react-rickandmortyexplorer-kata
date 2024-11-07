import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCharacter } from "../services/character";
import { Character } from "../interfaces/character";

export const useUpdateCharacter = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedData: Character) => updateCharacter(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['character', id],
      });
      queryClient.invalidateQueries({
        queryKey: ['characters'],
      });

    }
  });

  const handleUpdate = (characterData: Character) => {
    return mutation.mutateAsync(characterData);
  };

  return {
    handleUpdate,
  };
};
