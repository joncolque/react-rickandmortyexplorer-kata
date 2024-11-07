import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';

interface PagerProps {
  currentPage: number,
  numberOfPages?: number,
  onPrev: () => void,
  onNext: () => void,
}

export const Pager = ({ currentPage, numberOfPages, onPrev, onNext }: PagerProps) => {
  return (
    <Stack
      direction="row"
      gap={'20px'}
      alignItems={'center'}
    >
      <Button onClick={onPrev}>Prev</Button>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Page {currentPage} of {numberOfPages}
      </Typography>
      <Button onClick={onNext}>Next</Button>
    </Stack >
  )
}