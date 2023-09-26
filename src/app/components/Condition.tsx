import React, { useState, useRef } from "react";
import { TextboxAutocomplete, TextboxAutocompleteOption, IconEllipsis32, IconButton, Button } from "figma-ui-kit";
import { LeftMenu } from "../util/ui/left-menu";
import { TextInput } from "../util/ui/text-input";
import { Select } from "../util/ui/select";
import { controller, generateReqsyId } from "../functions/utils";

export const Condition = (props: { db: any, selectionData: any, currentView: (e:any) => any }) => {
    const { selectionData, currentView } = props;
    const allConditions = selectionData.condition;
    const options: any = allConditions.map((c: { id: string, label: string }) => ({ value: c.id, label: c.label }));

    const [selectCondition, setSelectCondition] = useState(allConditions.length ? allConditions[0].value : "");
    const [textCondition, setTextCondition] = useState("");
    const [createConditionState, setCreateConditionState] = useState(false);
    const [editConditionState, setEditConditionState] = useState(false);

    const handleConditionChange = async (e: any) => {
        if (e.target.value.trim() === "") {
            setCreateConditionState(false);
            setEditConditionState(false);
            return;
        }
        const label = e.target.value.trim();

        let id = "default";
        if (editConditionState) id = selectCondition;
        else if (createConditionState) id = await generateReqsyId();
        let payload = allConditions;
        if (editConditionState) {
            payload = [{id, label}, ...allConditions.filter((c: any) => c.id !== id)];
        }
        else payload = [...allConditions, {id, label}];
        if (payload.length === 1) payload = [{id: "default", label: "default"}, ...payload];
        if (id !== selectCondition) setSelectCondition(id);
        await controller({ func: "write", data: { model: 'selection', key: 'condition', value: payload } })
        setCreateConditionState(false);
        setEditConditionState(false);
    }

    const handleButtonClick = () => {
        setCreateConditionState(true);
        setEditConditionState(false);
        setTimeout(() => {
            document.getElementById("condition-text-input").focus();
        }, 100);
    }

    const handleSelectChange = async (e: any) => {
        setSelectCondition(e.target.value);
        currentView(e.target.options[e.target.selectedIndex].text || "default" );
    }

    const handleMenu = (func:string) => {
        switch(func){
            case "create":
                setCreateConditionState(true);
                setEditConditionState(false);
                setTimeout(() => {
                    document.getElementById("condition-text-input").focus();
                }, 100);
                break;
            case "edit":
                setCreateConditionState(false);
                setEditConditionState(true);
                setTextCondition(allConditions.filter((c: any) => c.id === selectCondition)[0].label);
                setTimeout(() => {
                    document.getElementById("condition-text-input").focus();
                }, 100);
                break;
            case "delete":
                // TODO Handle delete of condition and assocaited data
                break;
        }
    }

    const view = (createConditionState || editConditionState) ?
        <TextInput defaultValue={textCondition} invalidlist={allConditions.map((c: any) => c.label)} id={"condition-text-input"} placeholder="Enter a condition" onblur={handleConditionChange} />
        :
        !allConditions.length ? <Button onClick={handleButtonClick} style={{ marginLeft: "5px", fontSize: "10px", height: "20px", lineHeight: "10px" }}>Create...</Button>
            :
            <Select id="condition-selection" defaultValue={selectCondition} options={options} onChange={handleSelectChange} />


    return (

        <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "10px" }}>
            {view}
            {allConditions.length && <LeftMenu marginLeft={"-20px"} onClick={handleMenu} options={["create", "edit", "delete"]} trigger={<IconButton><IconEllipsis32 /></IconButton>} />}
           
        </div>


    )
}