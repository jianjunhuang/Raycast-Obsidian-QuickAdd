import { ActionPanel, List } from "@raycast/api";
import { ObContent } from "../types";

export function EmptyView(props: {
  onCreate: (title: string, content: string, vaultPath: string, header: string, contentPathTemp: string) => void;
}) {
  return (
    <List.EmptyView
      icon="📝"
      title="No Config"
      description="You don't have any todos yet. Why not add some?"
      actions={
        <ActionPanel>
        </ActionPanel>
      }
    />
  );
}
