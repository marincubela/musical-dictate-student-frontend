import { useNavigate } from "react-router-dom"
import "../styles/card.css"

export function MenuCard(props) {
    const navigate = useNavigate();

    return (<>
        <div className="card" onClick={() => {navigate(props.route)}}>
            <div className="menucard-image"><img src={props.image}></img></div>
            <div className="menucard-title">{props.title}</div>
        </div>
    </>)
}