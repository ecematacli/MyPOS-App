import { useState } from 'react';

export default () => {
  const [expandedRows, setExpandedRows] = useState<{
    [id: string]: boolean | undefined;
  }>({});

  const toggleExpanded = (id: number): void => {
    setExpandedRows({ ...expandedRows, [id]: !expandedRows[id] });
  };

  return {
    toggleExpanded,
    expandedRows
  };
};
