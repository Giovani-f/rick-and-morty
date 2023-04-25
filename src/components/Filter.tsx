import React, { useState } from 'react';

export enum Status {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

interface FilterProps {
  onFilterChange: (filter: { name: string, status: Status }) => void;
}

function Filter({ onFilterChange }: FilterProps) {
  const [filterName, setFilterName] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<Status>(Status.UNKNOWN);

  const handleFilterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setFilterName(name);
    onFilterChange({ name, status: filterStatus });
  };

  const handleFilterStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as Status;
    setFilterStatus(status);
    onFilterChange({ name: filterName, status });
  };

  return (
    <div>
      <input type="text" onChange={handleFilterNameChange} value={filterName} />
      <select value={filterStatus} onChange={handleFilterStatusChange}>
        <option value="">Status</option>
        <option value={Status.ALIVE}>{Status.ALIVE}</option>
        <option value={Status.DEAD}>{Status.DEAD}</option>
        <option value={Status.UNKNOWN}>{Status.UNKNOWN}</option>
      </select>
    </div>
  );
}

export default Filter;
