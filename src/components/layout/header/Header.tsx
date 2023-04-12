import SignUpButton from "@/components/auth/SignUpButton";
import {
  ActionIcon,
  Button,
  Group,
  Header,
  createStyles,
  rem,
} from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

import AccountHeaderMenu from "./AccountHeaderMenu";
import SearchUser from "./SearchUser";
import ToggleDarkMode from "./ToggleDarkModeButton";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

const HeaderSearch = () => {
  const { classes } = useStyles();
  const { data: sessionData } = useSession();

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <ActionIcon component={Link} href="/">
            <IconHome />
          </ActionIcon>
          <SearchUser />
        </Group>
        <Group>
          <ToggleDarkMode />
          {sessionData === null ? (
            <Button.Group>
              <Button compact onClick={() => void signIn()}>
                Sign in
              </Button>
              <SignUpButton />
            </Button.Group>
          ) : (
            <AccountHeaderMenu />
          )}
        </Group>
      </div>
    </Header>
  );
};
export default HeaderSearch;
