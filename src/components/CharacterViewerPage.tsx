import { useNavigate, useParams } from "react-router-dom";
import { CharacterComponent } from "./CharacterComponent"
import { useGetCharacter } from "../hooks/useGetCharacter";
import { Box, Button, Card, Stack, SxProps, Theme, Typography } from "@mui/material";
import { useGetCharacterComments } from "../hooks/useGetCharacterComments";
import { useEffect, useState } from "react";
import { CommentInput } from "./CommentInput";
import { usePutCharacterComment } from "../hooks/usePutCharacterComment";

export const CharacterViewerPage = () => {
  const { id } = useParams<{ id: string }>();
  const { character, isPending, error } = useGetCharacter(Number(id))
  const { comments } = useGetCharacterComments(Number(id))
  const { handlePutCharacterComment } = usePutCharacterComment(Number(id))
  const navigate = useNavigate();
  const [localComments, setLocalComments] = useState<{ message: string }[]>([])

  const handleEditElement = (id: number) => navigate(`/edit/${id}`);
  const goBack = () => navigate(-1);

  useEffect(() => {
    if (comments) {
      setLocalComments(comments)
    }
  }, [comments])

  if (isPending) {
    return <>Loading...</>
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      flexDirection={'column'}
      gap={1}
      marginTop={1}
    >
      <Stack
        justifyContent={'center'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        gap={1}
      >
        <CharacterComponent
          {...character}
          large
          onClickEdit={handleEditElement}
        />
        <Card
          sx={{
            height: 450 * 1.5,
            width: 450,
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',

          }}>
          <Stack sx={styles.messageListContainer}>
            {
              localComments.map((comment, i) => (<Box component="section" key={i} sx={styles.message}>
                <Typography >{comment.message}</Typography>
              </Box>))
            }
          </Stack>
          <CommentInput onSend={(value: string) => {
            setLocalComments([...localComments, { message: value }])
            handlePutCharacterComment({ message: value })
          }} disabled={character.deleted === true} />
        </Card>
      </Stack>
      <Button onClick={goBack}>Return</Button>
    </Stack>
  )
}

const styles: Record<string, SxProps<Theme>> = {
  messageListContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
    overflowY: 'auto',
    gap: 1,
    padding: 1,
  },
  message: {
    backgroundColor: 'white',
    padding: 1,
    borderRadius: 2,
    width: 'auto'
  },
}