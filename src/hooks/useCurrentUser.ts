import grab from "@/server/grab";
import useSWR from "swr";

const useCurrentUser = () => {
  // Call the api to get the current user and store it as global state
  // So we only need to run once to obtain it
  /* eslint-disable */
  const { data, error, isLoading, mutate } = useSWR("/api/current", grab);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
  /* eslint-enable */
};

export default useCurrentUser;
