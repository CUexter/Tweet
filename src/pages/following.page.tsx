import ListTweet from "@/components/ListTweet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Following = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user) {
      void router.push("/");
    }
  }, [session, router]);
  const following = ["uid1"];

  const filter = {
    user_id: { in: following },
  };

  return <ListTweet title="Following" filter={filter}></ListTweet>;
};

export default Following;
