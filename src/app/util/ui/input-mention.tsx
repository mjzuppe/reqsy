import React, { useRef, useState } from 'react';


const parseTags = (text: string) => {
    if (!text) return ""; 
    const chunks = text.split(" ").map((chunk: string, i: number) => chunk[0] === "@" ? <span style={{color: "#ACDFFF" }}>{chunk}</span> : <span >{chunk}</span>)
    let r = [];
    chunks.forEach((chunk, i) => {
        r.push(chunk);
        r.push(<span>{" "}</span>); // required to add space and reset style
    })
    return r;
}

const getCurrentChunk = () => {
    const cursorPosition:number = window.getSelection().anchorOffset;
    const text = window.getSelection().anchorNode.textContent;
    // "@tag" || "this is a @tag" or "a @tag is not @tag2"
    const isEmpty = !Boolean(text.split("")[cursorPosition - 1].trim());
    const currentChunk = isEmpty ? "" : text.slice(0, cursorPosition).split(" ").pop();
    return currentChunk
}

const InputMention = (props: { onBlur: (e:any)=>any, onInput: (e:any)=>any, defaultValue?: string, placeholder?: string, style?: any }) => {
    const { onBlur, onInput, defaultValue, placeholder, ...rest } = props;

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
    const options = ["abadoo", "option2", "option3"];
    const filterOptions = (options: string[], filter: string) => options.filter((option) => option.includes(filter));

    const handleRender = (e: any) => setKey(key + 1);
    const handleBlur = (e: any) => {
        onBlur(e);
        setValue(e.currentTarget.textContent);
        handleRender(e);
        
    }
    

    const handleInput = (e: any) => {
        onInput(e.currentTarget.textContent);
        
        // Handle display of placeholder
        if (e.currentTarget.textContent) setDisplayPlaceholder(false);
        else if (!e.currentTarget.textContent) setDisplayPlaceholder(true);

        // Handle display of dropdown
        const currentChunk = getCurrentChunk();
        setCurrentDropdownChunk(currentChunk);
        if (Boolean(currentChunk && currentChunk[0] === "@")) {
            setOpenDropdown(true);
            setDropdownSelected(0);
        }
        else (setOpenDropdown(false));

        // Refocus if previous chunk is tag and new chunk length is 1
        // if (currentChunk && currentChunk.length === 1) {
        //     inputRef.current.blur();
        //     refocus();
        // }
    };
    const handleKeyDown =  async (e: any) => {
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
                refocus();

         
            }
        }
        // if space is pressed, close dropdown
        if (e.keyCode === 32) {
            setOpenDropdown(false);
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

    const refocus = () => {
        setTimeout(() => {
            var el = document.getElementById("editable")
            var range = document.createRange()
            var sel = window.getSelection()
            range.setStart(el.childNodes[el.childNodes.length - 1], 1)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
        }, 5);
    }

    return (
        <div style={{ display: "grid", placeItems: "flex-start", gridTemplateAreas: "inner-div" }}>
            {displayPlaceholder ? <div style={{ padding: "1px", width: "130px", gridArea: "inner-div", color: "rgba(255, 255, 255, 0.4)" }}>{placeholder}</div> : ""}
            <div id={"editable"} ref={inputRef} onKeyDown={handleKeyDown} onInput={handleInput} style={{ padding: "1px", width: "130px", gridArea: "inner-div" }} className="input-mention" onBlur={handleBlur} key={key} contentEditable>{parseTags(value)}</div>
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