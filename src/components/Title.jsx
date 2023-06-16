import "../styles/title.css"

export function Title(props) {
    return (<>
        <h1 className="title">{props.title}</h1>
    </>)
}

export function SmallTitle(props) {
    return <div style={{width: "100%"}}>
        <h2 className="title title-small">{props.title}</h2>
        <hr />
    </div>
}