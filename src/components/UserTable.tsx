import {
  Anchor,
  Avatar,
  Group,
  ScrollArea,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";

interface UsersTableProps {
  data:
    | {
        id: string;
        name: string | null;
        email: string | null;
        tag_name: string | null;
        profile_picture: string | null;
      }[]
    | undefined;
}

const UserTable = ({ data }: UsersTableProps) => {
  const theme = useMantineTheme();
  if (data) {
    const rows = data.map((item) => (
      <tr key={item.name}>
        <td>
          <Group spacing="sm">
            <Avatar size={30} src={item.profile_picture} radius={30} />
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </td>

        <td>
          <Anchor component="button" size="sm">
            {item.email}
          </Anchor>
        </td>
        <td>
          <Text fz="sm" c="dimmed">
            {item.tag_name}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right"></Group>
        </td>
      </tr>
    ));
    return (
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Tag Name</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    );
  } else {
    return null;
  }
};

export default UserTable;
