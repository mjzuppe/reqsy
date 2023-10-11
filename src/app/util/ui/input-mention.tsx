import React, { useRef, useState } from 'react';


const parseTags = (text: string) => {
    if (!text) return ""; 
    let r = [];
    const chunks = text.split(" ").map((chunk: string) => chunk[0] === "@" ? <span style={{ marginLeft: "5px", marginRight: "5px", color: "#ACDFFF" }}>{chunk}</span> : <span>{chunk}</span>)
    chunks.forEach((chunk, i) => {
        r.push(chunk);
        if (i < chunks.length - 1) r.push(<span>{" "}</span>)
    })
    return r;
}

const getCurrentChunk = (text: string, ref: any) => {
    const cursorPosition = window.getSelection().anchorOffset;
    // "@tag" || "this is a @tag" or "a @tag is not @tag2"
    const isEmpty = !Boolean(text.split("")[cursorPosition - 1].trim());
    const currentChunk = isEmpty ? "" : text.slice(0, cursorPosition).split(" ").pop();
    return currentChunk
}

const InputMention = (props: { defaultValue?: string, placeholder?: string, style?: any }) => {
    const { defaultValue, placeholder, ...rest } = props;

    // Input box
    const [value, setValue] = useState(defaultValue || null);
    const [displayPlaceholder, setDisplayPlaceholder] = useState(Boolean(!value));
    const [key, setKey] = useState(0);
    const inputRef = useRef(null);

    // Dropdown
    const [openDropdown, setOpenDropdown] = useState(false);
    const [currentDropdownChunk, setCurrentDropdownChunk] = useState("");
    const [dropdownSelected, setDropdownSelected] = useState(0);
    const dropdownRef = useRef(null);
    const options = [" abadoo", "option2", "option3"];
    const filterOptions = (options: string[], filter: string) => options.filter((option) => option.includes(filter));


    const children = value;

    const handleRender = (e: any) => setKey(key + 1);
    const handleBlur = (e: any) => {
        setValue(e.currentTarget.textContent);
        handleRender(e);
    }

    const handleInput = (e: any) => {
        // Handle display of placeholder
        if (e.currentTarget.textContent) setDisplayPlaceholder(false);
        else if (!e.currentTarget.textContent) setDisplayPlaceholder(true);

        // Handle display of dropdown
        const currentChunk = getCurrentChunk(e.currentTarget.textContent, inputRef);
        setCurrentDropdownChunk(currentChunk);
        if (Boolean(currentChunk && currentChunk[0] === "@")) {
            setOpenDropdown(true);
            setDropdownSelected(0);
        }
        else (setOpenDropdown(false));
    };
    const handleKeyDown = (e: any) => {
        // allow delete no matter what
        if (e.keyCode === 8) return;
        // prevent enter from creating a new line, but allow dropdown actions
        if (e.keyCode === 13) {
            e.preventDefault();
            if (openDropdown) {
                const newChunk = filterOptions(options, currentDropdownChunk.split("@")[1])[dropdownSelected - 1];
                const newContent = e.currentTarget.textContent.replace(currentDropdownChunk, " @" + newChunk);
                setValue(newContent);
                setOpenDropdown(false);
                handleRender(e);
                 setTimeout(() => {
                    var el = document.getElementById("editable")
                    var range = document.createRange()
                    var sel = window.getSelection()
                    console.log("EL", el.childNodes)
                    range.setStart(el.childNodes[el.childNodes.length - 1], 0)
                    range.collapse(true)
                    
                    sel.removeAllRanges()
                    sel.addRange(range)
                    
                }, 200);


                // TODO NEED TO SET CURSOR POSITION AFTER RENDER
                // const cursorPosition = window.getSelection().anchorOffset;
                
               
        

         
            }
        }
        // prevent tab from creating a new tab
        if (e.keyCode === 9) e.preventDefault();
        // prevent more then 24 characters 
        if (e.currentTarget.textContent.length > 24) e.preventDefault();
        // if dropdown is open use up and down to increase or decreate setDropdownSelected
        if (openDropdown && (e.keyCode === 38 || e.keyCode === 40)) {
            e.preventDefault();
            const direction = e.keyCode === 38 ? -1 : 1;
            const newDropdownSelected = (dropdownSelected + direction);
            if (newDropdownSelected > 0 && newDropdownSelected <= filterOptions(options, currentDropdownChunk.split("@")[1]).length) setDropdownSelected(newDropdownSelected);
        }
    }

    return (
        <div style={{ display: "grid", placeItems: "flex-start", gridTemplateAreas: "inner-div" }}>
            {displayPlaceholder ? <div style={{ padding: "1px", width: "130px", gridArea: "inner-div", color: "rgba(255, 255, 255, 0.4)" }}>{placeholder}</div> : ""}
            <div id={"editable"} ref={inputRef} onKeyDown={handleKeyDown} onInput={handleInput} style={{ padding: "1px", width: "130px", gridArea: "inner-div", border: "1px solid red" }} className="input-mention" onBlur={handleBlur} key={key} contentEditable>{parseTags(children)}</div>
            {
                openDropdown &&
                <div style={{ marginTop: "25px", width: "130px" }} className="left-menu">
                {filterOptions(options, currentDropdownChunk.split("@")[1]).map((option, i) =>
                    <div id={option} onClick={() => { }} key={i} className={`left-menu-option ${i === (dropdownSelected - 1)? "active" : ""}`}>
                        {option}
                    </div>
                )
                }
            </div>
            }
        </div>

    )
};

export { InputMention }