import { useState } from "react";

export function useInput({ type, label = null }) {
    const [value, setValue] = useState("");

    const input = <div className="input-container">
        {label != null
            ? <label>{label}</label>
            : ""
        }
        <input value={value} onChange={e => setValue(e.target.value)} type={type} />
    </div>;
    return [value, setValue, input];
}