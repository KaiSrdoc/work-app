import { Title, Progress, Text, Group } from "@mantine/core";
import { useWorkStore } from "../work.store";

export function TuitionProgress() {
  const { workEntries } = useWorkStore();
  const totalMoneyEarned = workEntries.reduce(
    (sum, entry) => sum + entry.moneyEarned,
    0
  );
  const totalTuition = 2000;
  const tuitionPercentage = (totalMoneyEarned / totalTuition) * 100;

  return (
    <>
      <Title order={2} ta="left" mb="xl">
        Tuition Progress
      </Title>
      <Progress
        color="yellow"
        size="xl"
        value={tuitionPercentage}
        striped
        mb="xs"
      />
      <Group justify="space-between">
        <Text size="sm">0</Text>
        <Text size="sm">500</Text>
        <Text size="sm">1000</Text>
        <Text size="sm">1500</Text>
        <Text size="sm">2000</Text>
      </Group>
    </>
  );
}
