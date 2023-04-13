import { api } from "@/utils/api";
import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  FileButton,
  Grid,
  Group,
  Image,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { usePresignedUpload } from "next-s3-upload";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

/* import { useRef, useState } from "react"; */

const NewUserWelcome = () => {
  const { uploadToS3 } = usePresignedUpload();

  const { data: session } = useSession();
  const { data: newUser } = api.user.checkNewUser.useQuery();
  const router = useRouter();

  console.log(session);

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
      image: session?.user.image || "",
      profile_picture: "",
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

  const submitProfile = async (file: File) => {
    const { url } = await uploadToS3(file);
    form.setValues({ profile_picture: url });
  };

  const submitAvatar = async (file: File) => {
    console.log("why");
    const { url } = await uploadToS3(file);
    console.log(url);
    form.setValues({ image: url });
  };

  const [debouncedTagName] = useDebouncedValue(form.values.tag_name, 200, {
    leading: true,
  });

  const { data } = api.user.checkDuplicateTag.useQuery({
    tag_name: debouncedTagName,
  });

  duplicate = data || false;

  const utils = api.useContext();

  const updateUser = api.user.createNewUserInfo.useMutation({
    onSuccess() {
      notifications.show({
        title: "successfully saved",
        message: "Welcome to tweet",
      });
      void utils.user.getMyHeaderInfo.invalidate();
      void router.replace("/");
    },
  });

  const onSubmit = (values: typeof form.values) => {
    updateUser.mutate(values);
  };

  return (
    <>
      <Head>
        <title>Welcome new user</title>
        <meta name="description" content="for CSCI3100" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Container>
          <Center my="2rem">
            <Title> Welcome ! Please allow us to know you better</Title>
          </Center>
          <Center mb="2em">
            <Text> You can always change these in the user settings later</Text>
          </Center>
          <Grid>
            <Grid.Col span={6}>
              <Box maw={300} mx="auto">
                <Center>
                  <Avatar
                    size="xl"
                    radius="xl"
                    src={form.values.image}
                    color="indigo"
                  ></Avatar>
                </Center>

                <Group position="center" my="1rem">
                  <FileButton
                    accept="image/png,image/jpeg"
                    onChange={(file) => {
                      if (file) {
                        void submitAvatar(file);
                      }
                    }}
                  >
                    {(props) => (
                      <Button variant="outline" {...props}>
                        Upload Avatar
                      </Button>
                    )}
                  </FileButton>
                  <Button
                    variant="outline"
                    disabled={form.values.image === ""}
                    onClick={() => form.setValues({ image: "" })}
                  >
                    Reset
                  </Button>
                </Group>
                <TextInput
                  withAsterisk
                  label="Display Name"
                  placeholder="your@email.com"
                  {...form.getInputProps("display_name")}
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
                  {...form.getInputProps("emailVisibility", {
                    type: "checkbox",
                  })}
                />
              </Box>
            </Grid.Col>
            <Grid.Col span={6}>
              <Image
                src={form.values.profile_picture}
                alt="profile_picture"
                withPlaceholder
              />

              <Group position="center" my="1rem">
                <FileButton
                  accept="image/png,image/jpeg"
                  onChange={(file) => {
                    if (file) {
                      void submitProfile(file);
                    }
                  }}
                >
                  {(props) => (
                    <Button variant="outline" {...props}>
                      Upload Profile Picture
                    </Button>
                  )}
                </FileButton>
                <Button
                  variant="outline"
                  disabled={form.values.profile_picture === ""}
                  onClick={() => form.setValues({ profile_picture: "" })}
                >
                  Reset
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Container>

        <Group position="right" mt="md">
          <Button variant="light" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
};

export default NewUserWelcome;
