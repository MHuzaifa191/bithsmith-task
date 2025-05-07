import Table from "./components/table";
import { Issue } from "./types";
import issuesData from "./constants/issues.json";

export default function Home() {
  const issues: Issue[] = issuesData as Issue[];
  return <Table issues={issues} />;
}