import { Card, Box, CardMedia } from "@mui/material"
import { ReactNode } from "react"

interface CharacterCardContainerProps {
  image: string
  children: ReactNode | ReactNode[]
  large?: boolean
}

export const CharacterCardContainer = ({ image, children, large = false }: CharacterCardContainerProps) => {
  const size = large ? 450 : 250
  return (
    <Card
      sx={{
        height: size * 1.5,
        width: size,
        maxWidth: '90vw',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
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