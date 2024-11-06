import TextField from "@mui/material/TextField"

interface SearchInputProps {
    onChange: (value: string) => void
}

export const SearchInput = ({ onChange }: SearchInputProps) => {
    return (
        <TextField
            id="outlined-basic"
            label="Filter by name"
            variant="outlined"
            onChange={(e) => onChange(e.target.value)}
        />
    )
}