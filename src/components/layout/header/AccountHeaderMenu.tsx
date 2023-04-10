import { api } from "@/utils/api";
import { Avatar, Button, Menu } from "@mantine/core";
import {
  IconHomeSignal,
  IconLogout,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AccountHeaderMenu = () => {
  const { data: sessionData } = useSession();
  const { data: userInfo } = api.user.getMyHeaderInfo.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  const id = userInfo?.id.toString();
  const menu = (
    <Menu>
      <Menu.Target>
        {userInfo?.image ? (
          <Avatar component="button" src={userInfo.image} radius="xl" />
        ) : (
          <Avatar component="button">
            {userInfo?.name?.slice(0, 2).toUpperCase()}
          </Avatar>
        )}
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>User Actions</Menu.Label>
        <Menu.Item
          icon={<IconSettings size={14} />}
          component={Link}
          href="/settings"
        >
          Settings
        </Menu.Item>
        <Menu.Item
          icon={<IconMessageCircle size={14} />}
          component={Link}
          href="/chat"
        >
          Messages
        </Menu.Item>
        <Menu.Item
          icon={<IconHomeSignal size={14} />}
          component={Link}
          href={"/profile/" + id!}
        >
          Profile
        </Menu.Item>

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
  return sessionData === null ? SignIn : menu;
};

export default AccountHeaderMenu;