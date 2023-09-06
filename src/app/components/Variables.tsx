import React, { useState } from "react";
import { IconPlus32, Dropdown, IconToggleButton, IconButton, IconEllipsis32, IconMinus32, Textbox } from "figma-ui-kit";
// import { TagIcon16 } from "../util/ui/svg";
import { LeftMenu } from "../util/ui/left-menu";
import { PlusMinusToggle } from "../util/ui/plusminus";
import { TextInput } from "../util/ui/text-input";

export const Variables = () => {
    const clickHandlerAdd = (i) => setExpanded([...expanded, i]);
    const clickHandlerRemove = (i) => setExpanded(expanded.filter((e) => e !== i));

    const [newVariableOpen, setNewVariableOpen] = useState(false);
    const [expanded, setExpanded] = useState([]);
    const handleExpand = (i: number) => {
        if (expanded.includes(i)) setExpanded(expanded.filter((e) => e !== i));
        else setExpanded([...expanded, i]);
    };
    const typeOptions = [{ value: "string" }, { value: "number" }, { value: "boolean" }, { value: "object" }, { value: "array" }];

    const tempValues = [{ id: "000", label: "user.displayName", type: "string", memo: "" }, { id: "001", label: "user.mobile", type: "number", memo: "" }]
    const invalidVariables = (current: string) => Object.values(tempValues).map((variData: any) => variData.label).filter((variLabel: string) => variLabel !== current);

    const clickHandlerNewOrUpdate = async (e) => {
        // if (e.target.value.trim() === "") return setNewTagOpen(false);
        // const parseKey = async () => {
        //     if (e.target.id === 'tags-items-new-tag') return await generateReqsyId();
        //     else return e.target.id;
        // }
        // const key = await parseKey();
        // await controller({ func: "write", data: { model: "tag", key, value: { label: e.target.value.trim() } } })
        // await setNewTagOpen(false);
    };


    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <IconToggleButton onClick={() => clickHandlerAdd(1)} value={null}>
                    <IconPlus32 />
                </IconToggleButton>
            </div>
            <div className="items-list">
                {tempValues.map((variable, i) =>
                    <div key={`variables-items-${variable.id}`} style={{ padding: "5px 0 5px" }} className="items-list-item items-border-bottom">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} className="items-list-item">
                            <TextInput dblclick invalidlist={invalidVariables(tempValues[i].label)} placeholder="enter label..." style={{ marginLeft: "10px" }} maxLength={16} onblur={clickHandlerNewOrUpdate} defaultValue={tempValues[i].label} id={variable.id} />
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <PlusMinusToggle onClick={() => handleExpand(i)} />
                            </div>
                        </div>
                        <div className={`items-list-item-expanded ${expanded.includes(i) ? "" : "hide"}`} style={{ padding: "5px 0 5px" }}  >
                            <div style={{ paddingLeft: "7px", alignItems: "center", width: "100%", display: "flex", justifyContent: "space-between"}}>
                                <div className="flex-center" title="source component">
                                    <Dropdown placeholder="type" style={{  width: "80px" }} onChange={() => { }} options={typeOptions} value={'boolean'} />
                                </div>
                                <div>
                                    <TextInput invalidlist={[]} placeholder="validation/notes" style={{ marginLeft: "2px", width: "160px" }} maxLength={32} onblur={clickHandlerNewOrUpdate} defaultValue={""} id={variable.id} />
                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <LeftMenu danger marginLeft={"-28px"} onClick={(e: any) => {}} options={["delete?"]} trigger={<IconButton><IconEllipsis32 /></IconButton>} />
                            </div>
                            </div>

                        </div>

                    </div>
                )}
            </div>
        </>
    )
}