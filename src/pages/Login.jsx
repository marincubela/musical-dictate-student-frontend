import { useNavigate } from "react-router-dom"
import { useInput } from "../components/Input"
import AuthService from "../api/services/Auth"
import { Title } from "../components/Title"
import "../styles/common.css"
import { useState } from "react"

export function LoginTeacher() {
    const [email, setEmail, emailInput] = useInput({ type: "text", label: "E-mail" })
    const [password, setPassword, passwordInput] = useInput({ type: "password", label: "Lozinka" })

    const [error, setError] = useState("");

    const navigate = useNavigate()

    const login = async () => {
        try {
            await AuthService.loginTeacher(email, password)
            navigate("/main");
        } catch (e) {
            console.log(e)
            setError(e.data.detail)
        }
    }

    return (<>
        <Title title="Učitelju, dobro došli na Glazbeni diktat!"></Title>
        <div className="box-container" style={{ padding: "60px 200px" }}>
            {emailInput}
            {passwordInput}
            <div style={{ color: "red" }}>
                {error}
            </div>
            <div className="button-container">
                <button className="button" onClick={() => login()}>Prijava</button>
                <button className="button" onClick={() => navigate("/register")}>Registracija</button>
            </div>
        </div>
    </>
    )
}

export function RegisterTeacher() {
    const [email, setEmail, emailInput] = useInput({ type: "text", label: "E-mail" })
    const [password, setPassword, passwordInput] = useInput({ type: "password", label: "Lozinka" })
    const [firstName, setFirstName, firstNameInput] = useInput({ type: "text", label: "Ime" })
    const [lastName, setLastName, lastNameInput] = useInput({ type: "text", label: "Prezime" })

    const [error, setError] = useState("");

    const navigate = useNavigate()

    const register = async () => {
        try {
            await AuthService.registerTeacher(email, password, firstName, lastName)
            navigate("/main");
        } catch (e) {
            console.log(e)
            setError(e.data.title)
        }
    }

    return (<>
        <Title title="Registrirajte se na Glazbeni diktat!"></Title>
        <div className="box-container" style={{ padding: "60px 200px" }}>
            {emailInput}
            {passwordInput}
            {firstNameInput}
            {lastNameInput}
            <div style={{ color: "red" }}>
                {error}
            </div>
            <div className="button-container">
                <button className="button" onClick={() => register()}>Registracija</button>
                <button className="button" onClick={() => navigate("/login")}>Prijava</button>
            </div>
        </div>
    </>
    )
}