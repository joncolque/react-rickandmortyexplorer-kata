import Stack from '@mui/material/Stack';
import { Character } from '../interfaces/character';
import { CharacterComponent } from './CharacterComponent';

interface CharacterListProps {
  characters: Character[]
  onClickViewDetail: (id: number) => void
  onClickEdit: (id: number) => void
  onClickDelete: (id: number) => void
}

export const CharacterList = ({ characters, onClickViewDetail, onClickEdit, onClickDelete }: CharacterListProps) => {
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
            {...character}
            key={character.id}
            onClickDetails={onClickViewDetail}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />
        ))
      }
    </Stack>
  )
}