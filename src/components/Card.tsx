export interface Character {
  name: string;
  status: string;
  species: string;
  episode: {
    name: string;
    air_date: string;
  }[];
  image: string;
  location: {
    name: string;
  }
}

interface Props {
  character: Character;
}

function Card({ character }: Props) {
  const { name, status, species, episode, image, location } = character;
  const statusColor = {
    Alive: (
      <span className="flex justify-start items-center before:h-2 before:w-2 before:bg-green-500 before:rounded-full before:content-[''] gap-2 text-white">
        {status}
      </span>
    ),
    Dead: (
      <span className="flex justify-start items-center before:h-2 before:w-2 before:bg-red-500 before:rounded-full before:content-[''] gap-2 text-white">
        {status}
      </span>
    ),
    unknown: (
      <span className="flex justify-start items-center before:h-2 before:w-2 before:bg-gray-500 before:rounded-full before:content-[''] gap-2 text-white">
        {status}
      </span>
    ),
  };

  return (
    <div className="bg-zinc-700 rounded-md shadow-lg flex flex-row">
      <img
        src={image}
        alt={name}
        className="h-full object-cover w-1/3 rounded-l-md"
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{name}</h2>
          <div className="flex">
            {statusColor[status as keyof typeof statusColor]}
            <span className="ml-1 mr-1 text-white">-</span>
            <span className="text-gray-300">{species}</span>
            <span className="ml-1 mr-1 text-white">-</span>
            <span className="text-gray-300">{location.name}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-md text-gray-400">Last known location:</span>
          <span className="text-xl text-white">{episode[episode.length - 1]?.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-md text-gray-400">First seen in:</span>
          <span className="text-xl text-white">{episode[0]?.name}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
