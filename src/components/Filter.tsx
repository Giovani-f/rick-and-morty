import React, { useState } from "react";
import { DebounceInput } from 'react-debounce-input'

export enum Status {
  DEFAULT = "",
  ALIVE = "Alive",
  DEAD = "Dead",
  UNKNOWN = "unknown",
}

interface FilterProps {
  onFilterChange: (filter: { name: string; status: Status }) => void;
}

function Filter({ onFilterChange }: FilterProps) {
  const [filterName, setFilterName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<Status>(Status.DEFAULT);

  const handleFilterNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.value;
    setFilterName(name);
    onFilterChange({ name, status: filterStatus });
  };

  const handleFilterStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const status = event.target.value as Status;
    setFilterStatus(status);
    onFilterChange({ name: filterName, status });
  };

  return (
      <div className="flex justify-end gap-4 p-4 mt-10">
        <div className="flex">
        <DebounceInput
          className="rounded-lg  w-full py-2 px-4 bg-zinc-700 text-white placeholder-gray-400 shadow-sm text-base outline-none"
          placeholder="Character name"
          onChange={e => handleFilterNameChange(e)}
          debounceTimeout={300}
          value={filterName}
        />
      </div>

      <select className="block px-3 py-2 text-white bg-zinc-700 border border-zinc-800 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500" value={filterStatus} onChange={handleFilterStatusChange}>
        <option value="">Status</option>
        <option value={Status.ALIVE}>{Status.ALIVE}</option>
        <option value={Status.DEAD}>{Status.DEAD}</option>
        <option value={Status.UNKNOWN}>{Status.UNKNOWN}</option>
      </select>
      </div>
  );
}

export default Filter;
