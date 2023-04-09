import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
//import axios from "axios";
import { useEffect, useState } from "react";

const Like = () => {
  //when we load the tweet, we need to know whether or not the user has liked the tweet before
  //I need to get the userID
  //I need to get the tweetID
  //if liked, send the userID and tweetID to database
  //if unliked, send the userID and tweetID to database and delete the record
  //const userID = "1234";
  //const tweetID = "5678";
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const icon = isLiked ? <IconHeartFilled /> : <IconHeart />;
  const text = isLiked ? "True" : "False";

  useEffect(() => {
    fetch("/api/checklike", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data == "1") setIsLiked(true);
      })
      .catch(() => {
        setIsLoading(false);
        console.log("error");
      });
  }, []);

  function handleClick() {
    if (isLiked) {
      //is it okay if I don't use async await here?
      fetch("/api/unlike", {
        method: "PUT",
      })
        .then(() => {
          setIsLiked(false);
        })
        .catch((error) => console.log("error"));
    } else {
      fetch("/api/like", {
        method: "PUT",
      })
        .then((response) => {
          //() => {}  === function() {}
          setIsLiked(true);
        })
        .catch((error) => console.log("error"));
    }
  }

  return (
    <>
      {!isLoading && (
        <div onClick={handleClick}>
          {isLiked ? <IconHeartFilled /> : <IconHeart />}
          <h1>{text}</h1>
          <h1></h1>
        </div>
      )}
    </>
  );
};

export default Like;
