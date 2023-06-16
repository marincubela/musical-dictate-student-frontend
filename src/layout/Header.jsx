import { useNavigate } from "react-router-dom"
import logo from "../images/logo.png"
import avatar from "../images/avatar.png"
import AuthService from "../api/services/Auth";
import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Notifications } from "./Notifications";
import { API_BASE_URL } from "../constants";
import "../styles/header.css"
import "../styles/common.css"
import StudentSolutionsService from "../api/services/StudentSolution";

export function Header() {
    const navigate = useNavigate();

    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${API_BASE_URL}/hubs/student`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        console.log("Use effect")
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                })
                .catch(e => console.log('Connection failed: ', e));

            connection.on('ResultUpdated', async (studentSolutionId, exerciseTitle) => {
                const solution = await StudentSolutionsService.getStudentSolution(studentSolutionId)
                setMessages(messages => [...messages, solution])
            });
        }
    }, [connection]);

    const onClick = () => {
        navigate("/student/main")
    }

    const signOut = () => {
        AuthService.logoutUser();
        navigate("/student/login")
    }

    return (
        <>
            <div className="header">
                <div className="header-left" onClick={onClick}>
                    <div className="icon-box">
                        <div className="back-button" onClick={() => navigate(-1)}></div>
                    </div>
                    <div className="header-logo" onClick={onClick}>
                        <img src={logo} className="header-image"></img>
                        <p>Glazbeni diktat</p>
                    </div>
                </div>
                <div className="header-right">
                    <img src={avatar} alt="Profile picture" className="header-image profile-photo" />
                    <div>
                        <div className="header-username">Marin Ćubela</div>
                        <div className="header-username">Profesor</div>
                    </div>
                    <div style={{ position: "relative" }}>
                        <button className="button" onClick={() => setIsOpen(v => !v)}>Obavijesti <b>{"(" + messages.length + ")"}</b></button>
                        {isOpen ?
                            <Notifications messages={messages}></Notifications>
                            : ""}
                    </div>
                    <div className="icon-box">
                        <div className="logout-button" onClick={signOut}></div>
                    </div>
                </div>
            </div>
        </>
    )
}