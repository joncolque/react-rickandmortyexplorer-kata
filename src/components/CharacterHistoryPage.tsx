import { useNavigate, useParams } from "react-router-dom";
import { useGetCharacter } from "../hooks/useGetCharacter";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useGetCharacterHistory } from "../hooks/useGetCharacterHistory";
import { useEffect } from "react";
import { texts } from "../texts";
import { Loader } from "./common/Loader.";
import { NoContent } from "./common/NoContent";

export const CharacterHistoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const { history, isPending, error } = useGetCharacterHistory(Number(id))
  const navigate = useNavigate();
  const { character } = useGetCharacter(Number(id))

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (character && character.deleted === true) {
      navigate(`/${id}`, { replace: true })
    }
  }, [character]);

  return (
    <Stack
      justifyContent="center"
      height="100vh"
      gap={1}
      alignItems={'center'}
    >
      {history && history.length > 0 && <Typography variant="h5" textAlign={'center'}>Ordered by most recently</Typography>}
      <Box sx={{ width: '80vw', maxHeight: '80vh', overflowY: 'auto', padding: 1 }}>
        {isPending && !error && <Loader />}
        {history?.map(element => (
          <Card sx={{ padding: 1, marginBottom: 1 }}>
            <Typography>
              {Object.entries(element).map(([key, value]) => (
                <span key={key}>
                  {`${key}: ${value}`}
                  <br />
                </span>
              ))}
            </Typography>
          </Card>
        ))}
        {history?.length === 0 && <NoContent message={'There is no modifications yet'} />}
      </Box>
      <Button onClick={goBack}>{texts.goBack}</Button>
    </Stack>
  )
}