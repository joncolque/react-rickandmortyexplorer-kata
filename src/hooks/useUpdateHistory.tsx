import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHistory } from "../services/character";
import { Character } from "../interfaces/character";

export const useUpdateHistory = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedData: Character) => updateHistory(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['history'],
      });
    },
  });

  const handleUpdateHistory = (characterData: Character) => {
    return mutation.mutateAsync(characterData);
  };

  return {
    handleUpdateHistory,
  };
};
