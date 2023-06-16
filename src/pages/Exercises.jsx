import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SmallTitle, Title } from "../components/Title";
import { NewCard } from "../components/NewCard";
import { ExerciseCard } from "../components/ExerciseCard";
import { useInput } from "../components/Input";
import { Part } from "../components/Part";
import ExercisesService from "../api/services/Exercises";
import Embed from 'flat-embed';
import "../styles/exercise.css"
import "../styles/common.css";

export function Exercises() {
    const navigate = useNavigate();
    const location = useLocation();

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        (async () => {
            const exercises = await ExercisesService.getExercises()
            setExercises(exercises);
        })()
    }, [location]);

    return (<>
        <div className="groups-container">
            <Title title="Vježbe"></Title>
            <div className="menucard-container">
                <NewCard route="/exercise/create" />
                {exercises.map(exercise => <>
                    <ExerciseCard onClick={() => { navigate(exercise.id) }} group={exercise.id} exerciseTitle={exercise.title} teacher={exercise.teacher.firstName + " " + exercise.teacher.lastName} date={new Date(exercise.createdUtc).toLocaleDateString()} />
                </>)}
            </div>
        </div>
    </>)
}

export function CreateExercise() {
    const navigate = useNavigate();
    const [title, setTitle, titleInput] = useInput({ type: "text", label: "Naslov:" });
    const [parts, setParts] = useState([]);
    const [embed, setEmbed] = useState(null);
    const [newPartStart, setNewPartStart, newPartInputStart] = useInput({ type: "number", label: null })
    const [newPartEnd, setNewPartEnd, newPartInputEnd] = useInput({ type: "number", label: null })
    const [newPartAttempts, setNewPartAttempts, newPartInputAttempts] = useInput({ type: "number", label: null })
    const [newPartTime, setNewPartTime, newPartInputTime] = useInput({ type: "number", label: null })

    useEffect(() => {
        setTitle("Nova vježba")

        const container = document.getElementById('embed-container');
        const embed = new Embed(container, {
            score: '63c5d4aed4118d34674b1b42',
            embedParams: {
                appId: '63c5d787ddc7bc4767abc961',
                controlsPosition: 'top',
                mode: 'edit'
            }
        });
        setEmbed(embed);
        setNewPartStart(1)
        setNewPartEnd(1)
        setNewPartAttempts(1)
        setNewPartTime(1)
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

    const saveChanges = async () => {
        if (parts.length === 0)
            return;
        const buffer = await embed.getMusicXML({ compressed: true })
        const formData = new FormData()
        formData.append("title", title)
        formData.append("sheet", new Blob([buffer], {
            type: 'application/vnd.recordare.musicxml+xml'
        }))
        formData.append("parts", JSON.stringify(parts))
        await ExercisesService.createExercise(formData)
        navigate("/exercises");
    }

    return <>
        <Title title={title}></Title>
        <div style={{ width: "100%" }}>
            <div className="box-container">
                <SmallTitle title="Informacije" />
                {titleInput}
            </div>
        </div>
        <SmallTitle title="Unos notnog zapisa" />
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
            <button className="button" onClick={saveChanges}>Spremi</button>
            <button className="button" onClick={() => navigate(-1)}>Odustani</button>
        </div>
    </>
}