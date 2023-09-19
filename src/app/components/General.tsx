import React, { useState } from "react";
import { TextboxAutocompleteOption, IconLayerText16 } from "figma-ui-kit";
import Select from 'react-select';
import { TextInput } from "../util/ui/text-input";
import { TagIcon16 } from "../util/ui/svg";
// data
import { controller } from "../functions/utils";


export const General = (props: { selectionData: any, db: any }) => {
    const { selectionData, db } = props;
    const tagsObject = db.tag || {};
    const options: Array<TextboxAutocompleteOption> = Object.keys(tagsObject).map((key: string) => ({ value: key, label: tagsObject[key].label }))
    const [tag, setTag] = useState([]);

    const { label } = selectionData;

    const handleLabelChange = async (e: any) => {

        if (e.target.value.trim() === "") return // TODO handle 
        await controller({ func: "write", data: { model: "selection", key:'label', value: e.target.value } }) // TODO RIGHT HERE -- requires syncData to store in db
    }

    const handleAddTagChange = (e: any) => {
        const currentTags = e.map((o: any) => o.value)
        setTag(currentTags);
    };

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <div style={{ marginLeft: "3px", marginRight: "1px" }}>
                    <IconLayerText16 />
                </div>
                <TextInput onblur={handleLabelChange} defaultValue={label || ""} placeholder="enter a label" />
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginLeft: "5px", width: "100%" }}>
                <div style={{ marginTop: "10px" }}><TagIcon16 /></div>
                <Select unstyled
                    isDisabled={tag.length > 2}
                    placeholder="select tags"
                    styles={{
                        clearIndicator(base, props) { return { ...base, display: "none" }; },
                        dropdownIndicator(base, props) { return { ...base, display: "none" }; },
                        container: (provided, state) => ({ width: "100%", marginLeft: "5px" }),
                        multiValue: (provided, state) => ({ backgroundColor: "#606060", display: "flex", flexDirection: "row", padding: "2px 5px 2px 5px", borderRadius: "2px", margin: "0 10px 0 0" }),
                        menu: (provided, state) => ({ backgroundColor: "#000000", margin: "0 2px 0 2px", width: "50%" }),
                        option: (provided, state) => ({ ":hover": { backgroundColor: "#0d99ff" }, fontSize: "1em", padding: "5px" }),
                    }} isMulti onChange={handleAddTagChange} options={options} />
            </div>
        </div>
    )
}