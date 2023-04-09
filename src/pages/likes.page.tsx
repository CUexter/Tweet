import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
//import axios from "axios";
import { useState } from "react";

const Like = () => {
  //when we load the tweet, we need to know whether or not the user has liked the tweet before
  //I need to get the userID
  //I need to get the tweetID
  //if liked, send the userID and tweetID to database
  //if unliked, send the userID and tweetID to database and delete the record
  //const userID = "1234";
  //const tweetID = "5678";
  const [isLiked, setIsLiked] = useState(false);
  const icon = isLiked ? <IconHeartFilled /> : <IconHeart />;
  const text = isLiked ? "True" : "False";
  console.log("HI");
  function temp() {
    const response = fetch("/api/checklike", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data == "1") setIsLiked(true);
      })
      .catch((error) => console.log("error"));
  }

  temp();

  function handleClick() {
    if (isLiked) {
      //is it okay if I don't use async await here?
      const response = fetch("/api/unlike", {
        method: "PUT",
      }).catch((error) => console.log("error"));
    } else {
      const response = fetch("/api/like", {
        method: "PUT",
      }).catch((error) => console.log("error"));
    }
    setIsLiked(!isLiked);
  }

  return (
    <div onClick={handleClick}>
      {icon}

      <h1>{text}</h1>
      <h1></h1>
    </div>
  );
};

export default Like;
