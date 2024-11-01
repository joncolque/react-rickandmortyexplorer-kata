import { useEffect, useState } from 'react';
import './App.css';
import { Character } from '../interfaces/character';
import { Info } from '../interfaces/pagination';
import { getCharacters } from '../services/character';
import CharacterComponent from './CharacterComponent';
import { Pager } from './Pager';

const initialCharacters: Character[] = []

function App() {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters)
  const [info, setInfo] = useState<Info | undefined>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchCharacters = async (page: number, searchQuery: string) => {
    getCharacters(page, searchQuery)
      .then((characterResponse) => {
        setCharacters(characterResponse.data.results as Character[])
        setInfo(characterResponse.data.info)
      })
  };

  const handleNext = () => {
    if (info?.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (info?.prev) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (value: string) => {
    setCurrentPage(1)
    fetchCharacters(1, value)
    setSearchQuery(value)
  };

  useEffect(() => {
    fetchCharacters(currentPage, searchQuery);
  }, [currentPage]);

  return (
    <div className="App">
      <input onChange={(e) => handleSearch(e.target.value)} placeholder='filter by name'></input>
      <Pager
        currentPage={currentPage}
        numberOfPages={info?.pages}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      {
        characters.map((character: Character) => (
          <CharacterComponent
            id={character.id}
            image={character.image}
            name={character.name}
            species={character.species}
          />
        ))
      }
    </div>
  );
}

export default App;
