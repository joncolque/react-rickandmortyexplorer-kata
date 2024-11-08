import { useNavigate, useParams } from "react-router-dom";
import { useGetCharacter } from "../hooks/useGetCharacter";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useGetCharacterHistory } from "../hooks/useGetCharacterHistory";
import { useEffect } from "react";

export const CharacterHistoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const { history } = useGetCharacterHistory(Number(id))
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
      <Typography variant="h4" textAlign={'center'}>Ordered by most recently</Typography>
      <Box sx={{ width: '80vw', maxHeight: '80vh', overflowY: 'auto', padding: 1 }}>
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
      </Box>
      <Button onClick={goBack}>Return</Button>
    </Stack>
  )
}