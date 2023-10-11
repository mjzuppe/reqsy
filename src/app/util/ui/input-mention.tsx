import React, { useRef, useState } from 'react';


const parseTags = (text: string) => !text ? "" : text.split(" ").map((chunk: string) => chunk[0] === "@" ? <span style={{ marginLeft: "5px", marginRight: "5px", color: "#ACDFFF" }}>{chunk}</span> : chunk );

const InputMention = (props: { defaultValue?: string, placeholder?: string, style?: any }) => {
    const { defaultValue, placeholder, ...rest } = props;

    const [value, setValue] = useState(defaultValue || null);
    const [displayPlaceholder, setDisplayPlaceholder] = useState(Boolean(!value));
    const [key, setKey ] = useState(0);
    
    const children = value;
    
    const handleRender = (e: any) => setKey(key + 1)    ;
    const handleBlur = (e: any) => {
        setValue(e.currentTarget.textContent);
        handleRender(e);
    }

    const handleInput = (e: any) => {
        if (e.currentTarget.textContent) setDisplayPlaceholder(false);
        else if (!e.currentTarget.textContent) setDisplayPlaceholder(true);
    };
    const handleKeyDown = (e: any) => {
        // allow delete no matter what
        if (e.keyCode === 8) return;
        // prevent enter from creating a new line
        if (e.keyCode === 13) e.preventDefault();
        // prevent tab from creating a new tab
        if (e.keyCode === 9) e.preventDefault();
        // prevent more then 24 characters 
        if (e.currentTarget.textContent.length > 24) e.preventDefault();
    }


    return (
    <div  style={{display: "grid", placeItems: "flex-start", gridTemplateAreas: "inner-div"}}>
        {displayPlaceholder ? <div style={{padding: "1px", width: "130px",gridArea: "inner-div", color: "rgba(255, 255, 255, 0.4)"}}>{placeholder}</div> : ""}
        <div onKeyDown={handleKeyDown} onInput={handleInput} style={{padding: "1px", width: "130px", gridArea: "inner-div", border: "1px solid red"}} className="input-mention" onBlur={handleBlur} key={key} contentEditable>{parseTags(children)}</div>
    </div>
    
    )};

export { InputMention }