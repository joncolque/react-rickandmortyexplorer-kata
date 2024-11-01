import { Character as CharacterProps } from '../interfaces/character';
import './App.css';

function CharacterComponent(props: CharacterProps) {
  const { image, name, species, id } = props
  return (
    <div key={id}>
      <img src={image}></img>
      <div>{name}</div>
      <div>{species}</div>
    </div>
  );
}

export default CharacterComponent;
