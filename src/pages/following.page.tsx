import { api } from "@/utils/api";
import { useState } from "react";

const Following = () => {
  const [isLoading, setIsLoading] = useState(true);
  const followingMutation = api.following.following.useMutation();
  const unFollowingMutation = api.following.unFollowing.useMutation();
  const followingQuery = api.following.checkFollowing.useQuery(
    {
      doing_following_ID: "123",
      being_followed_ID: "456",
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
    }
  );
  const text = followingQuery.data ? "True" : "False";

  console.log(followingQuery.data);

  function handleClick() {
    if (followingQuery.data) {
      unFollowingMutation
        .mutateAsync({
          id: followingQuery.data.id,
        })
        .then(() => {
          void followingQuery.refetch();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      followingMutation
        .mutateAsync({
          being_followed_ID: "456",
        })
        .then(() => {
          void followingQuery.refetch();
        })
        .catch(() => {
          console.log("error");
        });
    }
  }

  return (
    <>
      {!isLoading && (
        <div onClick={handleClick}>
          <button>{followingQuery.data ? "Followed" : "Follow"}</button>
          <h1>{text}</h1>
          <h1></h1>
        </div>
      )}
    </>
  );
};

export default Following;
