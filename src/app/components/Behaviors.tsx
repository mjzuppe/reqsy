import React from "react";
import {  Textbox, SegmentedControlOption, Dropdown } from "figma-ui-kit";

export const Behaviors = () => {
    const HTMLoptions: Array<SegmentedControlOption> = [
        { value: "show all" },
        { value: "div" },
        { value: "input" },
        { value: "select" },
        { value: "form" },
        { value: "button" },
        { value: "body" },
        { value: "a" },
        { value: "h1" },
        { value: "h2" },
        { value: "h3" },
        { value: "h4" },
        { value: "ul" },
        { value: "li" },
        { value: "p" },
        { value: "code" },
        { value: "span" },
        { value: "time" },
        { value: "area" },
        { value: "canvas" },
        { value: "audio" },
        { value: "img" },
        { value: "map" },
        { value: "video" },
        { value: "embed" },
        { value: "iframe" },
        { value: "object" },
        { value: "svg" },
        { value: "table" },
        { value: "label" },
        { value: "option" },
        { value: "textarea" },
    ]


    const actionFields = [
        { label: "On Load" },
        { label: "On Hover" },
        { label: "On Focus" },
        { label: "On Blur" },
        { label: "On Click" },
        { label: "On Key Press" },
    ]

    const contentFields = [
        { label: "Label Text" },
        { label: "Alt Text" },
        { label: "Title Text" },
        { label: "Placeholder Text" },
        { label: "Error Msg" },
        { label: "Helper Msg" },
        { label: "Tooltip Msg" },
    ]

    const dataFields = [
        { label: "DB Value Ref" },
        { label: "Default Value" },
        { label: "Options" },
        { label: "Validation Rules" },
        { label: "Type" },
        { label: "Href" },
        { label: "New window" },
    ]

    return (

        <div style={{ width: "100%" }}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%"}}>
            <div style={{ width: "35%", marginLeft: "5px" }}>HTML Element</div>
                <div style={{marginLeft: "5px"}}><Dropdown options={HTMLoptions} value={"show all"} onClick={()=>{}}/></div>
            </div>
            <div className="items-border-bottom">
                {dataFields.map((field, i) =>
                    <div key={`ref-items${i}`} className="items-list-item ">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }} className="items-list-item">
                            <div style={{ marginLeft: "5px", display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
                                <div style={{ width: "35%" }}>{field.label}</div>
                                <Textbox placeholder="enter value" value={null} />
                            </div>


                        </div>
                    </div>
                )}
            </div>

            <div className="items-border-bottom">

                {actionFields.map((field, i) =>
                    <div key={`ref-items${i}`} className="items-list-item ">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }} className="items-list-item">
                            <div style={{ marginLeft: "5px", display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
                                <div style={{ width: "35%" }}>{field.label}</div>
                                <Textbox placeholder="enter value" value={null} />
                            </div>


                        </div>
                    </div>
                )}
            </div>

            {contentFields.map((field, i) =>
                <div key={`ref-items${i}`} className="items-list-item ">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }} className="items-list-item">
                        <div style={{ marginLeft: "5px", display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
                            <div style={{ width: "35%" }}>{field.label}</div>
                            <Textbox placeholder="enter value" value={null} />
                        </div>


                    </div>
                </div>
            )}
        </div>

    )
}