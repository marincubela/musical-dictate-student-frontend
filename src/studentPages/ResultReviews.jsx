import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import StudentSolutionsService from "../api/services/StudentSolution";
import AssignmentsService from "../api/services/Assignments";
import { SmallTitle, Title } from "../components/Title";
import { ReviewListHeader, ReviewListItem } from "../components/ReviewListItem";

export function ResultReviews() {
    const params = useParams();
    const navigate = useNavigate();

    const [solutions, setSolutions] = useState([])
    const [assignment, setAssignment] = useState(null)

    useEffect(() => {
        (async () => {
            const res = await StudentSolutionsService.getMyStudentSolutions(params.assignmentId);
            const assignmentResponse = await AssignmentsService.getAssignment(params.assignmentId)
            console.log(assignmentResponse)
            setSolutions(res);
            setAssignment(assignmentResponse)
        })()
    }, [])

    return <>
        <div className="container">
            <Title title={assignment !== null ? assignment.exercise.title : ""} />
            <div className="full-width-container">
                <div className="box-container">
                    <SmallTitle title="Odaberite rješenje"></SmallTitle>
                    <ReviewListHeader></ReviewListHeader>
                    {solutions.map(solution => {
                        return <>
                            <ReviewListItem
                                onClick={() => navigate(solution.id)}
                                title={assignment.exercise.title}
                                date={new Date(solution.createdUtc).toLocaleDateString()}
                                isGraded={solution.result != null}>
                            </ReviewListItem>
                        </>
                    })}
                </div>
            </div>
        </div>
    </>
}