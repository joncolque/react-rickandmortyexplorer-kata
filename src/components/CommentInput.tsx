import { IconButton, Stack } from "@mui/material"
import TextField from "@mui/material/TextField"
import SendIcon from '@mui/icons-material/SendRounded';
import { useState } from "react";

interface CommentInputProps {
  onSend: (value: string) => void
  disabled: boolean
}

export const CommentInput = ({ onSend, disabled = false }: CommentInputProps) => {
  const [message, setMessage] = useState<string>('')

  const handleSend = () => {
    onSend(message)
    setMessage('')
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSend(message)
      setMessage('');
      event.preventDefault();
    }
  };

  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'space-between'}
      padding={2}
      gap={1}
      alignItems={'center'}
    >
      <TextField
        id="outlined-basic"
        label={disabled ? "Character removed, cannot comment" : "Write a comment"}
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ flex: 1 }}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <IconButton disabled={disabled} sx={{ width: 48, height: 48 }} onClick={() => handleSend()} >
        <SendIcon />
      </IconButton>
    </Stack>
  )
}