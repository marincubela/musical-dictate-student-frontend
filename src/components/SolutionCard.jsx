import "../styles/card.css"

export function SolutionCard(props) {
    return (<>
        <div className="card" onClick={props.onClick}>
            <div className="exercisecard">
                <div>
                    <div className="exercisecard-group">
                        {props.jmbag}
                    </div>
                    <div className="exercisecard-title">
                        {props.firstName}
                    </div>
                    <div className="exercisecard-title">
                        {props.lastName}
                    </div>
                </div>
                <div className="exercisecard-bottom">
                    <div>{props.isGraded
                        ? "Ocijenjeno"
                        : "Neocijenjeno"}</div>
                    <div>Predano: {props.date}</div>
                </div>
            </div>
        </div>
    </>)
}