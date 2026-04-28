import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";

// Backend is minimal right now; these hooks provide future-proof wrappers
// that will call actual actor methods once backend methods are added.

export function useBackendActor() {
  return useActor(createActor);
}

export function usePing() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["ping"],
    queryFn: async () => {
      if (!actor) return null;
      return null; // will call actor method once added
    },
    enabled: !!actor && !isFetching,
  });
}
