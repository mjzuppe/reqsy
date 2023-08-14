import React from "react";

export const Notes = () => {
    return(
        <div style={{  width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px"}}>
            <textarea placeholder="input notes here..." className="notes" />
        </div>
    )
}