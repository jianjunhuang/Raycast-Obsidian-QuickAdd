import { useState } from "react";
import { nanoid } from "nanoid";
import { ActionPanel, Icon, List, Action } from "@raycast/api";
import { useLocalStorage } from "@raycast/utils";
import { ObContent } from "./types"
import { EmptyView } from "./components/EmptyView";

type State = {
  searchText: string;
};

export default function Command() {
  const [state, setState] = useState<State>({
    searchText: "",
  });
  const { value: obContents, setValue: setObContents, isLoading } = useLocalStorage<ObContent[]>("obsidian_contents");

  const handleCreate = (title: string, content: string, vaultPath: string, header: string, contentPathTemp: string) => {
    setObContents([...(obContents ?? []), { title, content, vaultPath, header, contentPathTemp }]);
  };

  return (
    <List
      isLoading={isLoading}
    >
      <EmptyView searchText={state.searchText} onCreate={handleCreate} />
      { }
    </List>
  );
}

