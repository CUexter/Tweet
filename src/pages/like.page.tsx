import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";

function MyComponent() {
  const [isLiked, setIsLiked] = useState(false);
  const icon = isLiked ? <IconHeartFilled /> : <IconHeart />;

  function handleClick() {
    setIsLiked(!isLiked);
  }

  return <div onClick={handleClick}>{icon}</div>;
}

const Like = () => {
  const [isLiked, setIsLiked] = useState(false);
  const icon = isLiked ? <IconHeartFilled /> : <IconHeart />;

  function handleClick() {
    setIsLiked(!isLiked);
  }

  return <div onClick={handleClick}>{icon}</div>;
};

export default Like;
