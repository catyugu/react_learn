import { useState } from "react";
export function Toggler() {
    const [isVisible, setIsVisible] = useState(true);
    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>
                <p>{isVisible ? "Hide":"Show"}</p>
            </button>
            {isVisible && <p>This text is now visible!</p>}
        </div>
    );
}