import { memo } from 'react';

type StatusIndicatorProps = {
  isOpen: boolean;
};

const StatusIndicator = memo(({ isOpen }: StatusIndicatorProps) => (
  <span className={`px-2 py-1 rounded-full ${isOpen ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
    {isOpen ? 'Open' : 'Resolved'}
  </span>
));

StatusIndicator.displayName = 'StatusIndicator';
export default StatusIndicator;