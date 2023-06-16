import { MenuCard } from "../components/MenuCard";
import { Title } from "../components/Title";
import students from "../images/students.png"
import assignment from "../images/assignment.png"
import settings from "../images/settings.png"
import exercise from "../images/exercise.png"
import "../styles/main.css"
import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

export function StudentMain() {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`https://localhost:7150/hubs/student`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                })
                .catch(e => console.log('Connection failed: ', e));

            connection.on('ResultUpdated', (studentSolutionId, exerciseTitle) => {
                console.log(studentSolutionId + " " + exerciseTitle)
                setMessages(messages => [...messages, studentSolutionId + " " + exerciseTitle])
            });
        }
    }, [connection]);
    return (<>
        <div className="main-container">
            <Title title="Dobro došao nazad!" />
            <div className="menucard-container">
                <MenuCard title="Moje grupe" route="/student/groups" image={students}></MenuCard>
                <MenuCard title="Rezultati" route="/student/main" image={exercise}></MenuCard>
                <MenuCard title="Postavke" route="/student/main" image={settings}></MenuCard>
            </div>
        </div>
    </>)
}