import React, {useState} from "react";
import { TextboxAutocomplete, TextboxAutocompleteOption, Textbox, Dropdown} from "figma-ui-kit";
import Select from 'react-select';
import { TextInput } from "../util/ui/text-input";
// data
import { controller } from "../functions/utils";
import { TagIcon16 } from "../util/ui/svg";

export const General = (props: {selectionData: any, db: any}) => {
    const {selectionData, db} = props;
    const tagsObject = db.tag || {};
    const options: Array<TextboxAutocompleteOption> = Object.keys(tagsObject).map((key: string) => ({value: key, label: tagsObject[key].label}))
    const [tag, setTag] = useState([]);

    const {label} = selectionData;

    const handleLabelChange = (e: any) => {
        console.log("handleLabelChange", e);
    }

    const handleAddTagChange = (e: any) => {
        setTag(e.map((o: any) => o.value));
    };

    return (
            <div style={{  width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "10px"}}>
            <TextInput onblur={handleLabelChange} defaultValue={label || ""} placeholder="enter a label" />
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "5px"}}>
                <TagIcon16 />
                <Select unstyled 
            isDisabled={tag.length > 2}
            styles={{
                clearIndicator(base, props) { return { ...base, display: "none" }; },
                dropdownIndicator(base, props) { return { ...base, display: "none" }; },
                container: (provided, state) => ({width: "100%", marginLeft: "5px"}),
                multiValue: (provided, state) => ({backgroundColor: "#606060", display: "flex", flexDirection: "row", padding: "2px 5px 2px 5px", borderRadius: "2px", margin: "0 10px 0 0"}),
                menu: (provided, state) => ({backgroundColor: "#000000", margin: "0 5px 0 5px"}),
                option: (provided, state) => ({":hover": {backgroundColor: "#0d99ff"}, fontSize: "1em", padding: "5px"}),
            }} isMulti onChange={handleAddTagChange} options={options} />
            </div>
            
            {/* <Dropdown placeholder="select/enter tag" onChange={handleAddTagChange} options={options} value={tag} /> */}
            <div>{}</div>
            </div>
    )
}