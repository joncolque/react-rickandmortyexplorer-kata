import { Stack } from "@mui/material"
import { ReactNode } from "react"

export const MainContainer = ({ children }: { children: ReactNode }) => {
  return <Stack direction="column" alignItems={'center'} padding={'20px'} gap={'20px'}>
    {children}
  </Stack>
}