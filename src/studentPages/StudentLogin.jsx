import { useNavigate } from "react-router-dom"
import { useInput } from "../components/Input"
import AuthService from "../api/services/Auth"
import { Title } from "../components/Title"
import { useState } from "react"
import "../styles/common.css"

export function LoginStudent() {
    const [email, setEmail, emailInput] = useInput({ type: "text", label: "E-mail" })
    const [password, setPassword, passwordInput] = useInput({ type: "password", label: "Lozinka" })

    const [error, setError] = useState("");

    const navigate = useNavigate()

    const login = async () => {
        try {
            await AuthService.loginStudent(email, password)
            navigate("/student/main");
        } catch (e) {
            console.log(e)
            setError(e.data.detail)
        }
    }

    return (<>
        <Title title="Učeniče, dobro došli na Glazbeni diktat!"></Title>

        <div className="box-container" style={{ padding: "60px 200px" }}>
            {emailInput}
            {passwordInput}
            <div style={{ color: "red" }}>
                {error}
            </div>
            <div className="button-container">
                <button className="button" onClick={() => login()}>Prijava</button>
                <button className="button" onClick={() => navigate("/student/register")}>Registracija</button>
            </div>
        </div>
    </>
    )
}

export function RegisterStudent() {
    const [email, setEmail, emailInput] = useInput({ type: "text", label: "E-mail" })
    const [password, setPassword, passwordInput] = useInput({ type: "password", label: "Lozinka" })
    const [jmbag, setJmbag, jmbagInput] = useInput({ type: "text", label: "Jmbag" })
    const [firstName, setFirstName, firstNameInput] = useInput({ type: "text", label: "Ime" })
    const [lastName, setLastName, lastNameInput] = useInput({ type: "text", label: "Prezime" })
    const [nameClass, setNameClass, nameClassInput] = useInput({ type: "text", label: "Razred" })

    const [error, setError] = useState("");

    const navigate = useNavigate()

    const register = async () => {
        try {
            await AuthService.registerStudent(email, password, jmbag, firstName, lastName, nameClass)
            navigate("/student/main");
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
            {jmbagInput}
            {firstNameInput}
            {lastNameInput}
            {nameClassInput}
            <div style={{ color: "red" }}>
                {error}
            </div>
            <div className="button-container">
                <button className="button" onClick={() => register()}>Registracija</button>
                <button className="button" onClick={() => navigate("/student/login")}>Prijava</button>
            </div>
        </div>
    </>
    )
}