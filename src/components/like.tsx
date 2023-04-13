import { api } from "@/utils/api";
import { ActionIcon, Text } from "@mantine/core";
import {
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Like = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const count = api.like.checkCount.useQuery(
    {
      tweet_id: id.id,
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
    }
  );

  const { data: session } = useSession();
  const uid = session?.user.id;

  if (!uid) {
    return (
      !isLoading && (
        <>
          <Text size="sm">{count.data}</Text>
          <div>
            <ActionIcon>
              <IconThumbUp />
            </ActionIcon>
            <ActionIcon>
              <IconThumbDown />
            </ActionIcon>
          </div>
        </>
      )
    );
  }

  //console.log(uid, id.id);

  const likeMutation = api.like.like.useMutation();
  const unLikeMutation = api.like.unLike.useMutation();
  const DislikeMutation = api.like.dislike.useMutation();
  const unDislikeMutation = api.like.undislike.useMutation();
  const likeQuery = api.like.checkLike.useQuery(
    {
      user_id: uid,
      tweet_id: id.id,
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
      tweet_id: id.id,
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
    }
  );

  console.log(likeQuery.data);
  console.log("here", count.data);

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
          tweet_id: id.id,
        })
        .then(() => {
          void likeQuery.refetch();
          void count.refetch();
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
        tweet_id: id.id,
      })
        .then(() => {
          void dislikeQuery.refetch();
          void count.refetch();
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
        <>
          <Text size="sm">{count.data}</Text>
          <div>
            <ActionIcon
              onClick={handleLikeClick}
              color={likeQuery.data ? "blue" : "gray"}
            >
              {likeQuery.data ? <IconThumbUpFilled /> : <IconThumbUp />}
            </ActionIcon>
            <ActionIcon
              onClick={handleDislikeClick}
              color={dislikeQuery.data ? "blue" : "gray"}
            >
              {dislikeQuery.data ? <IconThumbDownFilled /> : <IconThumbDown />}
            </ActionIcon>
          </div>
        </>
      )}
    </>
  );
};

export default Like;