import { Pager } from '../components/Pager';
import { useGetCharacters } from '../hooks/useGetCharacters';
import { CharacterList } from '../components/CharacterList';
import { SearchInput } from '../components/SearchInput';
import { MainContainer } from '../components/MainContainer';
import { useNavigate } from 'react-router-dom';
import { useDeleteCharacter } from '../hooks/useDeleteCharacter';
import { Loader } from '../components/common/Loader.';

function App() {
  const { currentPage, pages, handlePrev, handleNext, errorMessage, characters, handleSearch, isPending, searchQuery } = useGetCharacters()
  const navigate = useNavigate();
  const { handleDeleteById } = useDeleteCharacter()

  const handleClickElement = (id: number) => navigate(`/${id}`);
  const handleEditElement = (id: number) => navigate(`/edit/${id}`);
  const handleDeleteElement = (id: number) => handleDeleteById(id);

  return (
    <MainContainer>
      <SearchInput onChange={handleSearch} value={searchQuery ?? ''} />
      {isPending && !errorMessage && <Loader/>}
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
          onClickDelete={handleDeleteElement}
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
