import { api } from "@/utils/api";
import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Container /* FileButton, */,
  Group,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

/* import { useRef, useState } from "react"; */

const NewUserWelcome = () => {
  /* const [file, setFile] = useState<File | null>(null); */
  /* const resetRef = useRef<() => void>(null); */
  /**/
  /* const clearFile = () => { */
  /*   setFile(null); */
  /*   resetRef.current?.(); */
  /* }; */

  const { data: session } = useSession();
  const { data: newUser } = api.user.checkNewUser.useQuery();
  const router = useRouter();

  useEffect(() => {
    if (newUser || !session?.user) {
      void router.replace("/");
    }
  }, [session, router, newUser]);

  const isEmailIfPresent = (value: string | undefined | null) => {
    if (!value) {
      return null;
    } else {
      return /^\S+@\S+$/.test(value) ? null : "Invalid email";
    }
  };
  let duplicate = false;
  const form = useForm({
    initialValues: {
      display_name: session?.user.name || "",
      tag_name: session?.user.name?.toLowerCase() || "",
      emailVisibility: true,
      email: session?.user.email || "",
      profile_desc: "Hi I am new to Tweet",
    },

    validate: {
      email: isEmailIfPresent,
      display_name: hasLength(
        { min: 2, max: 30 },
        "Display Name must be 2-30 characters long"
      ),
      tag_name: () => {
        return duplicate ? "invalid" : null;
      },
    },
  });

  const [debouncedTagName] = useDebouncedValue(form.values.tag_name, 200, {
    leading: true,
  });

  const { data } = api.user.checkDuplicateTag.useQuery({
    tag_name: debouncedTagName,
  });

  duplicate = data || false;

  const updateUser = api.user.createNewUserInfo.useMutation();

  const onSubmit = (values: typeof form.values) => {
    updateUser.mutate(values);
    if (updateUser.isSuccess) {
      void router.replace("/");
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
          <Title> Welcome ! Please allow us to know you better</Title>
        </Center>
        <Center mb="2em">
          <Text> You can always change these in the user settings later</Text>
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
              withAsterisk
              label="Display Name"
              placeholder="your@email.com"
              {...form.getInputProps("display_name")}
            />
            <TextInput
              label="Your email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <TextInput
              withAsterisk
              label="tagname"
              placeholder="@tag_name"
              {...form.getInputProps("tag_name")}
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
              <Button variant="light" type="submit">
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default NewUserWelcome;
