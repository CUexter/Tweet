import type { User } from "@prisma/client";
import type { Session } from "next-auth";

import { Avatar, Button, Menu } from "@mantine/core";
import {
  IconHomeSignal,
  IconLogout,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";

type UserInfo = Pick<User, "display_name" | "profile_picture">;
type props = UserInfo | null;

const AccountHeaderMenu = () => {
  const { data: sessionData } = useSession();
  const menu = (data: Session) => (
    <Menu>
      <Menu.Target>
        <Avatar component="button">
          {data.user?.name?.slice(0, 2).toUpperCase()}
        </Avatar>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>User Actions</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<IconHomeSignal size={14} />}>Profile</Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          icon={<IconLogout size={14} />}
          onClick={() => void signOut()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
  const SignIn = (
    <Button variant="subtle" onClick={() => void signIn()}></Button>
  );
  return sessionData === null ? SignIn : menu(sessionData);
};

export default AccountHeaderMenu;
