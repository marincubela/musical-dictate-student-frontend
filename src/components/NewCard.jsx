import { useNavigate } from "react-router-dom"
import "../styles/card.css"
import add from "../images/add.png"

export function NewCard(props) {
    const navigate = useNavigate();

    return (<>
        <div className="card" onClick={() => { navigate(props.route) }}>
            <img src={add} alt="Add button" />
        </div>
    </>)
}