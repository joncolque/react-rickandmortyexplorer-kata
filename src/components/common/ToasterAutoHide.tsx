import { Snackbar, Alert } from "@mui/material"

interface ToasterAutoHideProps {
  show: boolean
  handleClose: ()=>void
  type: 'success' | 'error'
  text: string
}

export const ToasterAutoHide = ({show, handleClose, type, text}: ToasterAutoHideProps) => {

  return (
    <Snackbar open={show} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {text}
      </Alert>
    </Snackbar>
  )
}