import { memo } from 'react';
import { Issue, CheckedState } from '../types';
import StatusIndicator from './status-indicator';



type TableRowProps = {
  issue: Issue;
  checkedState: CheckedState;
  index: number;
  onCheckboxChange: (index: number) => void;
};

const TableRow = memo(({ issue, checkedState, index, onCheckboxChange }: TableRowProps) => {
  const issueIsOpen = issue.status === "open";
  const handleClick = issueIsOpen ? () => onCheckboxChange(index) : undefined;
  
  return (
    <tr 
      className={`
        ${issueIsOpen ? "cursor-pointer hover:bg-blue-50 text-black" : "text-gray-600 cursor-not-allowed"}
        border-b border-gray-200
        ${checkedState.checked ? "bg-blue-50" : ""}
      `}
      onClick={handleClick}
    >
      <td className="py-6 pl-6">
        {issueIsOpen ? (
          <input
            className="w-5 h-5 cursor-pointer"
            type="checkbox"
            checked={checkedState.checked}
            onChange={() => onCheckboxChange(index)}
          />
        ) : (
          <input
            className="w-5 h-5 opacity-50"
            type="checkbox"
            disabled
          />
        )}
      </td>
      <td className="py-6">{issue.name}</td>
      <td className="py-6">{issue.message}</td>
      <td className="py-6">
        <StatusIndicator isOpen={issueIsOpen} />
      </td>
    </tr>
  );
});

TableRow.displayName = 'TableRow';
export default TableRow;