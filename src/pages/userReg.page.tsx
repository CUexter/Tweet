import LoginWindow from "../components/LoginWindow";
import RegWindow from "../components/RegWindow";

const userReg = () => {
  return (
    <>
      {/*
      <Window title={"Sign In"} label="Submit" isOpen />
      */}
      <RegWindow />
      <LoginWindow />
    </>
  );
};

export default userReg;
