import { useContext, useRef} from "react";
import { UserContext } from "./UserContext";

export function ProfileCard() {
    const { name, email } = useContext(UserContext);
    const inputRef  = useRef(null);
    return (
        <div>
            <div className="profile-card"
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9"
                }}
            >
                <p>Name: {name}</p>
                <p>Email: {email}</p>
            </div>
            <input ref={inputRef} type="text" />
            <button
                onClick={()=>{
                    inputRef.current.focus();
                }}
            >Click me to focus!</button>
        </div>
    );
}