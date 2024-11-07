import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Stack, CardContent, Alert, Snackbar } from '@mui/material';
import { Character } from '../../interfaces/character';
import { useGetCharacter } from '../../hooks/useGetCharacter';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetLocations } from '../../hooks/useGetLocations';
import { useUpdateCharacter } from '../../hooks/useUpdateCharacter';
import { ControllerInput, ControllerSelect } from './ControllerInputs';
import { CharacterCardContainer } from '../containers/CharacterCardContainer';

export const CharacterEditor = () => {
  const { id } = useParams<{ id: string }>();
  const { character, isPending, error } = useGetCharacter(Number(id))
  const { locations } = useGetLocations()
  const { handleUpdate } = useUpdateCharacter(Number(id))
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ show: boolean, type?: 'success' | 'error' }>({ show: false, type: 'success' });

  const { handleSubmit, control, formState: { errors }, reset, watch } = useForm<Character>({
    defaultValues: character,
  });

  const onSubmit = (data: Character) => {
    handleUpdate(data)
      .then(() => setToast({
        show: true,
        type: 'success'
      }))
      .catch(() => setToast({
        show: true,
        type: 'error'
      }))
  };

  const goBack = () => navigate(-1);

  const handleClose = () => setToast({
    show: false,
    type: toast.type
  })

  useEffect(() => {
    if (character) {
      reset(character);
    }
  }, [character, reset]);

  const imageUrl = watch('image');

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height={'100vh'}
    >
      {isPending && <>Loading...</>}
      {error && <>Please try again later</>}
      {character && <CharacterCardContainer large image={imageUrl || character.image}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ width: 300, margin: '0 auto' }}>
              <ControllerInput keyWord={'image'} control={control} errors={errors} />
              <ControllerInput keyWord={'name'} control={control} errors={errors} />
              <ControllerInput keyWord={'species'} control={control} errors={errors} />
              <ControllerSelect
                keyWord={'status'} control={control} errors={errors}
                values={['Alive', 'Dead', 'unknown']}
                defaultValue={character['status'] ?? ''}
              />
              {locations && <ControllerSelect
                keyWord={'location'} control={control} errors={errors}
                values={locations}
                defaultValue={character['location'] ?? ''}
              />}
              <Button type="submit" variant="contained" color="secondary">
                Confirm Edit
              </Button>
            </Stack>
          </form>
        </CardContent>
      </CharacterCardContainer>
      }
      <Button onClick={goBack}>Return</Button>
      <Snackbar open={toast.show} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          onClose={handleClose}
          severity={toast.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.type === 'error' ? 'Try again Later' : 'Saved'}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
