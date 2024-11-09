import { Box, CircularProgress } from "@mui/material"

export const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 1 }}>
      <CircularProgress />
    </Box>
  )
}