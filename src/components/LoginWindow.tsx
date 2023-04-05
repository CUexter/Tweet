import { useCallback, useState } from "react";

import useLoginWindow from "../hooks/useLoginWindow";
import InputField from "./InputField";
import Window from "./Window";

const LoginWindow = () => {
  const loginWindow = useLoginWindow();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    return true;
  };

  const onSubmit = useCallback(() => {
    try {
      setIsLoading(true);
      // Reg and login function here
      const temp = handleLogin();

      loginWindow.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        placeholder="Password"
        value={password}
      />
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
    />
  );
};

export default LoginWindow;
