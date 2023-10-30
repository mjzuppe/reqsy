import React, { useState } from "react";
import { Textbox, SegmentedControlOption, Dropdown, IconCode16, IconButton, IconEllipsis32, TextboxAutocomplete, Button } from "figma-ui-kit";
import { Select } from "../util/ui/select";
import { CommonUI, EventHandlers, AdditionalEvents, HTMLElements } from "../util/ui/behaviors";
import { PlusMinusToggle } from "../util/ui/plusminus";
import { Menu } from "../util/ui/menu";
import { controller } from "../functions/utils";


const elementCategory = [...CommonUI, ...HTMLElements].map((e: any) => ({ label: e.category, value: e.category })).sort((a, b) => a.label.localeCompare(b.label));
const allParametersSet = new Set();
[...CommonUI, ...HTMLElements, ...AdditionalEvents].forEach((e: any) => e.parameters.forEach((p: any) => allParametersSet.add(p)));
EventHandlers.forEach((e: any) => allParametersSet.add(e));
const allParametersOptions = Array.from(allParametersSet).map((p: any) => ({ value: p, label: p })).sort((a, b) => a.label.localeCompare(b.label));

const DetailCard = (props: { type: string, description: string }) => 
<div className="detail-card" >
            <div style={{width: "100%"}}><span style={{fontWeight: "bold"}}>Type: </span><span style={{fontWeight: "normal"}}>{props.type}</span></div>
            <div style={{width: "100%"}}><span style={{fontWeight: "bold"}}>Data: </span><span style={{fontWeight: "normal"}}>{props.description}</span></div>
        </div>

const BehaviorRow = (props: {db:any, disabled: boolean, readOnly: boolean, handleUpdate: (e:any) => any, behavior?: {key: string, value: string}}) => {
    const { db, handleUpdate, behavior, disabled, readOnly } = props;
    const [param, setParam] = useState(behavior?.key || "");
    const [value, setValue] = useState(behavior?.value || "");
    const [showDetail, setShowDetail] = useState(false);
    const variables = Object.keys(db.variable).map((v:any)=>({value: db.variable[v].label}));
    const variableInUse = Object.keys(db.variable).filter((v:any)=>db.variable[v].label === value).map((v:any)=>({...db.variable[v]}));

    const clickHandlerDelete = () => { }; // TODO complete

    return (<div style={{ width: "290px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginLeft: "5px", paddingRight: "0px"}}>
        
        <div style={{width: "120px"}}><TextboxAutocomplete disabled={disabled || readOnly} onBlur={()=>handleUpdate({key: param, value})} filter variant="underline" placeholder="parameter..." value={param} onInput={(e) => setParam(e.currentTarget.value)} options={allParametersOptions} /></div>
        <div style={{width: "120px"}}>

            {(Boolean(variableInUse.length) && showDetail) && <DetailCard type={variableInUse[0].type} description={variableInUse[0].description}/>}
            <TextboxAutocomplete onMouseOver={()=>setShowDetail(true)} onMouseLeave={()=>setShowDetail(false)} style={{color: Boolean(variableInUse.length)? "#0d99ff":"initial"}} disabled={disabled || readOnly} onBlur={()=>handleUpdate({key: param, value})} filter variant="underline" placeholder="value/variable..." value={value} onInput={(e) => setValue(e.currentTarget.value)} options={variables} /></div>
        {(!readOnly && !disabled) &&
           <Menu danger marginLeft={"-28px"} onClick={() => clickHandlerDelete} options={["delete?"]} trigger={<IconButton><IconEllipsis32 /></IconButton>} />
        }
    </div>)
}

const BehaviorRows = (props: {db:any, disabled: boolean, readOnly: boolean, updateBehavior: (any) => any, isNew, behaviors}) => {
    const { db, updateBehavior, isNew, behaviors, disabled, readOnly } = props;
    const [newBehaviorRow, setNewBehaviorRow] = useState(false);
    const handleNewBehaviorRow = (v: boolean) => setNewBehaviorRow(!newBehaviorRow);

    return (
        <div style={{ width: "100%", paddingRight: "5px" }}>
            {(!disabled && !readOnly) && <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <PlusMinusToggle value={!newBehaviorRow} onClick={handleNewBehaviorRow} />
            </div>}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px" }}>
                {(!behaviors.length && (disabled || readOnly)) && <div style={{marginLeft: "10px"}}>No behaviors are set for this element.</div> }
                {newBehaviorRow && <BehaviorRow db={db} handleUpdate={updateBehavior} disabled={disabled} readOnly={readOnly} />}
                {behaviors.map((b: any) => <BehaviorRow db={db} behavior={b} handleUpdate={updateBehavior} disabled={disabled} readOnly={readOnly} />)}
            </div>
        </div>
    )
};

const CreateBehaviors = (props: { handleClick: (any) => any }) => {
    const { handleClick } = props;
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", paddingBottom: "10px" }}>
            <Button onClick={() => handleClick(true)} style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}>Use recommended</Button>
            <Button onClick={() => handleClick(false)} style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}>Create manually</Button>
        </div>
    )
}


const SuggestBehavior = (props: { handleCancel: (any) => any }) => <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", paddingBottom: "10px" }}>
    <Select style={{ width: "100px" }} id="behavior-element-type-select" defaultValue={null} placeholder="Type of element/UI" options={elementCategory} />
    <Button onClick={() => { }} style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}>submit</Button>
    <Button onClick={props.handleCancel} secondary style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}>cancel</Button>
</div>

export const Behaviors = (props: { db: any, selectionData: any, currentViewValue: string, disabled: boolean, readOnly: boolean }) => {
    const { db, selectionData, currentViewValue, disabled, readOnly } = props;
    const currentViewData = currentViewValue || "default";
    const conditionId = selectionData.condition.length? selectionData.condition.filter((c:any)=>c.label === currentViewData)[0].id : "default";
    const isNew = selectionData.behavior.filter((n:any) => n.id === conditionId).length === 0;
    const behaviors = selectionData.behavior.filter((n: any) => n.id === conditionId)[0]?.value || [];

    const [selectBehaviorView, setSelectBehaviorView] = useState(false);
    const [displayRows, setDisplayRows] = useState(Boolean(behaviors.length)); // TODO determine value based on if param is populated

    const handleCreateClick = (v: boolean) => {
        if (v) setSelectBehaviorView(v);
        else setDisplayRows(true);
    };

    const handleUpdateBehavior = async (e: any) => {
        const payload = isNew? [{id: conditionId, value: [e]}] : [{id: conditionId, value: [e]}, ...selectionData.behavior.filter((n:any) => n.id !== conditionId)];
        await controller({ func: "write", data: { model: "selection", key: "behavior", value: payload } })
    }

    const view = (displayRows || disabled || readOnly) ? <BehaviorRows db={db} updateBehavior={handleUpdateBehavior} isNew={isNew} behaviors={behaviors} disabled={disabled} readOnly={readOnly} /> :
        selectBehaviorView ? <SuggestBehavior handleCancel={() => setSelectBehaviorView(false)} /> :
            <CreateBehaviors handleClick={handleCreateClick} />


    return <div key={`inspector-behavior}`} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px" }}>
        {view}
    </div>
}