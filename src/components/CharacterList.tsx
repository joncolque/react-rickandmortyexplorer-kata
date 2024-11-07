import Stack from '@mui/material/Stack';
import { Character } from '../interfaces/character';
import { CharacterComponent } from './CharacterComponent';

interface CharacterListProps {
  characters: Character[]
  onClickViewDetail: (id: number) => void
  onClickEdit: (id: number) => void
}

export const CharacterList = ({ characters, onClickViewDetail, onClickEdit }: CharacterListProps) => {
  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      justifyContent={'center'}
      sx={{ flexWrap: 'wrap' }}
    >
      {
        characters.map((character: Character) => (
          <CharacterComponent
            id={character.id}
            image={character.image}
            name={character.name}
            species={character.species}
            onClickDetails={onClickViewDetail}
            onClickEdit={onClickEdit}
          />
        ))
      }
    </Stack>
  )
}