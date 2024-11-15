import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Stack, CardContent } from '@mui/material';
import { Character } from '../../interfaces/character';
import { useGetCharacter } from '../../hooks/useGetCharacter';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetLocations } from '../../hooks/useGetLocations';
import { useUpdateCharacter } from '../../hooks/useUpdateCharacter';
import { ControllerInput, ControllerSelect } from './ControllerInputs';
import { CharacterCardContainer } from '../containers/CharacterCardContainer';
import { useDeleteCharacter } from '../../hooks/useDeleteCharacter';
import { useUpdateHistory } from '../../hooks/useUpdateHistory';
import { ToasterAutoHide } from '../common/ToasterAutoHide';
import { texts } from '../../texts';
import { Loader } from '../common/Loader.';
import { getDifferences } from '../../services/common';

export const CharacterEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { character, isPending, error } = useGetCharacter(Number(id))
  const { locations } = useGetLocations()
  const { handleUpdate } = useUpdateCharacter(Number(id))
  const { handleUpdateHistory } = useUpdateHistory(Number(id))
  const { handleDeleteById } = useDeleteCharacter()
  const [toast, setToast] = useState<{ show: boolean, type: 'success' | 'error' }>({ show: false, type: 'success' });

  const { handleSubmit, control, formState: { errors }, reset, watch } = useForm<Character>({
    defaultValues: character,
  });

  const onSubmit = (data: Character) => {
    const difference = getDifferences(character, data)
    if (Object.keys(difference).length > 0) {
      handleUpdate(difference)
        .then(() => {
          setToast({
            show: true,
            type: 'success'
          })
          handleUpdateHistory(difference)
        })
        .catch(() => setToast({
          show: true,
          type: 'error'
        }))
    }
  };

  const goBack = () => navigate(-1);

  const handleClose = () => setToast({ show: false, type: toast.type })

  const handleDelete = () => {
    handleDeleteById(Number(id))
      .then(() => navigate(-1))
      .catch(() => setToast({ show: true, type: 'error' }))
  }

  const handleSeeHistory = () => navigate(`/history/${id}`)

  useEffect(() => {
    if (character) {
      if (character.deleted === true) {
        navigate(`/${id}`, { replace: true })
        return
      }
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
      {isPending && !error && <Loader/>}
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
              <Button type="submit" variant="contained" color="info">Confirm Edit</Button>
              <Button type="submit" variant="contained" color="secondary" onClick={handleSeeHistory}>See history of changes</Button>
              <Button variant="contained" color="warning" onClick={handleDelete}>Delete</Button>
            </Stack>
          </form>
        </CardContent>
      </CharacterCardContainer>
      }
      <Button onClick={goBack} sx={{ marginY: 1 }}>{texts.goBack}</Button>
      <ToasterAutoHide
        show={toast.show}
        handleClose={handleClose}
        type={toast.type}
        text={toast.type === 'error' ? texts.tryAgain : 'Saved!'}
      />
    </Stack>
  );
};
