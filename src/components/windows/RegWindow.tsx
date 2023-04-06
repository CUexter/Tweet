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
  const [tag_name, setTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    regWindow.onClose();
    loginWindow.onOpen();
  }, [isLoading, regWindow, loginWindow]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      let flag = 0;
      // Handle empty fields in the form
      if (email == "") {
        flag = 1;
        toast.error("Please fill in your email!");
      }
      if (iPassword == "") {
        flag = 1;
        toast.error("Please fill in your password!");
      }
      if (display_name == "") {
        flag = 1;
        toast.error("Please fill in your name!");
      }
      if (tag_name == "") {
        flag = 1;
        toast.error("Please fill in your tag!");
      }

      if (flag == 0) {
        // Send post request to backend
        const regRes = await axios.post("/api/register", {
          email,
          iPassword,
          display_name,
          tag_name,
        });

        console.log(regRes.data);

        if (regRes.data == "OK") {
          toast.success("Account created successfully.");
          // sign in immediately
          await signIn("credentials", {
            email,
            iPassword,
          });

          regWindow.onClose();
        } else {
          // Register failed
          if (regRes.data == "ExistBoth")
            toast.error(
              "Email and tag both are already exist, please use a new one or login"
            );
          if (regRes.data == "ExistEmail")
            toast.error(
              "The Email is already exist, please use a new one or login"
            );
          if (regRes.data == "ExistTagName")
            toast.error(
              "The Tag name is already exist, please use a new one or login"
            );
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid input, please try again");
    } finally {
      setIsLoading(false);
    }
  }, [regWindow, email, iPassword, display_name, tag_name]);

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
      {/* Input for tag name */}
      <InputField
        onChange={(e) => setTagName(e.target.value)}
        disabled={isLoading}
        placeholder="Tag Name"
        value={tag_name}
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
