import React from "react";
import { controller } from "../functions/utils";

export const Notes = (props: {selectionData: any, currentViewValue: string, disabled: boolean}) => {
    const { selectionData, currentViewValue, disabled } = props;
    const currentViewData = currentViewValue || "default";
    const conditionId = selectionData.condition.length? selectionData.condition.filter((c:any)=>c.label === currentViewData)[0].id : "default";
    const isNew = selectionData.note.filter((n:any) => n.id === conditionId).length === 0;
    const note = selectionData.note.filter((n: any) => n.id === conditionId)[0]?.value || "";
    
    const handleNoteUpdate = async (e: any) => {
        const payload = isNew? [{id: conditionId, value: e.target.value}, ...selectionData.note] : [{id: conditionId, value: e.target.value}, ...selectionData.note.filter((n:any) => n.id !== conditionId)];
        await controller({ func: "write", data: { model: "selection", key: "note", value: payload } })
    }

    return(
        <div key={`inspector-note-${conditionId}`} style={{  width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px"}}>
            <textarea disabled={disabled} onBlur={handleNoteUpdate} defaultValue={note} maxLength={256} onKeyDown={(e)=>{if (e.key === 'Enter') e.preventDefault()}} placeholder="input notes here..." className="notes" />
        </div>
    )
}