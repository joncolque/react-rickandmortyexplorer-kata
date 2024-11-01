
interface PagerProps {
    currentPage: number,
    numberOfPages?: number,
    onPrev: () => void,
    onNext: () => void,
}

export const Pager = ({ currentPage,numberOfPages, onPrev, onNext }: PagerProps) => {
    return (
        <div style={{height: '30px'}}>
            <button onClick={onPrev}>Prev</button>
            <span style={{margin: '30px'}} className="currentPage">{currentPage} of {numberOfPages}</span>
            <button onClick={onNext}>Next</button>
        </div >
    )
}