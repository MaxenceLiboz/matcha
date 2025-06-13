// FILE: src/features/tags/hooks/useTags.ts (NEW FILE)
import { useMutation } from "@tanstack/react-query";
import { Tag } from "../types";
import { getTags } from "../profileAPI";

export const useTags = () => {
  const {
    data,
    mutate: fetchTags,
    isPending: isTagsLoading,
    isIdle,
  } = useMutation<Tag[], Error>({
    mutationKey: ["tags"],
    mutationFn: getTags,
  });

  return {
    tags: data?.map((tag) => tag.name) || [],
    fetchTags,
    isTagsLoading,
    haveTagsBeenFetched: !isIdle,
  };
};
