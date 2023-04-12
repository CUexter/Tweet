import UserProfile from "@/components/profile";
import { useRouter } from "next/router";

// interface TweetPageProp {}

const TweetPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const uid = typeof id === "string" ? id : "error";

  return <UserProfile id={uid} />;
};

export default TweetPage;
