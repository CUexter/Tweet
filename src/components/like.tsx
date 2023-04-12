import { api } from "@/utils/api";
import { Button } from "@mantine/core";
import {
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Like = () => {
  //check if it is liked or dislike or both not
  //if user onclick like
  //

  const { data: session } = useSession();
  const uid = session?.user.id;

  console.log(uid);
  if (!uid) {
    return <div>Loading...</div>;
  }
  const [isLoading, setIsLoading] = useState(true);
  const likeMutation = api.like.like.useMutation();
  const unLikeMutation = api.like.unLike.useMutation();
  const DislikeMutation = api.like.dislike.useMutation();
  const unDislikeMutation = api.like.undislike.useMutation();
  const likeQuery = api.like.checkLike.useQuery(
    {
      user_id: uid,
      tweet_id: "1234", //hardcode for now, please change this
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
    }
  );
  const dislikeQuery = api.like.checkDislike.useQuery(
    {
      user_id: uid,
      tweet_id: "1234", //hardcode for now, please change this
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
    }
  );
  const text1 = likeQuery.data ? "Liked" : "Unliked";
  const text2 = dislikeQuery.data ? "Disliked" : "UnDisliked";

  console.log(likeQuery.data);

  async function handleLikeClick() {
    if (likeQuery.data) {
      await unLikeMutation
        .mutateAsync({
          id: likeQuery.data.id,
        })
        .then(() => {
          void likeQuery.refetch();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          console.log("done");
        });
    } else {
      if (dislikeQuery.data) {
        await unDislikeMutation
          .mutateAsync({
            id: dislikeQuery.data.id,
          })
          .then(() => {
            void dislikeQuery.refetch();
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            console.log("done");
          });
      }

      await likeMutation
        .mutateAsync({
          user_id: uid,
          tweet_id: "1234", //hardcode for now, please change this
        })
        .then(() => {
          void likeQuery.refetch();
        })
        .catch(() => {
          console.log("error");
        })
        .finally(() => {
          console.log("done");
        });
    }
  }

  async function handleDislikeClick() {
    if (dislikeQuery.data) {
      await unDislikeMutation
        .mutateAsync({
          id: dislikeQuery.data.id,
        })
        .then(() => {
          void dislikeQuery.refetch();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          console.log("done");
        });
    } else {
      if (likeQuery.data) {
        await unLikeMutation
          .mutateAsync({
            id: likeQuery.data.id,
          })
          .then(() => {
            void likeQuery.refetch();
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            console.log("done");
          });
      }
      await DislikeMutation.mutateAsync({
        user_id: uid,
        tweet_id: "1234", //hardcode for now, please change this
      })
        .then(() => {
          void dislikeQuery.refetch();
        })
        .catch(() => {
          console.log("error");
        })
        .finally(() => {
          console.log("done");
        });
    }
  }

  return (
    <>
      {!isLoading && (
        <div>
          <Button variant="light" onClick={handleLikeClick}>
            {likeQuery.data ? <IconThumbUpFilled /> : <IconThumbUp />}
          </Button>
          <Button variant="light" onClick={handleDislikeClick}>
            {dislikeQuery.data ? <IconThumbDownFilled /> : <IconThumbDown />}
          </Button>
        </div>
      )}
    </>
  );
};

export default Like;
