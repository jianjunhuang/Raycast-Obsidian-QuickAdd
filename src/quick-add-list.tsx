import { useState } from "react";
import { nanoid } from "nanoid";
import { ActionPanel, Icon, List, Action } from "@raycast/api";
import { useLocalStorage } from "@raycast/utils";
import { Filter, Todo } from "./types";
import { CreateTodoAction, DeleteTodoAction, EmptyView, ToggleTodoAction } from "./components";



export default function Command() {
  return (
    <List isShowingDetail>
      <List.Item
        title="Pikachu"
        subtitle="Electric"
        detail={
          <List.Item.Detail>
            <List.Item.Detail.Metadata>
              <List.Item.Detail.Metadata.Label title="content" text="text" />
              <List.Item.Detail.Metadata.Label title="template" text="text" />
              <List.Item.Detail.Metadata.Label title="vaultPath" text="vault" />
              <List.Item.Detail.Metadata.Label title="header" text="header" />
              <List.Item.Detail.Metadata.Label title="path" text="path" />
            </List.Item.Detail.Metadata>
          </List.Item.Detail>
        }
      />
    </List>
  );
}
