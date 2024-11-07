import { useNavigate, useParams } from "react-router-dom";
import { CharacterComponent } from "./CharacterComponent"
import { useGetCharacter } from "../hooks/useGetCharacter";
import { Button, Stack } from "@mui/material";

export const CharacterViewer = () => {
  const { id } = useParams<{ id: string }>();
  const { character, isPending, error } = useGetCharacter(Number(id))
  const navigate = useNavigate();

  const handleEditElement = (id: number) => navigate(`/edit/${id}`);
  const goBack = () => navigate(-1);

  if (isPending) {
    return <>Loading...</>
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CharacterComponent
        {...character}
        large
        onClickEdit={handleEditElement}
      />
      <Button onClick={goBack}>Return</Button>
    </Stack>
  )
}