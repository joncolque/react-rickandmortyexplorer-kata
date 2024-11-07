import { useQuery } from "@tanstack/react-query";
import { getLocations } from "../services/character";

export const useGetLocations = () => {
  const { isPending, error, data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: () => getLocations(),
    staleTime: 1000 * 60 * 5
  })

  return {
    locations,
    isPending,
    error,
  }
};
