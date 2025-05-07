"use client";

import { useState, useCallback, useMemo } from "react";
import { TableProps, CheckedState } from '../types';
import TableHeader from './table-header';
import TableRow from './table-row';

const Table = ({ issues }: TableProps) => {
  const [checkedStates, setCheckedStates] = useState<CheckedState[]>(
    new Array(issues.length).fill({
      checked: false,
      backgroundColor: "#ffffff",
    })
  );

  const { numSelected, openIssuesCount } = useMemo(() => {
    let count = 0;
    const selected = checkedStates.reduce((sum, state, index) => {
      if (issues[index].status === "open") count++;
      return state.checked ? sum + 1 : sum;
    }, 0);
    return { numSelected: selected, openIssuesCount: count };
  }, [checkedStates, issues]);

  const handleCheckboxChange = useCallback((index: number) => {
    setCheckedStates(prev => prev.map((state, i) => 
      i === index ? {
        checked: !state.checked,
        backgroundColor: state.checked ? "#ffffff" : "#eeeeee",
      } : state
    ));
  }, []);

  const handleSelectAll = useCallback((checked: boolean) => {
    setCheckedStates(
      issues.map(issue => ({
        checked: checked && issue.status === "open",
        backgroundColor: checked && issue.status === "open" ? "#eeeeee" : "#ffffff",
      }))
    );
  }, [issues]);

  return (
    <table className="w-full border-collapse shadow-lg">
      <TableHeader
        numSelected={numSelected}
        isAllSelected={numSelected === openIssuesCount}
        onSelectAll={(e) => handleSelectAll(e.target.checked)}
      />
      <tbody>
        {issues.map((issue, index) => (
          <TableRow
            key={issue.id}
            issue={issue}
            checkedState={checkedStates[index]}
            index={index}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;