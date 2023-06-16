import { useNavigate, useParams } from "react-router-dom"
import { SmallTitle, Title } from "../components/Title"
import { useEffect, useState } from "react";
import StudentSolutionsService from "../api/services/StudentSolution";
import { InfoRow } from "../components/InfoRow";
import Embed from "flat-embed";

export function ResultReview() {
    const params = useParams();
    const navigate = useNavigate();

    const [solution, setSolution] = useState(null)
    const [embed, setEmbed] = useState(null);
    const [studentEmbed, setStudentEmbed] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await StudentSolutionsService.getStudentSolution(params.solutionId);
            console.log(res)
            setSolution(res);
            
            const container = document.getElementById('embed-container');
            const embed = new Embed(container, {
                embedParams: {
                    appId: '63c5d787ddc7bc4767abc961',
                    controlsPosition: 'top'
                }
            });
            await embed.loadMusicXML(base64ToArrayBuffer(res.assignment.exercise.solution.musicXml))
            setEmbed(embed);

            const studentContainer = document.getElementById('embed-container-student');
            const studentEmbed = new Embed(studentContainer, {
                embedParams: {
                    appId: '63c5d787ddc7bc4767abc961',
                    controlsPosition: 'top',
                    controlsDisplay: false,
                    controlsPlay: false,
                    hideFlatPlayback: true,
                    branding: false,
                }
            });
            await studentEmbed.loadMusicXML(base64ToArrayBuffer(res.solution.musicXml))
            setStudentEmbed(studentEmbed);
        })()
    }, [])
    return <>
        <div className="container">
            <Title title={solution !== null ? solution.assignment.exercise.title : ""} />
            <div className="full-width-container">
                <div className="box-container">
                    <SmallTitle title="Ocjena"></SmallTitle>
                    <InfoRow label="Pregledano" value={!!solution && solution.result !== null ? "DA" : "NE"}></InfoRow>
                    <InfoRow label="Pregledao" value={!!solution && solution.result !== null && solution.result.teacher !== null ? solution.result.teacher.lastName : "Strojni pregled"}></InfoRow>
                    <InfoRow label="Ocjena" value={!!solution && solution.result !== null ? solution.result.grade.name : ""}></InfoRow>
                    <InfoRow label="Točnost" value={!!solution && solution.result !== null ? solution.result.percentage : ""}></InfoRow>
                    <InfoRow label="Komentar" value={!!solution && solution.result !== null ? solution.result.comment : ""}></InfoRow>
                </div>
            </div>
            <SmallTitle title="Predano rješenje"></SmallTitle>
            <div className="sheet">
                <div id="embed-container-student" className="embed-container"></div>
            </div>
            <SmallTitle title="Točno rješenje"></SmallTitle>
            <div className="sheet">
                <div id="embed-container" className="embed-container"></div>
            </div>
        </div>
    </>
}

function base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}