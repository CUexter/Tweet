import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export default (input: { userID: string }) => {
  const getProfile = api.profile.getProfile.useMutation();
  const [profile, setProfile] = useState("");
  async function fetchProfile() {
    const temp = await getProfile.mutateAsync({ id: input.userID });
    console.log(temp);
    if (temp != null) setProfile(temp);
    else setProfile("");
  }
  useEffect(() => {
    fetchProfile().catch(Error);
  }, []);

  return <>{profile}</>;
};
