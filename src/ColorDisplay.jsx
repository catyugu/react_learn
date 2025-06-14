import { useState} from "react";
import ColorSelector from "./ColorSelector";

export default function ColorDisplay() { 
    const [color, setColor] = useState("gray");
    function onColorSelect(color) {
        setColor(color);
    }
    return (
        <div>
            <div style={{
                width: "200px",
                height: "200px",
                backgroundColor: color,
            }}></div>
            <h1 style={{ color: color }}>Selected Color: {color}</h1>
            <ColorSelector onColorSelect={onColorSelect} />
        </div>
    );
}