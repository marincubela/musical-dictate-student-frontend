import "../styles/studentList.css"

export function StudentListItem({jmbag, firstName, lastName, nameClass}) {
    return <div className="studentListItem">
        <div className="studentListItem-field">{jmbag}</div>
        <div className="studentListItem-field">{firstName}</div>
        <div className="studentListItem-field">{lastName}</div>
        <div className="studentListItem-field">{nameClass}</div>
    </div>
}

export function StudentListHeader({jmbag, firstName, lastName, nameClass}) {
    return <div className="studentListItem studentListHeader">
        <div className="studentListItem-field">{jmbag}</div>
        <div className="studentListItem-field">{firstName}</div>
        <div className="studentListItem-field">{lastName}</div>
        <div className="studentListItem-field">{nameClass}</div>
    </div>
}