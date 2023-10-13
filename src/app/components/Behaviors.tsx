import React, { useState } from "react";
import { Textbox, SegmentedControlOption, Dropdown, IconCode16, IconButton, IconEllipsis32, TextboxAutocomplete, Button } from "figma-ui-kit";
import { Select } from "../util/ui/select";
import { CommonUI, EventHandlers, AdditionalEvents, HTMLElements } from "../util/ui/behaviors";
import { PlusMinusToggle } from "../util/ui/plusminus";
import { Menu } from "../util/ui/menu";
import { InputMention } from "../util/ui/input-mention";
import { controller } from "../functions/utils";


const elementCategory = [...CommonUI, ...HTMLElements].map((e: any) => ({ label: e.category, value: e.category })).sort((a, b) => a.label.localeCompare(b.label));
const allParametersSet = new Set();
[...CommonUI, ...HTMLElements, ...AdditionalEvents].forEach((e: any) => e.parameters.forEach((p: any) => allParametersSet.add(p)));
EventHandlers.forEach((e: any) => allParametersSet.add(e));
const allParametersOptions = Array.from(allParametersSet).map((p: any) => ({ value: p, label: p })).sort((a, b) => a.label.localeCompare(b.label));

const BehaviorRow = (props: {db:any, handleUpdate: (e:any) => any, behavior?: {key: string, value: string}}) => {
    const { db, handleUpdate, behavior } = props;
    const [param, setParam] = useState(behavior?.key || "");
    const [value, setValue] = useState(behavior?.value || "");
    const variables = Object.keys(db.variable).map((id:any)=> ({id, ...db.variable[id] }));

    const clickHandlerDelete = () => { }; // TODO complete
    return (<div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{width: "45%"}}><TextboxAutocomplete onBlur={()=>handleUpdate({key: param, value})} filter variant="underline" placeholder="Enter parameter" value={param} onInput={(e) => setParam(e.currentTarget.value)} options={allParametersOptions} /></div>
        <InputMention options={variables} defaultValue={value} onInput={(e:string)=>setValue(e)} onBlur={()=>handleUpdate({key: param, value})} style={{ width: "45%", height: "20px" }} placeholder="Enter value" />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Menu danger marginLeft={"-28px"} onClick={() => clickHandlerDelete} options={["delete?"]} trigger={<IconButton><IconEllipsis32 /></IconButton>} />
        </div>
    </div>)
}

const BehaviorRows = (props: {db:any, updateBehavior: (any) => any, isNew, behaviors}) => {
    const { db, updateBehavior, isNew, behaviors } = props;
    const [newBehaviorRow, setNewBehaviorRow] = useState(false);
    const handleNewBehaviorRow = (v: boolean) => setNewBehaviorRow(!newBehaviorRow);

    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <PlusMinusToggle value={!newBehaviorRow} onClick={handleNewBehaviorRow} />
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px" }}>
                {newBehaviorRow && <BehaviorRow db={db} handleUpdate={updateBehavior} />}
                {behaviors.map((b: any) => <BehaviorRow db={db} behavior={b} handleUpdate={updateBehavior} />)}
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

export const Behaviors = (props: { db: any, selectionData: any, currentViewValue: string, disabled: boolean }) => {
    const { db, selectionData, currentViewValue, disabled } = props;
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

    const view = displayRows ? <BehaviorRows db={db} updateBehavior={handleUpdateBehavior} isNew={isNew} behaviors={behaviors} /> :
        selectBehaviorView ? <SuggestBehavior handleCancel={() => setSelectBehaviorView(false)} /> :
            <CreateBehaviors handleClick={handleCreateClick} />


    return <div key={`inspector-behavior}`} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px" }}>
        {view}
    </div>
}