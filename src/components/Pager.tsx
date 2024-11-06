import { Stack } from '@mui/material';
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
            <span > Page {currentPage} of {numberOfPages}</span>
            <Button onClick={onNext}>Next</Button>
        </Stack >
    )
}