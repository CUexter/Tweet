import { PrismaClient } from "@prisma/client";
import { useCallback, useState } from "react";

import useLoginWindow from "../../hooks/useLoginWindow";
import useRegWindow from "../../hooks/useRegWindow";
import InputField from "../InputField";
import Window from "../Window";

const LoginWindow = () => {
  const loginWindow = useLoginWindow();
  const regWindow = useRegWindow();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    return;
  };

  const onToggle = useCallback(() => {
    if (isLoading) return;

    loginWindow.onClose();
    regWindow.onOpen();
  }, [isLoading, regWindow, loginWindow]);

  const onSubmit = useCallback(() => {
    try {
      setIsLoading(true);
      // Reg and login function here

      loginWindow.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginWindow]);

  const inputBody = (
    <div className="flex flex-col gap-3">
      {/* Input for email */}
      <InputField
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        placeholder="Email Address"
        value={email}
      />
      {/* Input for password */}
      <InputField
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        placeholder="Password"
        value={password}
      />
    </div>
  );

  const footer = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twitter?&nbsp;&nbsp;
        <span
          onClick={onToggle}
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Window
      onClose={loginWindow.onClose}
      onSubmit={onSubmit}
      disabled={isLoading}
      isOpen={loginWindow.isOpen}
      title="Login"
      label="Login"
      body={inputBody}
      footer={footer}
    />
  );
};

export default LoginWindow;
