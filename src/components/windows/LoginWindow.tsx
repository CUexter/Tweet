import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useLoginWindow from "../../hooks/useLoginWindow";
import useRegWindow from "../../hooks/useRegWindow";
import InputField from "../InputField";
import Window from "../Window";

const LoginWindow = () => {
  const loginWindow = useLoginWindow();
  const regWindow = useRegWindow();
  const [email, setEmail] = useState("");
  const [iPassword, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    loginWindow.onClose();
    regWindow.onOpen();
  }, [isLoading, regWindow, loginWindow]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      //login handle here
      try {
        await signIn("credentials", {
          email,
          iPassword,
        });
      } catch (signError) {
        console.log(signError);
        toast.error("Invalid credentials");
      }
      loginWindow.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, iPassword, loginWindow]);

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
        value={iPassword}
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
