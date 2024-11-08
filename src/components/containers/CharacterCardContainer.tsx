import { Card, Box, CardMedia, Chip } from "@mui/material"
import { ReactNode } from "react"

interface CharacterCardContainerProps {
  image: string
  children: ReactNode | ReactNode[]
  large?: boolean
  deleted?: boolean
}

export const CharacterCardContainer = ({ image, children, large = false, deleted }: CharacterCardContainerProps) => {
  const size = large ? 450 : 250
  return (
    <Card
      sx={{
        height: size * 1.5,
        width: size,
        maxWidth: '90vw',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          position: 'relative'
        }}
      >
        {deleted && <Chip
          label={'deleted'}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 1,
            color: 'white',
          }}
        />}
        <CardMedia
          sx={{
            height: size,
            width: size,
          }}
          image={image}
        />
      </Box>
      {children}
    </Card>
  )
}