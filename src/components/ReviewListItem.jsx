import "../styles/studentList.css"

export function ReviewListItem({ onClick, title, date, isGraded }) {
    return <div className="studentListItem" onClick={() => onClick()}>
        <div className="studentListItem-field">{title}</div>
        <div className="studentListItem-field">{date}</div>
        <div className="studentListItem-field">{isGraded ? "Da" : "Ne"}</div>
    </div>
}

export function ReviewListHeader() {
    return <div className="studentListItem studentListHeader">
        <div className="studentListItem-field">Vježba</div>
        <div className="studentListItem-field">Datum</div>
        <div className="studentListItem-field">Ocijenjeno</div>
    </div>
}