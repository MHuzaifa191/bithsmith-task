export type Issue = {
    id: string;
    name: string;
    message: string;
    status: "open" | "resolved";
    numEvents: number;
    numUsers: number;
    value: number;
  };
  
  export type CheckedState = {
    checked: boolean;
    backgroundColor: string;
  };
  
  export type TableProps = {
    issues: Issue[];
  };