import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putCharacterComment } from "../services/character";

export const usePutCharacterComment = (id: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedData: { message: string }) => putCharacterComment(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['characters'],
      });
    },
  });

  const handlePutCharacterComment = (characterData: { message: string }) => {
    return mutation.mutateAsync(characterData);
  };

  return {
    handlePutCharacterComment,
  };
};
