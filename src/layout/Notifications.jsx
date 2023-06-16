import { useNavigate } from "react-router-dom"
import "../styles/notifications.css"

export function Notifications({ messages: solutions }) {
    const navigate = useNavigate();

    return (
        <div className="notifications-container">
            {solutions.map(solution => {
                return <div 
                onClick={() => navigate(`/student/assignments/${solution.assignment.id}/results/${solution.id}`)} 
                className="notification-list-item">
                    Vježba {solution.assignment.exercise.title} je pregledana.
                </div>
            })}
        </div>
    )
}