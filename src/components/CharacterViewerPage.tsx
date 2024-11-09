import { useNavigate, useParams } from "react-router-dom";
import { CharacterComponent } from "./CharacterComponent"
import { useGetCharacter } from "../hooks/useGetCharacter";
import { Box, Button, Card, CircularProgress, Stack, SxProps, Theme, Typography } from "@mui/material";
import { useGetCharacterComments } from "../hooks/useGetCharacterComments";
import { useEffect, useRef, useState } from "react";
import { CommentInput } from "./CommentInput";
import { usePutCharacterComment } from "../hooks/usePutCharacterComment";
import { ToasterAutoHide } from "./common/ToasterAutoHide";
import { texts } from "../texts";
import { Loader } from "./common/Loader.";
import { NoContent } from "./common/NoContent";

export const CharacterViewerPage = () => {
  const { id } = useParams<{ id: string }>();
  const { character, isPending, error } = useGetCharacter(Number(id))
  const { comments } = useGetCharacterComments(Number(id))
  const { handlePutCharacterComment } = usePutCharacterComment(Number(id))
  const navigate = useNavigate();
  const [localComments, setLocalComments] = useState<{ message: string }[]>([])
  const [failToast, setFailToast] = useState<boolean>(false);
  const messageListRef = useRef<any>(null);

  const handleEditElement = (id: number) => navigate(`/edit/${id}`);
  const goBack = () => navigate(-1);
  const handleClose = () => setFailToast(false)

  const handleSendComment = (value: string) => {
    setLocalComments([...localComments, { message: value }])
    handlePutCharacterComment({ message: value })
      .catch(() => {
        const oldComments = [...localComments]
        setLocalComments(oldComments)
        setFailToast(true)
      })
  }

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollIntoView();
    }
  }, [localComments]);

  useEffect(() => {
    if (comments) {
      setLocalComments(comments)
    }
  }, [comments])

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
        {isPending && !error && <Loader />}
        {character && <>
          <CharacterComponent
            {...character}
            large
            onClickEdit={handleEditElement}
          />
          <Card
            sx={styles.commentsContainer}>
            <Stack sx={styles.messageListContainer}>
              {
                localComments.map((comment, i) => (<Box component="section" key={i} sx={styles.message}>
                  <Typography >{comment.message}</Typography>
                </Box>))
              }
              <div ref={messageListRef} />
              {localComments.length === 0 && !character.deleted && <NoContent message={'There are no comments yet, you can be the first!'} />}
              {localComments.length === 0 && character.deleted && <NoContent message={'Comments are disabled'} />}
            </Stack>
            <CommentInput onSend={(value: string) => handleSendComment(value)} disabled={character.deleted === true} />
          </Card>
        </>}

      </Stack>
      <Button onClick={goBack}>{texts.goBack}</Button>
      <ToasterAutoHide
        show={failToast}
        handleClose={handleClose}
        type={'error'}
        text={texts.tryAgain}
      />
    </Stack>
  )
}

const styles: Record<string, SxProps<Theme>> = {
  commentsContainer: {
    height: 450 * 1.5,
    width: 450,
    maxWidth: '90vw',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
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