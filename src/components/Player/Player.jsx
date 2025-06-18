import { useState } from "react";

export default function Player({initialName, symbol, isActive, onSave}) {
    const [isEdited, setIsEdited] = useState(false);
    const [updatedName, setName] = useState(initialName);
    // let nameToBeUsed = initialName;

    function handleEditing(){
        setIsEdited((editing)=>!editing);
        if(isEdited){
            onSave(symbol, updatedName);
        };
    }

    function handleChangeName(event) {
        setName(event.target.value);
    }

    let inputSpan = <span className="player-name">{updatedName}</span>;
    let buttonText = "Edit";

    if(isEdited){
        inputSpan = <input type="text" required value={updatedName} onChange={handleChangeName}/>;
        buttonText = "Save";
    }else{
        inputSpan = <span className="player-name">{updatedName}</span>;
        buttonText = "Edit";
    }

    return (
        <li className={isActive? 'active' : undefined}>
            <span className="player">
              {inputSpan}
              <span className="player-symbol">{symbol}</span>
            </span>
            {isEdited}
            <button onClick={handleEditing}>{buttonText}</button>
        </li>
    );
}