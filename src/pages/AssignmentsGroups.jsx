import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GroupsService from "../api/services/Groups";
import { TitleCard } from "../components/TitleCard";
import { SmallTitle, Title } from "../components/Title";


export function AssignmentsGroups() {
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
                {groups.length !== 0
                    ? groups.map(group => <>
                        <TitleCard title={group.name} route={group.id} />
                    </>)
                    : <SmallTitle title="Nije vam dodijeljena nijedna grupa" />
                }
            </div>
        </div>
    </>)
}