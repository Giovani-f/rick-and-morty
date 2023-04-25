import { useState } from "react";
import CardList from "./components/CardList";
import Filter, { Status } from "./components/Filter";
import Header from "./components/Header";

interface IFilter {
  name: string;
  status: Status;
}

function App() {
  const [filter, setFilter] = useState<IFilter>({
    name: "",
    status: Status.DEFAULT,
  });
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleFilterChange = (filter: IFilter) => {
    setPage(1)
    setFilter(filter);
  };

  return (
    <div className="bg-zinc-900 h-full">
      <Header />
      <Filter onFilterChange={handleFilterChange} />
      <div className="container mx-auto pt-20">
        <CardList
          filter={filter}
          handlePageChange={handlePageChange}
          page={page}
        />
      </div>
    </div>
  );
}

export default App;
