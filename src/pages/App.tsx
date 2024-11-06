import { Pager } from '../components/Pager';
import { useGetCharacters } from '../hooks/useGetCharacters';
import { CharacterList } from '../components/CharacterList';
import { SearchInput } from '../components/SearchInput';
import { MainContainer } from '../components/MainContainer';


function App() {
  const { currentPage, pages, handlePrev, handleNext, errorMessage, characters, handleSearch, isPending } = useGetCharacters()

  return (
    <MainContainer>
      <SearchInput onChange={handleSearch} />
      {isPending && <>Loading...</>}
      {!errorMessage && !isPending && <Pager
        currentPage={currentPage}
        numberOfPages={pages}
        onPrev={handlePrev}
        onNext={handleNext}
      />}
      {errorMessage ? <>{errorMessage}</> : <CharacterList characters={characters} />}
      {!errorMessage && !isPending && <Pager
        currentPage={currentPage}
        numberOfPages={pages}
        onPrev={handlePrev}
        onNext={handleNext}
      />}
    </MainContainer>
  );
}

export default App;
