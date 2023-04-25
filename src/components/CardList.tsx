import { useState } from "react";
import { useQuery } from "../hooks/useQuery";
import Card from "./Card";

interface Props {
  filter: {
    name: string;
    status: string;
  }
}

function CardList({filter}: Props) {
  const [page, setPage] = useState(1)
  function handleNextPage() {
    setPage(Number(page) + 1)
  }

  function handlePrevPage() {
    setPage(Number(page) - 1)
  }
  const { data, isLoading } = useQuery<any>(`
    query ($page: Int, $filter: FilterCharacter){
      characters(page: $page, filter: $filter){
        info{
          count
          pages
          next
          prev
        }
        results{
          id
          name
          status
          species
          type
          location{
            name
          }
          image
        }
      }
    }
  `, { page, filter });


  const isNextButtonDisabled = data?.characters.info.next === null || isLoading;
  const isPrevButtonDisabled = data?.characters.info.prev === null || isLoading;

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      <button onClick={handlePrevPage} disabled={isPrevButtonDisabled}>Prev Page</button>
      <button onClick={handleNextPage} disabled={isNextButtonDisabled}>Next Page</button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data?.characters.results.map((character: any) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </>
  );
}

export default CardList;
