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
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel } from "../components/TabPanel";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function StudentGroup() {
    const params = useParams();
    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const [group, setGroup] = useState(undefined);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        (async () => {
            const group = await GroupsService.getMyGroup(params.groupId);
            setGroup(group);
            setAssignments(group.assignments)
        })()
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const chooseAssignment = (assignmentId) => {
        navigate(`/student/assignments/${assignmentId}`)
    }

    const chooseSolution = (assignmentId) => {
        navigate(`/student/assignments/${assignmentId}/results`)
    }

    return (<>
        <div className="group-container">
            <Title title={group !== undefined ? group.name : ""} />

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered variant="fullWidth">
                        <Tab label="Zadaci" {...a11yProps(0)} />
                        <Tab label="Rezultati" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className="box-container">
                        <div className="card-container">
                            {assignments.map(assignment => {
                                return <>
                                    <ExerciseCard
                                        onClick={() => chooseAssignment(assignment.id)}
                                        group={group !== undefined ? group?.name : ""}
                                        exerciseTitle={assignment.exercise.title}
                                        teacher={assignment.exercise.teacher.firstName + " " + assignment.exercise.teacher.lastName}
                                        date={new Date(assignment.exercise.createdUtc).toLocaleDateString()}
                                    />
                                </>
                            })}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="box-container">
                        <div className="card-container">
                            {assignments.filter(a => a.studentSolutions.length !== 0).map(assignment => {
                                return <>
                                    <ExerciseCard
                                        onClick={() => chooseSolution(assignment.id)}
                                        group={group !== undefined ? group?.name : ""}
                                        exerciseTitle={assignment.exercise.title}
                                        teacher={assignment.exercise.teacher.firstName + " " + assignment.exercise.teacher.lastName}
                                        date={new Date(assignment.exercise.createdUtc).toLocaleDateString()}
                                    ></ExerciseCard>
                                </>
                            })}
                        </div>
                    </div>
                </TabPanel>
            </Box>
        </div>
    </>)
}