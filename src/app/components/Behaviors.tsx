import React, { useState } from "react";
import { Textbox, SegmentedControlOption, Dropdown, IconCode16, IconButton, IconEllipsis32, TextboxAutocomplete, Button } from "figma-ui-kit";
import { Select } from "../util/ui/select";
import { CommonUI, EventHandlers, AdditionalEvents, HTMLElements } from "../util/ui/behaviors";
import { PlusMinusToggle } from "../util/ui/plusminus";
import { LeftMenu } from "../util/ui/left-menu";

const elementCategory = [...CommonUI, ...HTMLElements].map((e: any) => ({ label: e.category, value: e.category })).sort((a, b) => a.label.localeCompare(b.label));
const allParametersSet = new Set();
[...CommonUI, ...HTMLElements, ...AdditionalEvents].forEach((e: any) => e.parameters.forEach((p: any) => allParametersSet.add(p)));
EventHandlers.forEach((e: any) => allParametersSet.add(e));
const allParametersOptions = Array.from(allParametersSet).map((p: any) => ({ value: p, label: p })).sort((a, b) => a.label.localeCompare(b.label));

const BehaviorRow = () => {
    const [param, setParam] = useState("");
    const [value, setValue] = useState("");
    const clickHandlerDelete = () => { }; // TODO complete
    return (<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <TextboxAutocomplete filter variant="underline" placeholder="Enter parameter" value={param} onInput={(e) => setParam(e.currentTarget.value)} options={allParametersOptions} />
        <Textbox placeholder="Enter value" variant="underline" value={value} onInput={(e) => setValue(e.currentTarget.value)} />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <LeftMenu danger marginLeft={"-28px"} onClick={() => clickHandlerDelete} options={["delete?"]} trigger={<IconButton><IconEllipsis32 /></IconButton>} />
                            </div>
    </div>)
}

const BehaviorRows = () => {
    const [newBehaviorRow, setNewBehaviorRow] = useState(false);
    const handleNewBehaviorRow = (v: boolean) => setNewBehaviorRow(!newBehaviorRow);
    return (
        <div style={{width: "100%"}}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <PlusMinusToggle value={!newBehaviorRow} onClick={handleNewBehaviorRow} />
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px" }}>
                {newBehaviorRow && <BehaviorRow />}
                <BehaviorRow />
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

export const Behaviors = () => {

    const [selectBehaviorView, setSelectBehaviorView] = useState(false);
    const [displayRows, setDisplayRows] = useState(false); // TODO determine value based on if param is populated

    const handleCreateClick = (v: boolean) => {
        if (v) setSelectBehaviorView(v);
        else setDisplayRows(true);
    };
    const view = displayRows ? <BehaviorRows /> :
        selectBehaviorView ? <SuggestBehavior handleCancel={() => setSelectBehaviorView(false)} /> :
            <CreateBehaviors handleClick={handleCreateClick} />


    return <div key={`inspector-behavior}`} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "10px" }}>
        {view}
    </div>
}