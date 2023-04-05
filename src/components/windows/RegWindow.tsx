import { useCallback, useState } from "react";

import useLoginWindow from "../../hooks/useLoginWindow";
import useRegWindow from "../../hooks/useRegWindow";
import InputField from "../InputField";
import Window from "../Window";

const RegWindow = () => {
  const regWindow = useRegWindow();
  const loginWindow = useLoginWindow();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReg = () => {
    //return true;
  };

  const onSubmit = useCallback(() => {
    try {
      setIsLoading(true);
      // Reg and login function here
      //const temp = handleReg();

      regWindow.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [regWindow]);

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
      {/* Input for name */}
      <InputField
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
        placeholder="Name"
        value={name}
      />
      {/* Input for username */}
      <InputField
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        placeholder="Username"
        value={username}
      />
    </div>
  );

  const footer = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={handleReg}
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
        isOpen={false}
        title="Create a new account"
        label="Register"
        body={inputBody}
        footer={footer}
      />
    </div>
  );
};

export default RegWindow;
