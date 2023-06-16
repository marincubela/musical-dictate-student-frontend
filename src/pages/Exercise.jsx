import { useNavigate, useParams } from "react-router-dom";
import { useInput } from "../components/Input";
import { useEffect, useState } from "react";
import Embed from 'flat-embed';
import { SmallTitle, Title } from "../components/Title";
import { Part } from "../components/Part";
import "../styles/exercise.css"
import "../styles/groups.css"
import "../styles/sheet.css"
import "../styles/part.css"
import "../styles/studentList.css"
import ExercisesService from "../api/services/Exercises";

export function Exercise() {
    const navigate = useNavigate();
    const [exercise, setExercise] = useState();
    const [parts, setParts] = useState([]);
    const [title, setTitle, titleInput] = useInput({ type: "text", label: "Naslov:" });
    const [embed, setEmbed] = useState(null);
    const [newPartStart, setNewPartStart, newPartInputStart] = useInput({ type: "number", label: null })
    const [newPartEnd, setNewPartEnd, newPartInputEnd] = useInput({ type: "number", label: null })
    const [newPartAttempts, setNewPartAttempts, newPartInputAttempts] = useInput({ type: "number", label: null })
    const [newPartTime, setNewPartTime, newPartInputTime] = useInput({ type: "number", label: null })

    const params = useParams();

    useEffect(() => {
        (async () => {
            const exercise = await ExercisesService.getExercise(params.exerciseId)
            console.log(exercise);
            setExercise(exercise);
            setParts(exercise.parts)

            setTitle(exercise.title)
            const container = document.getElementById('embed-container');
            const embed = new Embed(container, {
                score: '63c5d4aed4118d34674b1b42',
                embedParams: {
                    appId: '63c5d787ddc7bc4767abc961',
                    controlsPosition: 'top',
                    mode: 'edit'
                }
            });
            console.log((exercise.solution.musicXml))
            embed.loadMusicXML(base64ToArrayBuffer(exercise.solution.musicXml))
            setEmbed(embed);
            setNewPartStart(1)
            setNewPartEnd(1)
            setNewPartAttempts(1)
            setNewPartTime(1)
        })()
    }, [])

    const addPart = () => {
        if (parts.filter(p => p.start === newPartStart).length !== 0)
            return;
        setParts([...parts, { start: newPartStart, end: newPartEnd, allowedNumberOfAttempts: newPartAttempts, allowedTimeInSeconds: newPartTime }])
        setNewPartStart(1)
        setNewPartEnd(1)
        setNewPartAttempts(1)
        setNewPartTime(1)
    }

    const deletePart = (part) => {
        setParts(parts.filter(p => p.start != part.start))
    }

    const goToMeasure = async (measureId) => {
        await embed.setCursorPosition({
            partIdx: 0,
            staffIdx: 0,
            voiceIdx: 0,
            measureIdx: measureId,
            noteIdx: 0
        })
    }

    const stop = async () => { await embed.stop() }
    const playPart = async (start, end) => {
        await stop()
        await embed.off("playbackPosition")
        await embed.on("playbackPosition", function (position) {
            if (position.currentMeasure >= end)
                stop();
        })
        await goToMeasure(start)
        await embed.play()
    }
    const pause = async () => { await embed.pause() }

    const updateExercise = async () => {
        if (parts.length === 0)
            return;
        const buffer = await embed.getMusicXML({ compressed: true })
        const formData = new FormData()
        formData.append("id", exercise.id)
        formData.append("title", title)
        formData.append("sheet", new Blob([buffer], {
            type: 'application/vnd.recordare.musicxml+xml'
        }))
        formData.append("parts", JSON.stringify(parts))
        await ExercisesService.updateExercise(formData)
        navigate("/exercises");
    }

    const deleteExercise = async () => {
        await ExercisesService.deleteExercise(exercise.id)
        navigate("/exercises");
    }

    return (<>
        <div className="groups-container">
            <Title title={title} />
            <div style={{ width: "100%" }}>
                <div className="box-container">
                    <SmallTitle title="Informacije" />
                    {titleInput}
                </div>
            </div>
            <div className="sheet">
                <div id="embed-container" className="embed-container"></div>
            </div>
            <div style={{ width: "100%" }}>
                <div className="box-container">
                    <SmallTitle title="Podijeli vježbu na dijelove" />
                    <div className="part-list-item">
                        <Part part={{ start: "Početak", end: "Kraj", allowedNumberOfAttempts: "Dopušteni broj pokušaja", allowedTimeInSeconds: "Dopušteno vrijeme" }} />
                        <div className="studentListItem-delete-box"></div>
                    </div>
                    {parts.map(part => <div className="part-list-item" key={part.start.toString()} >
                        <Part part={part} />
                        <button className="play-button icon-box" onClick={() => playPart(part.start - 1, part.end - 1)}></button>
                        <button className="studentListItem-delete-box studentListItem-delete-button" onClick={() => deletePart(part)}></button>
                    </div>
                    )}
                    <div className="part-list-item">
                        <div className="part-column">{newPartInputStart}</div>
                        <div className="part-column">{newPartInputEnd}</div>
                        <div className="part-column">{newPartInputAttempts}</div>
                        <div className="part-column">{newPartInputTime}</div>
                        <div className="studentListItem-delete-box"></div>
                    </div>
                    <button className="button" onClick={addPart}>Dodaj dio</button>
                </div>
            </div>
            <div className="button-container">
                <button className="button" onClick={updateExercise}>Spremi promjene</button>
                <button className="button" onClick={deleteExercise}>Obriši vježbu</button>
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