import { Stack, SxProps, Theme, Typography } from "@mui/material"

interface NoContentProps {
  message: string
}

export const NoContent = ({ message }: NoContentProps) => {
  return (
    <Stack sx={styles.noContentContainer}>
      <Typography >{message}</Typography>
    </Stack>
  )
}

const styles: Record<string, SxProps<Theme>> = {
  noContentContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}