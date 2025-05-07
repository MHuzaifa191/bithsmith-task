import { memo } from 'react';

// USING SEPARATE COMPONENTS FOR TABLE HEADER AND BODY FOR BETTER REUSABILITY AND MAINTAINABILITY

type TableHeaderProps = {
  numSelected: number;
  isAllSelected: boolean;
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TableHeader = memo(({ numSelected, isAllSelected, onSelectAll }: TableHeaderProps) => (
  <thead>
    <tr className="border-2 border-gray-200">
      <th className="py-6 pl-6 text-left w-[48px]">
        <input
          className="w-5 h-5 cursor-pointer"
          type="checkbox"
          id="custom-checkbox-selectDeselectAll"
          checked={isAllSelected}
          onChange={onSelectAll}
        />
      </th>
      <th className="py-6 min-w-[8rem] text-left text-black">
        {numSelected ? `Selected ${numSelected}` : "None selected"}
      </th>
      <th colSpan={2} />
    </tr>
    <tr className="border-2 border-gray-200">
      <th className="py-6 pl-6" />
      <th className="py-6 text-left font-medium text-black">Name</th>
      <th className="py-6 text-left font-medium text-black">Message</th>
      <th className="py-6 text-left font-medium text-black">Status</th>
    </tr>
  </thead>
));

TableHeader.displayName = 'TableHeader';
export default TableHeader;