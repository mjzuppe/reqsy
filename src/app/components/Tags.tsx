import React, { useState } from "react";
// components
import { IconPlus32, IconToggleButton, IconButton, IconMinus32, } from "figma-ui-kit";
import { LeftMenu } from "../util/ui/left-menu";
import { TextInput } from "../util/ui/text-input";
// data
import { controller, generateReqsyId } from "../functions/utils";
import { PlusMinusToggle } from "../util/ui/plusminus";


export const Tags = (props) => {
    const { data, search } = props;
    const tagsObject = data.tag;
    const tagsKeys = Object.keys(tagsObject).reverse();
    const tagsFiltered = search ? tagsKeys.filter((key: string) => tagsObject[key].label.toLowerCase().includes(search.toLowerCase())) : tagsKeys;

    const [newTagOpen, setNewTagOpen] = useState(false)
    const dropNewTag = () => {
        setNewTagOpen(false);
    };

    const clickHandlerAdd = async () => {
        await setNewTagOpen(true);
        document.getElementById(`tags-items-new-tag`).focus();
    }
    const clickHandlerNewOrUpdate = async (e:any) => {
        if (e.target.value.trim() === "" && newTagOpen) return setNewTagOpen(false);
        const parseKey = async () => {
            if (e.target.id === 'tags-items-new-tag') return await generateReqsyId();
            else return e.target.id;
        }
        const key = await parseKey();
        await controller({ func: "write", data: { model: "tag", key, value: { label: e.target.value.trim() } } })
        await setNewTagOpen(false);
    };

    const clickHandlerDelete = async (tag: string) => {
        await controller({ func: "delete", data: { model: "tag", key: tag } });
    }

    const invalidTags = (current: string) => Object.values(tagsObject).map((tagData: any) => tagData.label).filter((tagLabel: string) => tagLabel !== current);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <PlusMinusToggle value={!newTagOpen} onClick={clickHandlerAdd} />
            </div>
            <div className="items-list">
                {newTagOpen &&
                    <div key={`tags-items-new-tag`} style={{ padding: "5px 0 5px" }} className="items-list-item items-border-bottom">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} className="items-list-item">
                            <div style={{ marginLeft: "10px" }}>
                                <TextInput invalidlist={invalidTags("")} id="tags-items-new-tag" placeholder="enter tag..." maxLength={16} onblur={clickHandlerNewOrUpdate} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <IconButton onClick={dropNewTag}><IconMinus32 /></IconButton>
                            </div>

                        </div>
                    </div>
                }
                {tagsFiltered.map((tag, i) =>
                    <div key={`tags-items-${tag}`} style={{ padding: "5px 0 5px" }} className="items-list-item items-border-bottom">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} className="items-list-item">
                            <TextInput dblclick invalidlist={invalidTags(tagsObject[tag].label)} placeholder="enter tag..." style={{ marginLeft: "10px" }} maxLength={16} onblur={clickHandlerNewOrUpdate} defaultValue={tagsObject[tag].label} id={tag} />
                            {/* <div style={{marginLeft: "10px"}}>{tagsObject[tag].label}</div> */}
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <LeftMenu danger marginLeft={"-28px"} onClick={(e: any) => clickHandlerDelete(tag)} options={["delete?"]} trigger={<IconButton><IconMinus32 /></IconButton>} />
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </>
    )
}