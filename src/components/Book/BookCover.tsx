

type BookCoverProps = {
    cover?: string
}

function BookCover({cover}: BookCoverProps) {
    cover = cover || "/404_image.jpg"

    return (
        <img
            src={cover}
            className="w-1/2 aspect-square mx-auto"
        />
    )
}

export default BookCover