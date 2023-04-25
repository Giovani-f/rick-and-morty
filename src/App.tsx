import { useState } from 'react';
import CardList from './components/CardList';
import Filter, { Status } from './components/Filter';

interface IFilter {
  name: string;
  status: Status;
}

function App() {
  const [filter, setFilter] = useState<IFilter>({ name: '', status: Status.UNKNOWN });

  const handleFilterChange = (filter: IFilter) => {
    setFilter(filter);
  };
  return (
    <>
    <h1>Rick and Morty</h1>
      <Filter onFilterChange={handleFilterChange} />
      <CardList filter={filter}/>
    </>
  );
}

export default App;
