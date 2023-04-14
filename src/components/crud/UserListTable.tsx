import { Anchor, Avatar, Group, ScrollArea, Table, Text } from "@mantine/core";

interface UsersTableProps {
  data:
    | {
        id: string;
        email: string | null;
        display_name: string | null;
        tag_name: string | null;
        image: string | null;
        created_at: Date | null;
      }[]
    | undefined;
}

const UserListTable = ({ data }: UsersTableProps) => {
  if (data) {
    const rows = data.map((item) => (
      <tr key={item.display_name}>
        <td>
          <Group spacing="sm">
            <Avatar size={30} src={item.image} radius={30} />
            <Text fz="sm" fw={500}>
              {item.display_name}
            </Text>
          </Group>
        </td>
        <td>
          <Text fz="sm" c="dimmed">
            {item.tag_name}
          </Text>
        </td>
        <td>
          <Anchor component="button" size="sm">
            {item.email}
          </Anchor>
        </td>
        <td>
          <Anchor component="button" size="sm">
            {item.created_at?.toLocaleString()}
          </Anchor>
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
              <th>Tag Name</th>
              <th>Email</th>
              <th>Account creation date</th>
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

export default UserListTable;
