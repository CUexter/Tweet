// https://ui.mantine.dev/component/actions-grid
import AdminOperation from "@/components/AdminOperation";
import UserTable from "@/components/UserTable";
import adminCreate from "@/hooks/adminCreate";
import adminDelete from "@/hooks/adminDelete";
import adminList from "@/hooks/adminList";
import adminUpdate from "@/hooks/adminUpdate";
import {
  Card,
  Modal,
  SimpleGrid,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconUserCircle,
  IconUserMinus,
  IconUserPlus,
  IconUserSearch,
} from "@tabler/icons-react";
import { type NextPage } from "next";
import Head from "next/head";

type crudOperations = {
  title: string;
  icon: JSX.Element;
  operation: string;
};

const crudOperations = [
  { title: "Create User", icon: IconUserPlus, operation: "create" },
  { title: "Update User", icon: IconUserCircle, operation: "update" },
  { title: "List User", icon: IconUserSearch, operation: "list" },
  { title: "Delete User", icon: IconUserMinus, operation: "delete" },
];

const data = [
  {
    avatar: "H",
    name: "A",
    job: "ABC",
    email: "J@gmail.com",
    phone: "922",
  },
  {
    avatar: "K",
    name: "B",
    job: "ABCD",
    email: "OOO@gmail.com",
    phone: "2382",
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    textAlign: "center",
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: rem(90),
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },
}));

const AdminDashboard: NextPage = () => {
  const { classes } = useStyles();
  const createWindow = adminCreate();
  const deleteWindow = adminDelete();
  const listWindow = adminList();
  const updateWindow = adminUpdate();

  const handleOp = (op: string) => {
    console.log(op);
    switch (op) {
      case "create":
        createWindow.onOpen();
        break;
      case "update":
        updateWindow.onOpen();
        break;
      case "list":
        listWindow.onOpen();
        break;
      case "delete":
        deleteWindow.onOpen();
        break;
    }
  };

  const items = crudOperations.map((item) => (
    <UnstyledButton
      key={item.title}
      className={classes.item}
      onClick={() => handleOp(item.operation)}
    >
      <item.icon color={"red"} size="2rem" />
      <Text size="md" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto w-1/2">
        <Text size="xl" weight={500} mb="xl">
          Admin Dashboard
        </Text>
        <Card withBorder radius="md" className={classes.card}>
          {/* <Group position="apart"> */}
          <Text className={classes.title}>User Operations</Text>
          {/* <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
            User Operations
          </Anchor> */}
          {/* </Group> */}
          <SimpleGrid cols={2} mt="md" mb="xs">
            {items}
          </SimpleGrid>
        </Card>
      </div>
      {/* Hidden components to be called */}
      <>
        <Modal
          opened={createWindow.isOpen}
          onClose={() => createWindow.onClose()}
          title="Create"
          size="100%"
          centered
        >
          {/* Modal content */}
          <UserTable data={data} />
        </Modal>
        <Modal
          opened={updateWindow.isOpen}
          onClose={() => updateWindow.onClose()}
          title="Update"
          size="30%"
          centered
        >
          {/* Modal content */}
          <AdminOperation op={"update"} />
        </Modal>
        <Modal
          opened={listWindow.isOpen}
          onClose={() => listWindow.onClose()}
          title="List of users"
          size="100%"
          centered
        >
          {/* Modal content */}
          <UserTable data={data} />
        </Modal>
        <Modal
          opened={deleteWindow.isOpen}
          onClose={() => deleteWindow.onClose()}
          title="Delete"
          size="30%"
          centered
        >
          {/* Modal content */}
          <AdminOperation op={"delete"} />
        </Modal>
      </>
    </>
  );
};

export default AdminDashboard;
