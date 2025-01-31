
import { ActionPanel, Form, showToast, Toast, Action, LocalStorage } from "@raycast/api";
import fs from "fs";
import path from "path";
import os from "os";
import { useEffect, useState } from "react";

interface Preferences {
  vaultPath: string;
  header: string;
  taskPathTemplate: string;
  defaultDueDate: string;
}

export default function Command() {
  const [preferences, setPreferences] = useState<Preferences>({
    vaultPath: "",
    header: "",
    taskPathTemplate: "",
    defaultDueDate: formatDate(new Date()),
  });
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    console.log("Preferences state updated:", isLoading);
    if (!isLoading) {
        console.log("Preferences state updated:", preferences);
    }
  }, [preferences, isLoading]);

  async function handleSubmit(values: Preferences & { taskName: string; defaultDueDate: Date }) {
    try {
      console.log("Form submitted with values before update:", values);
      const formattedDueDate = formatDate(values.defaultDueDate);
      
      const taskPath = generatePath(values.taskPathTemplate);
      let filePath = path.join(values.vaultPath, taskPath);
      filePath = filePath.replace(/^~/, os.homedir()); // Expand ~ to home directory
      filePath = filePath + ".md";
      filePath = path.resolve(filePath); // Normalize the path
      console.log("Resolved file path:", filePath);
      
      const taskContent = `- [ ] ${values.taskName} 📅 ${formattedDueDate}`;
      
      if (!fs.existsSync(filePath)) {
        console.log("File does not exist, creating:", filePath);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, `# ${values.header}\n\n${taskContent}`);
      } else {
        console.log("File exists, appending task...");
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const lines = fileContent.split("\n");
        let insertIndex = lines.findIndex(line => line.trim() === values.header);
        
        if (insertIndex !== -1) {
          console.log("Header found at index:", insertIndex);
          insertIndex += 1;
          lines.splice(insertIndex, 0, taskContent);
        } else {
          console.log("Header not found, appending at the end.");
          lines.push(`\n${values.header}\n${taskContent}`);
        }
        
        fs.writeFileSync(filePath, lines.join("\n"));
      }
      
      console.log("Task added successfully!");
      showToast({ style: Toast.Style.Success, title: "Task added!", message: values.taskName });
    } catch (error) {
      console.error("Error adding task:", error);
      showToast({ style: Toast.Style.Failure, title: "Failed to add task", message: String(error) });
    }
  }


  console.log("set ui:", preferences);
  return (
    <Form actions={<ActionPanel><Action.SubmitForm title="Add Task" onSubmit={handleSubmit} /></ActionPanel>} isLoading={isLoading}>
      <Form.TextField id="taskName" title="Task Name" placeholder="Enter task name" autoFocus />
      <Form.TextField id="vaultPath" title="Vault Path"  placeholder="Enter vault path" storeValue />
      <Form.TextField id="header" title="Header"  placeholder="Enter header text" storeValue />
      <Form.TextField id="taskPathTemplate" title="Task Path Template"  storeValue placeholder="e.g., Journal/Daily/{{DATE:YYYY}}/{{date}}" />
      <Form.DatePicker id="defaultDueDate" title="Default Due Date"  storeValue />
    </Form>
  );
}

function generatePath(template: string): string {
  const now = new Date();
  const localDate = formatDate(now);
  console.log("Generating path with template:", template);
  return template
    .replace("{{DATE:YYYY}}", now.getFullYear().toString())
    .replace("{{date}}", localDate);
}

function formatDate(date: Date): string {
  return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0");
}
