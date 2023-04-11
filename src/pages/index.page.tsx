import { type NextPage } from "next";
import UserSetting from "./Setting/userSetting";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <UserSetting />
      </main>
    </>
  );
};

export default Home;
