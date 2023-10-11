import React, { ReactNode, useRef, useState } from 'react';
/// create div with contentEditable
/// create placeholder
/// create dropdown with options below div
/// create basic search filter for dropdown
/// listen to input (onInput (e) e.currenttarget.textContent)
/// when current chunk starts with '@' display dropdown if valid options exists
/// if an option is selected, replace current chunk with option
/// listen to input and if chunk with @ is valid, style with <span/>

const InputMention = (props: { placeholder?: string, style?: any }) => {
    const { placeholder, ...rest } = props;
    const inputRef = useRef(null);
    const [value, setValue] = useState("");
    const [focus, setFocus] = useState(false);
    const parseTags = (text: string) => !text ? "" : text.split(" ").map((chunk: string) => chunk[0] === "@" ? <span style={{ marginLeft: "5px", marginRight: "5px", color: "#ACDFFF" }}>{chunk}</span> : chunk );
    const Placeholder = () => placeholder || "";

    const handleFocus = (e: any) => setFocus(true);
    const handleBlur = (e: any) => setFocus(false);
    const handleInput = (e: any) => {
        e.preventDefault();
        setValue(e.currentTarget.textContent);
    }
    const handleClick = () => {
        setFocus(true);
        setTimeout(() => inputRef.current.focus(), 100);
        
    }

    const tempStyle = { width: "100px", height: "30px", lineHeight: "30px", paddingLeft: "1px" };
    console.log("REST", rest)
    return (
        <div {...rest} onClick={handleClick}>
            <div style={tempStyle} key={focus? "items-border-bottom" : "hide"} ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} onInput={handleInput} contentEditable/>
            <div style={tempStyle} className={!focus? "items-border-bottom" : "hide"}>{!value? placeholder : parseTags(value)}</div>
        </div>

    )
}

export { InputMention }