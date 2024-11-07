import { Pager } from '../components/Pager';
import { useGetCharacters } from '../hooks/useGetCharacters';
import { CharacterList } from '../components/CharacterList';
import { SearchInput } from '../components/SearchInput';
import { MainContainer } from '../components/MainContainer';
import { useNavigate } from 'react-router-dom';


function App() {
  const { currentPage, pages, handlePrev, handleNext, errorMessage, characters, handleSearch, isPending } = useGetCharacters()
  const navigate = useNavigate();

  const handleClickElement = (id: number) => navigate(`/${id}`);
  const handleEditElement = (id: number) => navigate(`/edit/${id}`);

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
      {errorMessage ? <>{errorMessage}</> : (
        <CharacterList
          characters={characters}
          onClickViewDetail={handleClickElement}
          onClickEdit={handleEditElement}
        />
      )
      }
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
