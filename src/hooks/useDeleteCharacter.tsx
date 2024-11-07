import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCharacter } from "../services/character";

export const useDeleteCharacter = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteCharacter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['characters'],
      });
    }
  });

  const handleDeleteById = (id: number) => {
    return mutation.mutateAsync(id);
  };

  return {
    handleDeleteById,
  };
};
