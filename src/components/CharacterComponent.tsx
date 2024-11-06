import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Character as CharacterProps } from '../interfaces/character';

function CharacterComponent(props: CharacterProps) {
  const { image, name, species, id } = props

  return (
    <Card key={id} sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 250, width: 250 }}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {species}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CharacterComponent;
