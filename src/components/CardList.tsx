import { useQuery } from "../hooks/useQuery";
import Card from "./Card";
import Spinner from "./Spinner";

interface Props {
  filter: {
    name: string;
    status: string;
  };
  handlePageChange: (page: number) => void;
  page: number;
}

function CardList({ filter, handlePageChange, page }: Props) {
  function handleNextPage() {
    handlePageChange(Number(page) + 1);
  }

  function handlePrevPage() {
    handlePageChange(Number(page) - 1);

  }

  const { data, isLoading } = useQuery<any>(
    `
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
          episode{
            name
            air_date
          }
          image
        }
      }
    }
  `,
    { page, filter: filter }
  );

  const isNextButtonDisabled = data?.characters.info.next === null || isLoading;
  const isPrevButtonDisabled = data?.characters.info.prev === null || isLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (data.characters.results.length === 0) {
    return <div className="text-white text-4xl flex justify-center items-center">Not Found</div>;
  }
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-10 grid-cols-1">
        {data?.characters.results.map((character: any) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
      <div className="flex justify-between mt-10 pb-10">
        <button
          className={`py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ${
            isPrevButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevPage}
          disabled={isPrevButtonDisabled}
        >
          Prev Page
        </button>
        <button
          className={`py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ${
            isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
          disabled={isNextButtonDisabled}
        >
          Next Page
        </button>
      </div>
    </>
  );
}

export default CardList;
