//import axios from "axios";
import { useEffect, useState } from "react";

const Block = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const text = isBlocked ? "True" : "False";

  useEffect(() => {
    fetch("/api/checkblock", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data == "1") setIsBlocked(true);
      })
      .catch(() => {
        setIsLoading(false);
        console.log("error");
      });
  }, []);

  function handleClick() {
    if (isBlocked) {
      fetch("/api/unblock", {
        method: "PUT",
      })
        .then(() => {
          setIsBlocked(false);
        })
        .catch((error) => console.log("error"));
    } else {
      fetch("/api/block", {
        method: "PUT",
      })
        .then((response) => {
          setIsBlocked(true);
        })
        .catch((error) => console.log("error"));
    }
  }

  return (
    <>
      {!isLoading && (
        <div onClick={handleClick}>
          <button>{isBlocked ? "Following" : "Follow"}</button>
          <h1>{text}</h1>
          <h1></h1>
        </div>
      )}
    </>
  );
};

export default Block;
