import "../styles/part.css"

export function Part({part}) {
    return (
        <div className="part-container">
            <div className="part-column">{part.start}</div>
            <div className="part-column">{part.end}</div>
            <div className="part-column">{part.allowedNumberOfAttempts}</div>
            <div className="part-column">{part.allowedTimeInSeconds}</div>
        </div>
    )
}