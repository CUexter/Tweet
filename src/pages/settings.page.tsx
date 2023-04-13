import { api } from "@/utils/api";
import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Container /* FileButton, */,
  Group,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

/* import { useRef, useState } from "react"; */

const ProfileSettings = () => {
  /* const [file, setFile] = useState<File | null>(null); */
  /* const resetRef = useRef<() => void>(null); */
  /**/
  /* const clearFile = () => { */
  /*   setFile(null); */
  /*   resetRef.current?.(); */
  /* }; */

  const { data: session } = useSession();
  const { data: userInfo } = api.user.getMyInfo.useQuery();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      void router.push("/");
    }
  }, [session, router]);

  const isEmailIfPresent = (value: string | undefined | null) => {
    if (!value) {
      return null;
    } else {
      return /^\S+@\S+$/.test(value) ? null : "Invalid email";
    }
  };
  const form = useForm({
    initialValues: {
      display_name: userInfo?.display_name || "",
      emailVisibility: true,
      email: userInfo?.email || "",
      profile_desc: userInfo?.profile_desc || "",
    },

    validate: {
      email: isEmailIfPresent,
      display_name: hasLength(
        { min: 2, max: 30 },
        "Display Name must be 2-30 characters long"
      ),
    },
  });

  const updateUser = api.user.updateUserInfo.useMutation();

  const onSubmit = (values: typeof form.values) => {
    updateUser.mutate(values);
    if (updateUser.isSuccess) {
      notifications.show({
        title: "Success",
        message: "Submit success",
        color: "blue",
      });
      void router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Welcome new user</title>
        <meta name="description" content="for CSCI3100" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Center my="2rem">
          <Title> Edit your profile:</Title>
        </Center>
        <Box maw={300} mx="auto">
          <Center>
            <Avatar
              size="xl"
              radius="xl"
              src={session?.user.image}
              color="indigo"
            ></Avatar>
          </Center>
          {/* <Group position="center" my="1rem"> */}
          {/*   <FileButton */}
          {/*     resetRef={resetRef} */}
          {/*     onChange={setFile} */}
          {/*     accept="image/png,image/jpeg" */}
          {/*   > */}
          {/*     {(props) => <Button {...props}>Upload image</Button>} */}
          {/*   </FileButton> */}
          {/*   <Button disabled={!file} color="red" onClick={clearFile}> */}
          {/*     Reset */}
          {/*   </Button> */}
          {/* </Group> */}
          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              label="Display Name"
              placeholder="Your Name"
              {...form.getInputProps("display_name")}
            />

            <TextInput
              label="Your email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <Textarea
              label="Your Profile Description"
              placeholder="Describe about yourself"
              {...form.getInputProps("profile_desc")}
            />

            <Checkbox
              mt="md"
              label="My email will be visible to others"
              {...form.getInputProps("emailVisibility", { type: "checkbox" })}
            />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ProfileSettings;
