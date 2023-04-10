import { api } from "@/utils/api";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";

const Like = () => {
  const [isLoading, setIsLoading] = useState(true);
  const likeMutation = api.like.like.useMutation();
  const unLikeMutation = api.like.unLike.useMutation();
  const likeQuery = api.like.checkLike.useQuery(
    {
      user_id: "123", //hardcode for now
      tweet_id: "1234",
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
    }
  );
  const text = likeQuery.data ? "True" : "False";

  console.log(likeQuery.data);

  function handleClick() {
    if (likeQuery.data) {
      unLikeMutation
        .mutateAsync({
          id: likeQuery.data.id,
        })
        .then(() => {
          void likeQuery.refetch();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      likeMutation
        .mutateAsync({
          user_id: "123", //hardcode for now
          tweet_id: "1234",
        })
        .then(() => {
          void likeQuery.refetch();
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
          {likeQuery.data ? <IconHeartFilled /> : <IconHeart />}
          <button>{likeQuery.data ? "Liked" : "Like"}</button>
          <h1>{text}</h1>
          <h1></h1>
        </div>
      )}
    </>
  );
};

export default Like;
