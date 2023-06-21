import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Embed from 'flat-embed';
import { SmallTitle, Title } from "../components/Title";
import "../styles/exercise.css"
import "../styles/groups.css"
import "../styles/sheet.css"
import "../styles/part.css"
import "../styles/studentList.css"
import StudentSolutionsService from "../api/services/StudentSolution";
import AssignmentsService from "../api/services/Assignments";

export function StudentAssignment() {
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState();
    const [title, setTitle] = useState();
    const [embed, setEmbed] = useState(null);
    const [studentEmbed, setStudentEmbed] = useState(null);
    const [parts, setParts] = useState([]);
    const [currentPart, setCurrentPart] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAttempts, setCurrentAttempts] = useState(0);

    const params = useParams();

    useEffect(() => {
        (async () => {
            const res = await AssignmentsService.getAssignment(params.assignmentId);
            console.log(res);
            setAssignment(res);
            setTitle(res.exercise.title)
            setParts(res.exercise.parts.sort((a, b) => a.start - b.start))
            setCurrentAttempts(0);

            const container = document.getElementById('embed-container');
            const embed = new Embed(container, {
                score: '63c5d4aed4118d34674b1b42',
                embedParams: {
                    appId: '63c5d787ddc7bc4767abc961',
                    controlsPosition: 'top',
                    mode: 'edit'
                }
            });
            await embed.loadMusicXML(res.exercise.solution.musicXml)
            setEmbed(embed);

            const studentContainer = document.getElementById('embed-container-student');
            const studentEmbed = new Embed(studentContainer, {
                score: '63c5d4aed4118d34674b1b42',
                embedParams: {
                    appId: '63c5d787ddc7bc4767abc961',
                    controlsPosition: 'top',
                    controlsDisplay: false,
                    controlsPlay: false,
                    mode: 'edit'
                }
            });
            setStudentEmbed(studentEmbed);
        })()
    }, [])

    useEffect(() => {
        setCurrentAttempts(0)
    }, [currentPart])

    useEffect(() => {
        if (isPlaying)
            setCurrentAttempts(v => v + 1)
    }, [isPlaying])

    const goToMeasure = async (measureId) => {
        await embed.setCursorPosition({
            partIdx: 0,
            staffIdx: 0,
            voiceIdx: 0,
            measureIdx: measureId,
            noteIdx: 0
        })
    }

    const stop = async () => {
        await embed.stop()
        await embed.off("playbackPosition")
        setIsPlaying(false)
    }

    const playPart = async (start, end) => {
        if (!isPlaying) {
            if (currentAttempts >= parts[currentPart].allowedNumberOfAttempts)
                return;

            await embed.on("playbackPosition", function (position) {
                if (position.currentMeasure >= end)
                    stop();
            })
            await goToMeasure(start)
            setIsPlaying(true)
        }
        await embed.play()
    }
    const pause = async () => { await embed.pause() }

    const nextPart = async () => {
        if (currentPart + 1 < parts.length)
            setCurrentPart(v => v + 1)
    }

    const previousPart = async () => {
        if (currentPart - 1 >= 0)
            setCurrentPart(v => v - 1)
    }

    const sendSolution = async () => {
        const musicXml = await studentEmbed.getMusicXML({ compressed: false })

        await StudentSolutionsService.createStudentSolution({
            assignmentId: assignment.id,
            solution: musicXml
        })
        navigate("/student/groups");
    }

    return (<>
        <div className="groups-container">
            <Title title={title} />
            <div style={{ width: "100%" }}>
                <div className="box-container">
                    <SmallTitle title="Kontrolna ploča" />
                    <div className="controls-container">
                        <button className="previous-button icon-box" onClick={() => { previousPart() }}></button>
                        <button className="stop-button icon-box" onClick={() => { stop() }}></button>
                        <button className="play-button icon-box" onClick={() => { playPart(parts[currentPart].start - 1, parts[currentPart].end - 1) }}></button>
                        <button className="pause-button icon-box" onClick={() => { pause() }}></button>
                        <button className="next-button icon-box" onClick={() => { nextPart() }}></button>
                        {parts.length !== 0 ?
                            <>
                                <span>Taktovi {parts[currentPart].start + "-" + parts[currentPart].end}</span>
                                <span style={currentAttempts >= parts[currentPart].allowedNumberOfAttempts ? { color: "red" } : { color: "blue" }}>Broj pokušaja {currentAttempts}</span>
                                <span>Dopušteni broj pokušaja {parts[currentPart].allowedNumberOfAttempts}</span>
                            </> : ""
                        }
                    </div>
                </div>
            </div>
            <div className="sheet">
                <div id="embed-container-student" className="embed-container"></div>
            </div>
            <div className="sheet" style={{ height: "0px", width: "0px" }}>
                <div id="embed-container" className="embed-container"></div>
            </div>
            <div className="button-container">
                <button className="button" onClick={() => sendSolution()}>Pošalji rješenje</button>
                <button className="button" onClick={() => navigate(-1)}>Odustani</button>
            </div>
        </div>
    </>)
}

function base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}