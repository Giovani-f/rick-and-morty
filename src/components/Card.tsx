export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  location: {
    name: string;
  };
  image: string;
}

interface Props {
  character: Character;
}

function Card({ character }: Props) {
  const { id, name, status, species, type, location, image } = character;

  return (
    <div className="card">
      <img src={image} alt={name} />
      <div className="card-info">
        <h2>{name}</h2>
        <p>Status: {status}</p>
        <p>Species: {species}</p>
        {type && <p>Type: {type}</p>}
        <p>Location: {location.name}</p>
      </div>
    </div>
  );
}

export default Card;
