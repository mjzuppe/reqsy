import React, { useState } from "react";
import { SearchTextbox, IconToggleButton, IconPlus32, IconMinus32, IconLayerComponent16, IconLayerFrame16, IconEllipsis32, IconButton } from "figma-ui-kit";
import { Menu } from "../util/ui/menu";
import { TagIcon16 } from "../util/ui/svg";
import { controller } from "../functions/utils";

export const Library = (props: { db: any, readOnly: boolean }) => {
    const { db, readOnly } = props;
    const [expanded, setExpanded] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearch = (e) => setSearch(e.target.value);
    const clickHandlerAdd = (i) => setExpanded([...expanded, i]);
    const clickHandlerRemove = (i) => setExpanded(expanded.filter((e) => e !== i));
    const library = db?.library || {};
    const libraryKeys = Object.keys(library).filter((key: any) => library[key].active);
    const libraryFiltered = search ? libraryKeys.filter((key: string) => library[key].label.toLowerCase().includes(search.toLowerCase())) : libraryKeys;
    const tagLabel = (id: any) => {
        return db.tag[id] ? db.tag[id].label : "null";
    }
    const handleSelect = (e) => {
        const key = e.target.id.split("library-item-key-")[1];
        controller({ func: 'get', data: { key } });
    }

    const handleDelete = async (i) => {
        await controller({ func: 'delete', data: { model: 'library', key: libraryKeys[i] } });
    }

    return (
        <div id="action-container">
            <div className="action-container-content">
                <p><strong>Library.</strong> Manage registered elements.</p>
            </div>
            <div className="action-container-search">
                <SearchTextbox onInput={handleSearch} value={search} clearOnEscapeKeyDown placeholder="search elements" />
            </div>
            <div className="action-container-subcontainer">
                <div className="items-list">
                    {
                        libraryFiltered.map((key: any, i: number) => {
                            const { label, tag, location, type } = library[key];
                            return (
                                <div key={`library-item-${key}`} className="items-list-item items-border-bottom">
                                    <div className="items-list-item-alwaysdisplay">
                                        <div id={`library-item-key-${key}`} onClick={handleSelect} className="library-label">{label}</div>
                                        {
                                            !expanded.includes(i) ?
                                                <div>
                                                    <IconToggleButton onClick={() => clickHandlerAdd(i)} value={null}>
                                                        <IconPlus32 />
                                                    </IconToggleButton>
                                                </div>
                                                :
                                                <div>
                                                    <IconToggleButton onClick={() => clickHandlerRemove(i)} value={null}>
                                                        <IconMinus32 />
                                                    </IconToggleButton>
                                                </div>
                                        }
                                    </div>
                                    <div className={`items-list-item-expanded ${expanded.includes(i) ? "" : "hide"}`} >
                                        <div style={{ alignItems: "center", width: "100%", display: "flex", justifyContent: "space-between" }}>
                                            <div className="flex-center" title="source component" style={{ padding: "0 10px 0 10px" }}><IconLayerComponent16 /><p>{type || "null"}</p></div>
                                            <div className="flex-center" title="frame location" style={{ padding: "0 10px 0 10px" }}><IconLayerFrame16 /><p>{location || "null"}</p></div>
                                            {Boolean(!readOnly) && <div style={{marginRight: "5px"}}><Menu marginLeft={"-20px"} onClick={()=>handleDelete(i)} options={["delete"]} trigger={<IconButton><IconEllipsis32 /></IconButton>} /></div>}
                                        </div>
                                        {Boolean(tag.length) && <div title="associated tags" style={{ width: "100%", padding: "0 10px 0 10px" }}><div className="flex-center"> <TagIcon16 />{tag.map((t:string, i: number) => <p key={t} style={{ padding: "4px", backgroundColor: "#606060",marginLeft: i === 0? "2px" : "10px", borderRadius: "2px" }}>{tagLabel(t)}</p>)}</div>  </div>}
                                    </div>
                                </div>
                            )

                        })}
                </div>

            </div>
        </div>
    )
}