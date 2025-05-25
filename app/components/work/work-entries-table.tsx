import { Table, ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useWorkStore } from "../../work.store";

export function WorkEntriesTable() {
  const { workEntries, openEntryForm } = useWorkStore();

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Hours Worked</Table.Th>
          <Table.Th>Money Earned</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {workEntries.map((entry, index) => (
          <Table.Tr key={index}>
            <Table.Td>{entry.date}</Table.Td>
            <Table.Td>{entry.hoursWorked}</Table.Td>
            <Table.Td>{entry.moneyEarned}€</Table.Td>
            <Table.Td>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => openEntryForm(index)}
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
