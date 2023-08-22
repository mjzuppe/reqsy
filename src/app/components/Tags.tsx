import React, {useState} from "react";
// components
import { IconPlus32, IconToggleButton, IconButton, IconEllipsis32, IconMinus32, Textbox } from "figma-ui-kit";
import { LeftMenu } from "../util/ui/left-menu";
import { TextInput } from "../util/ui/text-input";
// data
import { controller, generateReqsyId } from "../functions/utils";


export const Tags = (props) => {
    const {data} = props;
    const tagsObject = data.tag;
    const tagsKeys = Object.keys(tagsObject).reverse(); 
    const [newTagOpen, setNewTagOpen] = useState(false);
    // TODO handle delete
    // TODO handle rename
    const dropNewTag = () => {
        setNewTagOpen(false);
    };

    const clickHandlerAdd = async (i) => {
        await setNewTagOpen(true);
        document.getElementById(`tags-items-new-tag`).focus();
    }
    const clickHandlerSubmitNew = async (e) => {
        if (e.target.value.trim() === "") return setNewTagOpen(false);
        const parseKey = async () => {
            if (e.target.id === 'tags-items-new-tag') return await generateReqsyId();
            else return e.target.id;
        } 
        const key = await parseKey();
        await controller({func: "write", data: {model: "tag", key, value: {label: e.target.value.trim()}}}) 
        await setNewTagOpen(false);
    };

    const clickHandlerDelete = async (e) => {

    }
    const invalidTags = (current: string) => Object.values(tagsObject).map((tagData:any)=> tagData.label).filter((tagLabel:string) => tagLabel !== current);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <IconToggleButton onClick={() => clickHandlerAdd(1)} value={null}>
                    <IconPlus32 />
                </IconToggleButton>
            </div>
            <div className="items-list">
                {newTagOpen &&
                    <div  key={`tags-items-new-tag`} style={{padding: "5px 0 5px"}} className="items-list-item items-border-bottom">
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} className="items-list-item">
                            {/* <div style={{marginLeft: "10px"}}><Textbox maxLength onChange={handleNewTagLabel} placeholder={"enter tag..."} value={newTagLabel} /></div> */}
                             <div style={{marginLeft: "10px"}}>
                                <TextInput invalidlist={invalidTags("")} id="tags-items-new-tag" placeholder="enter tag..." maxLength={16} onblur={clickHandlerSubmitNew} />
                             </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton onClick={dropNewTag}><IconMinus32/></IconButton>
                        </div>
                          
                    </div>
                </div>
                }
                {tagsKeys.map((tag, i) =>
                    <div key={`tags-items-${tag}`} style={{padding: "5px 0 5px"}} className="items-list-item items-border-bottom">
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} className="items-list-item">
                        <TextInput dblclick invalidlist={invalidTags(tagsObject[tag].label)} placeholder="enter tag..." style={{marginLeft: "10px"}} maxLength={16} onblur={clickHandlerSubmitNew} defaultValue={tagsObject[tag].label} id={tag}  />
                                {/* <div style={{marginLeft: "10px"}}>{tagsObject[tag].label}</div> */}
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <LeftMenu danger marginLeft={"-9%"} onClick={clickHandlerDelete} options={["delete?"]} trigger={<IconButton><IconMinus32/></IconButton>}/>
                            </div>
                              
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}