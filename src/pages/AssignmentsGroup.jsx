import { SmallTitle, Title } from "../components/Title";
import { ExerciseCard } from "../components/ExerciseCard";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import GroupsService from "../api/services/Groups";
import "../styles/groups.css";
import "../styles/input.css";
import "../styles/main.css";
import "../styles/card.css";
import "../styles/common.css";
import "../styles/studentList.css";

export function AssignmentsGroup() {
    const params = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState(undefined);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        (async () => {
            const group = await GroupsService.getGroup(params.groupId);
            setGroup(group);
            setAssignments(group.assignments)
        })()
    }, [])

    const chooseAssignment = (assignmentId) => {
        navigate(`/assignments/${assignmentId}`)
    }

    return (<>
        <div className="group-container">
            <Title title={group !== undefined ? group.name : ""} />
            <div className="card-container">
                {assignments.length !== 0
                    ? assignments.map(assignment => {
                        return <>
                            <ExerciseCard
                                onClick={() => chooseAssignment(assignment.id)}
                                group={group !== undefined ? group?.name : ""}
                                exerciseTitle={assignment.exercise.title}
                                teacher={assignment.exercise.teacher.firstName + " " + assignment.exercise.teacher.lastName}
                                date={new Date(assignment.exercise.createdUtc).toLocaleDateString()}
                            />
                        </>
                    })
                    : <SmallTitle title="Nema dodijeljenih zadataka za ovu grupu" />}
            </div>
        </div>
    </>)
}