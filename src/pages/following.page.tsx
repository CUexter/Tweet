import ListTweet from "@/components/ListTweet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Following = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session?.user) {
    void router.push("/");
  }
  const following = ["uid1"];

  const filter = {
    user_id: { in: following },
  };

  return <ListTweet title="Following" filter={filter}></ListTweet>;
};

export default Following;
