import { api } from "@/utils/api";
import { useState } from "react";

const Retweet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const retweetMutation = api.retweet.retweet.useMutation();
  const deleteRetweetMutation = api.retweet.deleteRetweet.useMutation();
  const retweetQuery = api.retweet.checkRetweet.useQuery(
    {
      original_tweet_id: "1234",
      user_id: "123",
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
    }
  );
  const text = retweetQuery.data ? "True" : "False";

  console.log(retweetQuery.data);

  function handleClick() {
    if (retweetQuery.data) {
      deleteRetweetMutation
        .mutateAsync({
          id: retweetQuery.data.id,
        })
        .then(() => {
          void retweetQuery.refetch();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      retweetMutation
        .mutateAsync({
          original_tweet_id: "1234",
        })
        .then(() => {
          void retweetQuery.refetch();
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
          <button>{retweetQuery.data ? "Retweeted" : "Retweet"}</button>
          <h1>{text}</h1>
          <h1></h1>
        </div>
      )}
    </>
  );
};

export default Retweet;
