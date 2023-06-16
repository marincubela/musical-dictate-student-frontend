import { useState } from "react";
import GroupsService from "../api/services/Groups";
import { TitleCard } from "../components/TitleCard";
import { useLocation } from "react-router-dom";
import { NewCard } from "../components/NewCard";
import { Title } from "../components/Title";
import { useEffect } from "react";

export function StudentGroups() {
    const [groups, setGroups] = useState([]);

    const location = useLocation();

    useEffect(() => {
        (async () => {
            const res = await GroupsService.getMyGroups();
            console.log(res)
            setGroups(res);
        })()
    }, [location]);

    return (<>
        <div className="groups-container">
            <Title title="Studentske grupe"></Title>
            <div className="menucard-container">
                {groups.map(group => <>
                    <TitleCard title={group.name} route={group.id} />
                </>)}
            </div>
        </div>
    </>)
}
