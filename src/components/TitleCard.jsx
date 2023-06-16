import { useNavigate } from "react-router-dom"
import "../styles/card.css"

export function TitleCard(props) {
    const navigate = useNavigate();

    return (<>
        <div className="card" onClick={() => {navigate(props.route)}}>
            <div className="titlecard-title">{props.title}</div>
        </div>
    </>)
}