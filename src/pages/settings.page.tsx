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
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { usePresignedUpload } from "next-s3-upload";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProfileSettings = () => {
  const { uploadToS3 } = usePresignedUpload();
  const [qTimes, setQTimes] = useState(0);
  const isEmailIfPresent = (value: string | undefined | null) => {
    if (!value) {
      return null;
    } else {
      return /^\S+@\S+$/.test(value) ? null : "Invalid email";
    }
  };
  const form = useForm({
    initialValues: {
      display_name: "",
      emailVisibility: true,
      email: "",
      profile_desc: "",
      profile_picture: "",
      image: "",
    },

    validate: {
      email: isEmailIfPresent,
      display_name: hasLength(
        { min: 2, max: 30 },
        "Display Name must be 2-30 characters long"
      ),
    },
  });

  const submitProfile = async (file: File) => {
    const { url } = await uploadToS3(file);
    form.setValues({ profile_picture: url });
  };

  const submitAvatar = async (file: File) => {
    const { url } = await uploadToS3(file);
    form.setValues({ image: url });
  };

  const { data: session } = useSession();
  api.user.getMyInfo.useQuery(undefined, {
    onSuccess(data) {
      if (qTimes === 0) {
        form.setValues({
          display_name: data.display_name || "",
          emailVisibility: data.emailVisibility || true,
          email: data.email || "",
          profile_desc: data.profile_desc || "",
          profile_picture: data.profile_picture || "",
          image: data.image || "",
        });
      }
      setQTimes(qTimes + 1);
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      void router.push("/");
    }
  }, [session, router]);

  const updateUser = api.user.updateUserInfo.useMutation({
    onSuccess() {
      notifications.show({
        title: "Success",
        message: "settings saved successfully",
      });
      void router.push("/");
    },
  });

  const onSubmit = (values: typeof form.values) => {
    updateUser.mutate(values);
  };

  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="for CSCI3100" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Container>
          <Center my="2rem">
            <Title> Edit your profile:</Title>
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
                  />
                </Center>

                <Group position="center" my="1rem">
                  <FileButton
                    onChange={(file) => {
                      if (file) {
                        void submitAvatar(file);
                      }
                    }}
                  >
                    {(props) => (
                      <Button variant="outline" {...props}>
                        Upload image
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
          <Button type="submit" variant="outline" color="blue">
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
};

export default ProfileSettings;
