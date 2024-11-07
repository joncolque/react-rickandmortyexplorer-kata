import { Button, CardActions, CardContent, Typography } from '@mui/material';
import { Character } from '../interfaces/character';
import { CharacterCardContainer } from './containers/CharacterCardContainer';

type CharacterComponentProps = Character & {
  onClickDetails?: (id: number) => void
  onClickEdit?: (id: number) => void
  large?: boolean
}

export const CharacterComponent = (props: CharacterComponentProps) => {
  const { onClickDetails, onClickEdit, large = false, ...character } = props
  const { id, image, name, species, status, location, episode } = character

  return (
    <CharacterCardContainer large={large} image={image}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {large ? `Specie: ${species}` : species}
        </Typography>
        {large && <>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Status: {status}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Location: {location}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Number of Episodes: {episode}
          </Typography>
        </>}
      </CardContent>
      <CardActions>
        {onClickEdit && id && <Button size="small" onClick={() => onClickEdit(id)}>Edit</Button>}
        {onClickDetails && id && <Button size="small" onClick={() => onClickDetails(id)}>View Detail</Button>}
      </CardActions>
    </CharacterCardContainer>

  );
}

