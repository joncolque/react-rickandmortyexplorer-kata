import { Box, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { Character } from '../interfaces/character';
import { CharacterCardContainer } from './containers/CharacterCardContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEye';

type CharacterComponentProps = Character & {
  onClickDetails?: (id: number) => void
  onClickEdit?: (id: number) => void
  onClickDelete?: (id: number) => void
  large?: boolean
}

export const CharacterComponent = (props: CharacterComponentProps) => {
  const { onClickDetails, onClickEdit, onClickDelete, large = false, ...character } = props
  const { id, image, name, species, status, location, episode, deleted } = character

  return (
    <CharacterCardContainer large={large} image={image} deleted={deleted}>
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
        <Box justifyContent={'space-between'} flexDirection={'row'} display={'flex'} width={'100%'} alignItems={'center'}>
          <Box>
            {onClickDetails && id && <IconButton size="small" onClick={() => onClickDetails(id)}>
              <EyeIcon />
            </IconButton>}
            {onClickEdit && !deleted && id && <IconButton size="small" onClick={() => onClickEdit(id)}>
              <EditIcon />
            </IconButton>}
          </Box>
          <Box>
            {onClickDelete && !deleted && id && <IconButton aria-label="delete" onClick={() => onClickDelete(id)}>
              <DeleteIcon />
            </IconButton>}
          </Box>
        </Box>
      </CardActions>
    </CharacterCardContainer>

  );
}

