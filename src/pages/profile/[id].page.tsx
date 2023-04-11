import Profile from "@/components/profile/profile";
import { useRouter } from "next/router";

//copied from tweet module, thx Graham!
const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const pid = typeof id === "string" ? id : "error";
  if (pid === "error") return <>you shouldnt be here</>;
  return (
    <>
      {/* Main tweet */}
      <Profile userID={pid} />
    </>
  );
};

export default ProfilePage;
