import "../styles/common.css"

export function InfoRow({label, value}) {
    return <div className="inforow">
        <div className="inforow-label">{label}</div>
        <div className="inforow-value">{value}</div>
    </div>
}