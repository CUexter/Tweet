import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useLoginWindow from "../../hooks/useLoginWindow";
import useRegWindow from "../../hooks/useRegWindow";
import InputField from "../InputField";
import Window from "../Window";

const RegWindow = () => {
  const regWindow = useRegWindow();
  const loginWindow = useLoginWindow();

  const [email, setEmail] = useState("");
  const [iPassword, setiPassword] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [name, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    regWindow.onClose();
    loginWindow.onOpen();
  }, [isLoading, regWindow, loginWindow]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // Send post request to backend
      await axios.post("/api/register", {
        email,
        iPassword,
        display_name,
        name,
      });

      toast.success("Account created successfully.");
      // sign in immediately
      await signIn("credentials", {
        email,
        iPassword,
      });

      regWindow.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Invalid input, please try again");
    } finally {
      setIsLoading(false);
    }
  }, [regWindow, email, iPassword, display_name, name]);

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
        onChange={(e) => setiPassword(e.target.value)}
        disabled={isLoading}
        placeholder="Password"
        value={iPassword}
      />
      {/* Input for name */}
      <InputField
        onChange={(e) => setDisplayName(e.target.value)}
        disabled={isLoading}
        placeholder="Name"
        value={display_name}
      />
      {/* Input for username */}
      <InputField
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        placeholder="Username"
        value={name}
      />
    </div>
  );

  const footer = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?&nbsp;&nbsp;
        <span
          onClick={onToggle}
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <div>
      <Window
        onClose={regWindow.onClose}
        onSubmit={onSubmit}
        disabled={isLoading}
        isOpen={regWindow.isOpen}
        title="Create a new account"
        label="Register"
        body={inputBody}
        footer={footer}
      />
    </div>
  );
};

export default RegWindow;
