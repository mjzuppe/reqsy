import React, { useState } from "react";
import { SearchTextbox, Text, TextboxAutocomplete, IconToggleButton, IconPlus32, IconMinus32, IconLayerComponent16, IconLayerFrame16, IconEllipsis32, Dropdown, DropdownOption } from "figma-ui-kit";



export const Library = () => {
    const [expanded, setExpanded] = useState([]);
    const clickHandlerAdd = (i) => setExpanded([...expanded, i]);
    const clickHandlerRemove = (i) => setExpanded(expanded.filter((e) => e !== i));
    const options: Array<DropdownOption> = [{
        value: 'share'
      }, {
        value: 'delete'
      }];

    return (
        <div id="action-container">
            <div className="action-container-subnav">
                <SearchTextbox value={""} placeholder="search names" />
            </div>
            <div className="action-container-content">
                <Text>Library. Do more things like this.</Text>
            </div>
            <div className="action-container-subcontainer">
                <div className="items-list">
                    <div className="items-list-item">
                        <div className="items-list-item-alwaysdisplay">
                            <div className="label">name</div>

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
                        <div className={`items-list-item-expanded ${expanded.includes(1)? "":"hide"}`} >
               
                            <div style={{width: "30%"}}><IconLayerComponent16 /></div>
                            <div style={{width: "30%"}}>tags</div>
                            <div style={{width: "30%"}}><IconLayerFrame16/></div>
                            <div style={{width: "10%"}}>
                            <TextboxAutocomplete icon={<IconEllipsis32 />} onChange={()=>{}} options={options} value={null} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}