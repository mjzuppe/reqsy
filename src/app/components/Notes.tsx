import React from "react";

export const Notes = () => {
    return(
        <div style={{  width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px"}}>
            <textarea maxLength={256} onKeyDown={(e)=>{if (e.key === 'Enter') e.preventDefault()}} placeholder="input notes here..." className="notes" />
        </div>
    )
}