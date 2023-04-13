import { api } from "@/utils/api";
import { Box, Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 8
          ? null
          : "Password must be at least 8 characters long",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const register = api.auth.registerUser.useMutation({
    onSuccess() {
      notifications.show({
        title: "Success",
        message: "You are now registered. Redirecting...",
        color: "blue",
      });
      setTimeout(function () {
        void signIn(undefined, { callbackUrl: "/auth/new-user" });
      }, 2000);
    },
    onError(error) {
      notifications.show({
        message: error.toString(),
        title: "Oops! Registration went wrong",
        color: "red",
      });
      console.error("Error:", error);
      setErrorMessage("User registration failed");
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const send = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    register.mutate(send);
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Your name"
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <TextInput
          withAsterisk
          type="password"
          label="Password"
          placeholder="Your password"
          {...form.getInputProps("password")}
        />

        <TextInput
          withAsterisk
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          {...form.getInputProps("confirmPassword")}
        />

        <Checkbox
          mt="md"
          label="I agree to sell my soul to you"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
        )}

        <Group position="right" mt="md">
          <Button variant="light" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Register;
