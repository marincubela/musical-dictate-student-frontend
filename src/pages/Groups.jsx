import { useLocation, useNavigate } from "react-router-dom";
import { useInput } from "../components/Input";
import { NewCard } from "../components/NewCard";
import { Title } from "../components/Title";
import { TitleCard } from "../components/TitleCard";
import { useEffect, useState } from "react";
import GroupsService from "../api/services/Groups";
import "../styles/groups.css"
import "../styles/main.css"

export function Groups() {
    const [groups, setGroups] = useState([]);

    const location = useLocation();

    useEffect(() => {
        (async () => {
            const res = await GroupsService.getGroups();
            setGroups(res);
        })()
    }, [location]);

    return (<>
        <div className="groups-container">
            <Title title="Studentske grupe"></Title>
            <div className="menucard-container">
                <NewCard route="/group/create" />
                {groups.map(group => <>
                    <TitleCard title={group.name} route={group.id} />
                </>)}
            </div>
        </div>
    </>)
}

export function CreateGroup() {
    const [name, setName, nameInput] = useInput({ type: "text", label: "Unesite naziv nove grupe:" })
    const navigate = useNavigate();

    useEffect(() => {
        setName("Nova grupa")
    }, []);

    const saveGroup = async () => {
        await GroupsService.createGroup({
            name
        })
        navigate("/groups");
    }

    return (<>
        <Title title={name}></Title>
        {nameInput}
        <div>
            <button className="button" onClick={saveGroup}>Spremi</button>
            <button className="button" onClick={() => navigate(-1)}>Odustani</button>
        </div>
    </>)
}