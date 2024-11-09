import { Box, SxProps, Theme } from "@mui/material"
import TextField from "@mui/material/TextField"

interface SearchInputProps {
  onChange: (value: string) => void
  value: string
}

export const SearchInput = ({ onChange, value }: SearchInputProps) => {

  return (
    <Box sx={styles.container}>
      <TextField
        id="outlined-basic"
        label="Filter by name"
        variant="outlined"
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  )
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1
  },
  searchIcon: {
    width: 56,
    height: 56,
  }
}