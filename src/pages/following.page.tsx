//import axios from "axios";
import { useEffect, useState } from "react";

const Following = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const text = isFollowed ? "True" : "False";

  useEffect(() => {
    fetch("/api/checkFollowing", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data == "1") setIsFollowed(true);
      })
      .catch(() => {
        setIsLoading(false);
        console.log("error");
      });
  }, []);

  function handleClick() {
    if (isFollowed) {
      fetch("/api/unfollow", {
        method: "PUT",
      })
        .then(() => {
          setIsFollowed(false);
        })
        .catch((error) => console.log("error"));
    } else {
      fetch("/api/follow", {
        method: "PUT",
      })
        .then((response) => {
          //() => {}  === function() {}
          setIsFollowed(true);
        })
        .catch((error) => console.log("error"));
    }
  }

  return (
    <>
      {!isLoading && (
        <div onClick={handleClick}>
          <button>{isFollowed ? "Following" : "Follow"}</button>
          <h1>{text}</h1>
          <h1></h1>
        </div>
      )}
    </>
  );
};

export default Following;
