import React from "react";
import { IconPlus32, IconToggleButton, IconButton, IconEllipsis32 } from "figma-ui-kit";
import { LeftMenu } from "../util/ui/left-menu";

export const Issues = () => {
    const tags = ["x2932", "x3325", "x2342", "x2342"];
    const clickHandlerAdd = (i) => console.log("add", i);
    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <IconToggleButton onClick={() => clickHandlerAdd(1)} value={null}>
                    <IconPlus32 />
                </IconToggleButton>
            </div>
            <div className="items-list">
                {tags.map((tag, i) =>
                    <div key={`tags-items-${i}`} style={{padding: "5px 0 5px"}} className="items-list-item items-border-bottom">
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} className="items-list-item">
                                <div style={{marginLeft: "10px"}}>{tag}</div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <LeftMenu marginLeft={"-9%"} onClick={(e)=> console.log("TARGET:", e)} options={["rename","delete"]} trigger={<IconButton><IconEllipsis32/></IconButton>}/>
                            </div>
                              
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}