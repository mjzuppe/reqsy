import React, { useState } from "react";
import { SearchTextbox, IconToggleButton, IconPlus32, IconMinus32, IconLayerComponent16, IconLayerFrame16, IconEllipsis32, IconButton } from "figma-ui-kit";
import { Menu } from "../util/ui/menu";
import { TagIcon16 } from "../util/ui/svg";
import { getNodeById } from "../functions/ui";
import { controller } from "../functions/utils";

export const Library = (props: { db: any }) => {
    const { db } = props;
    const [expanded, setExpanded] = useState([]);
    const clickHandlerAdd = (i) => setExpanded([...expanded, i]);
    const clickHandlerRemove = (i) => setExpanded(expanded.filter((e) => e !== i));
    const library = db?.library || {};
    const libraryKeys = Object.keys(library).filter((key:any)=> library[key].active) ;
    const handleSelect = (e) => {
        const key = e.target.id.split("library-item-key-")[1];
        controller({ func: 'get', data: { key } });
    }
    return (
        <div id="action-container">
            <div className="action-container-content">
                <p><strong>Library.</strong> Do more things like this.</p>
            </div>
            <div className="action-container-search">
                <SearchTextbox value={""} placeholder="search names" />
            </div>
            <div className="action-container-subcontainer">
                <div className="items-list">
                    {
                        libraryKeys.map((key:any) => {
                            const {label, tag, location, type} = library[key];
                            return(
                                <div key={`library-item-${key}`} className="items-list-item items-border-bottom">
                        <div className="items-list-item-alwaysdisplay">
                            <div id={`library-item-key-${key}`} onClick={handleSelect} className="label">{label}</div>
                            {
                                !expanded.includes(1) ?
                                    <div>
                                        <IconToggleButton onClick={() => clickHandlerAdd(1)} value={null}>
                                            <IconPlus32 />
                                        </IconToggleButton>
                                    </div>
                                    :
                                    <div>
                                        <IconToggleButton onClick={() => clickHandlerRemove(1)} value={null}>
                                            <IconMinus32 />
                                        </IconToggleButton>
                                    </div>
                            }
                        </div>
                        <div className={`items-list-item-expanded ${expanded.includes(1) ? "" : "hide"}`} >
                            <div style={{ alignItems: "center", width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <div className="flex-center" title="source component" style={{ padding: "0 10px 0 10px" }}><IconLayerComponent16 /><p>{type || "null"}</p></div>
                                <div className="flex-center" title="frame location" style={{ padding: "0 10px 0 10px" }}><IconLayerFrame16 /><p>{location || "null"}</p></div>
                                <Menu marginLeft={"-7%"} onClick={(e) => console.log("TARGET:", e)} options={["edit", "share", "delete"]} trigger={<IconButton><IconEllipsis32 /></IconButton>} />
                            </div>
                            <div title="associated tags" style={{ width: "100%", padding: "0 10px 0 10px" }}><div className="flex-center"> <TagIcon16 /><p style={{ paddingLeft: 2 }}>{String(tag)}</p></div>  </div>
                        </div>
                    </div>
                            )
                    
                        }
                </div>
            </div>
        </div>
    )
}