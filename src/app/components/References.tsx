import React from "react";
import {  IconButton, IconEllipsis32, Dropdown, Textbox } from "figma-ui-kit";
import { LeftMenu } from "../util/ui/left-menu";

export const References = () => {
    const tags = ["", "", ""];

    const options = [
        {value: "none"},
        {value: "github issue"},
        {value: "gitlab issue"},
        {value: "jira ticket"},
        {value: "linear issue"},
        {value: "URL"},
    ];
    return (

      
            <div style={{width: "100%"}}>
                {tags.map((tag, i) =>
                    <div key={`ref-items${i}`} className="items-list-item items-border-bottom">
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} className="items-list-item">
                                <div style={{marginLeft: "5px", display: "flex", justifyContent: "flex-start"}}>
                                    <Dropdown options={options} onClick={()=>{}} value={"URL"}/>
                                    <Textbox placeholder="Enter URL" value={null} />
                                </div>
                                
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <LeftMenu marginLeft={"-9%"} onClick={(e)=> console.log("TARGET:", e)} options={["visit","delete"]} trigger={<IconButton><IconEllipsis32/></IconButton>}/>
                            </div>
                              
                        </div>
                    </div>
                )}
            </div>

    )
}