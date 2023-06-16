import { MenuCard } from "../components/MenuCard";
import { Title } from "../components/Title";
import students from "../images/students.png"
import assignment from "../images/assignment.png"
import settings from "../images/settings.png"
import exercise from "../images/exercise.png"
import "../styles/main.css"

export function Main() {
    return (<>
        <div className="main-container">
            <Title title="Dobro došao nazad Profesore!" />
            <div className="menucard-container">
                <MenuCard title="Studenti" route="/groups" image={students}></MenuCard>
                <MenuCard title="Vježbe" route="/exercises" image={assignment}></MenuCard>
                <MenuCard title="Zadaci" route="/assignments/groups" image={exercise}></MenuCard>
                <MenuCard title="Postavke" route="/main" image={settings}></MenuCard>
            </div>
        </div>
    </>)
}