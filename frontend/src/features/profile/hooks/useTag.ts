import { useQuery } from "@tanstack/react-query";
import { getTags } from "../profileAPI";

export const useTags = () => {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
    staleTime: Infinity,
  });

  return {
    tags: data?.map((tag) => tag.name) || [],
    isLoading,
    isError,
  };
};
