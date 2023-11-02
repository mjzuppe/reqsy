import React, { useState } from "react";
import { Textbox, SegmentedControlOption, Dropdown, IconCode16, IconButton, IconEllipsis32, TextboxAutocomplete, Button } from "figma-ui-kit";
import { Select } from "../util/ui/select";
// import { CommonUI, EventHandlers, AdditionalEvents, HTMLElements } from "../util/ui/behaviors";
import { PlusMinusToggle } from "../util/ui/plusminus";
import { Menu } from "../util/ui/menu";
import { controller } from "../functions/utils";
// Data
import {commonBehaviors} from "../util/ui/common-behaviors";


const elementCategory = commonBehaviors.map((e: any) => ({ label: `<${e.element}/>`, value: e.element })).sort((a, b) => a.label.localeCompare(b.label));
const allParametersSet = new Set();
commonBehaviors.map((b:any) => b.attributes?.forEach((e: any) => allParametersSet.add(e)));
commonBehaviors.map((b:any) => b.eventHandlers?.forEach((e: any) => allParametersSet.add(e)));
let allParametersOptions = Array.from(allParametersSet).map((e: any) => ({ value: e })).sort((a, b) => a.value.localeCompare(b.value));


const ToolTip = (props: { type: string, description: string }) =>
    <div className="tool-tip" >
        <div style={{ width: "100%" }}><span style={{ fontWeight: "bold" }}>Type: </span><span style={{ fontWeight: "normal" }}>{props.type}</span></div>
        <div style={{ width: "100%" }}><span style={{ fontWeight: "bold" }}>Notes/Validation: </span><span style={{ fontWeight: "normal" }}>{props.description}</span></div>
    </div>

const BehaviorRow = (props: { db: any, disabled: boolean, readOnly: boolean, index: number, handleUpdate: (e: any) => any, handleDelete?: (e: any) => any, behavior?: { key: string, value: string } }) => {
    const { db, handleUpdate, handleDelete, behavior, disabled, readOnly, index } = props;
    const [param, setParam] = useState(behavior?.key || "");
    const [value, setValue] = useState(behavior?.value || "");
    const [showDetail, setShowDetail] = useState(false);
    const variables = Object.keys(db.variable).map((v: any) => ({ value: db.variable[v].label }));
    const variableInUse = Object.keys(db.variable).filter((v: any) => db.variable[v].label === value).map((v: any) => ({ ...db.variable[v] }));


    return (<div style={{ width: "290px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginLeft: "5px", paddingRight: "0px" }}>

        <div style={{ width: "120px" }}><TextboxAutocomplete disabled={disabled || readOnly} onBlur={() => handleUpdate({ key: param, value, index })} filter variant="underline" placeholder="parameter..." value={param} onInput={(e) => setParam(e.currentTarget.value)} options={allParametersOptions} /></div>
        <div style={{ width: "120px", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative" }}>
            
            {
            (Boolean(variableInUse.length) && showDetail) ? 
            <div style={{ width: "120px", height: "100px", margin: "0px", padding: "0px", position: "absolute", display: "flex", flexDirection: "column", justifyContent: "flex-end", }}>
                <ToolTip type={variableInUse[0].type} description={variableInUse[0].description} />
                <TextboxAutocomplete onMouseLeave={() => setShowDetail(false)} style={{ color: Boolean(variableInUse.length) ? "#0d99ff" : "initial" }} disabled={disabled || readOnly} onBlur={() => handleUpdate({ key: param, value, index })} filter variant="underline" placeholder="value/variable..." value={value} onInput={(e) => setValue(e.currentTarget.value)} options={variables} />
            </div>
            : 
            <TextboxAutocomplete onMouseOver={() => setShowDetail(true)} onMouseLeave={() => setShowDetail(false)} style={{ color: Boolean(variableInUse.length) ? "#0d99ff" : "initial" }} disabled={disabled || readOnly} onBlur={() => handleUpdate({ key: param, value, index })} filter variant="underline" placeholder="value/variable..." value={value} onInput={(e) => setValue(e.currentTarget.value)} options={variables} />
            }
           
        
        </div>
        {(!readOnly && !disabled) &&
            <Menu danger marginLeft={"-28px"} onClick={() => handleDelete({ key: behavior.key, value: behavior.value, index })} options={["delete?"]} trigger={<IconButton><IconEllipsis32 /></IconButton>} />
        }
    </div>)
}

const BehaviorRows = (props: { db: any, disabled: boolean, readOnly: boolean, updateBehavior: (any) => any, deleteBehavior: (any) => any, isNew, behaviors }) => {
    const { db, updateBehavior, deleteBehavior, isNew, behaviors, disabled, readOnly } = props;
    const [newBehaviorRow, setNewBehaviorRow] = useState(false);
    const handleNewBehaviorRow = (v: boolean) => setNewBehaviorRow(!newBehaviorRow);

    return (
        <div style={{ width: "100%", paddingRight: "5px" }}>
            {(!disabled && !readOnly) && <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <PlusMinusToggle value={!newBehaviorRow} onClick={handleNewBehaviorRow} />
            </div>}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px" }}>
                {(!behaviors.length && (disabled || readOnly)) && <div style={{ marginLeft: "10px" }}>No behaviors are set for this element.</div>}
                {newBehaviorRow && <BehaviorRow index={null} db={db} handleUpdate={updateBehavior} disabled={disabled} readOnly={readOnly} />}
                {behaviors.map((b: any, i: number) => <BehaviorRow key={`behavior-row-${i}`} index={i} handleDelete={deleteBehavior} db={db} behavior={b} handleUpdate={updateBehavior} disabled={disabled} readOnly={readOnly} />)}
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


const SuggestBehavior = (props: { handleCancel: (any) => any, handleSubmit: (any) => any }) => {
    const [select, setSelect] = useState(null);
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", paddingBottom: "10px" }}>
    <Select onChange={(e:any)=>setSelect(e.target.value)} style={{ width: "100px" }} id="behavior-element-type-select" defaultValue={null} placeholder="Choose type" options={elementCategory} />
    <Button disabled={select === null} onClick={()=>props.handleSubmit(select)} style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}>submit</Button>
    <Button onClick={props.handleCancel} secondary style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}>cancel</Button>
</div>
    )
}

export const Behaviors = (props: { db: any, selectionData: any, currentViewValue: string, disabled: boolean, readOnly: boolean }) => {
    const { db, selectionData, currentViewValue, disabled, readOnly } = props;
    const currentViewData = currentViewValue || "default";
    const conditionId = selectionData.condition.length ? selectionData.condition.filter((c: any) => c.label === currentViewData)[0].id : "default";
    const isNew = selectionData.behavior.filter((n: any) => n.id === conditionId).length === 0;
    const behaviors = selectionData.behavior.filter((n: any) => n.id === conditionId)[0]?.value || [];

    const [selectBehaviorView, setSelectBehaviorView] = useState(false);
    const [displayRows, setDisplayRows] = useState(Boolean(behaviors.length)); // TODO determine value based on if param is populated

    const handleCreateClick = (v: boolean) => {
        if (v) setSelectBehaviorView(v);
        else setDisplayRows(true);
    };

    const handleUpdateBehavior = async (e: any) => {
        const newRecord = {key: e.key, value: e.value};
        let payload = [];
        if (isNew) payload = [{ id: conditionId, value: [newRecord] }];
        else if (e.index === null) payload = [{ id: conditionId, value: [newRecord, ...selectionData.behavior.filter((n: any) => n.id === conditionId)[0].value] }];
        else {
            let currentBehaviors = selectionData.behavior.filter((n: any) => n.id === conditionId)[0].value;
            currentBehaviors.splice(e.index, 1, newRecord);
            payload = [{ id: conditionId, value: currentBehaviors }, ...selectionData.behavior.filter((n: any) => n.id !== conditionId)];
        }

        await controller({ func: "write", data: { model: "selection", key: "behavior", value: payload } })
    }

    const handleDeleteBehavior = async (props: { key: string, value: string, index: number }) => {
        let currentBehaviors = selectionData.behavior.filter((n: any) => n.id === conditionId)[0].value;
        currentBehaviors.splice(props.index, 1);
        const payload = [{ id: conditionId, value: currentBehaviors }, ...selectionData.behavior.filter((n: any) => n.id !== conditionId)];

        await controller({ func: "write", data: { model: "selection", key: "behavior", value: payload } })
    }

    const createBehaviorTemplate = async (elementType: string) => {
        const params = commonBehaviors.filter((b: any) => b.element === elementType)[0];
        const { attributes, eventHandlers } = params;
        let templateValues = eventHandlers? eventHandlers.map((e: any) => ({ key: e, value: "" })) : [];
        const payload = [{id: conditionId, value: [...templateValues, ...attributes.map((a: any) => ({ key: a, value: "" }))]}]
        await controller({ func: "write", data: { model: "selection", key: "behavior", value: payload } });
    }

    const view = (displayRows || disabled || readOnly) ? <BehaviorRows deleteBehavior={handleDeleteBehavior} db={db} updateBehavior={handleUpdateBehavior} isNew={isNew} behaviors={behaviors} disabled={disabled} readOnly={readOnly} /> :
        selectBehaviorView ? <SuggestBehavior handleSubmit={createBehaviorTemplate} handleCancel={() => setSelectBehaviorView(false)} /> :
            <CreateBehaviors handleClick={handleCreateClick} />


    return <div key={`inspector-behavior}`} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px" }}>
        {view}
    </div>
}