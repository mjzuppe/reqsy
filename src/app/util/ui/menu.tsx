import React, { useState } from 'react';

export const Menu = (props: any) => {
    const { options, trigger, marginLeft, marginTop, danger } = props;
    const [expanded, setExpanded] = useState(false);
    const expandHandler = () => setExpanded(!expanded);
    const clickHandler = (e) => {
        props.onClick(e.target.id);
        expandHandler();
    };

    return (

        <div className="menu-container">
            {expanded &&
                <div>
                    <div className="menu-listener" onClick={expandHandler} />
                    <div style={{ marginLeft, marginTop: marginTop || "" }} className="menu">
                        {options.map((option, i) =>
                            <div id={option} onClick={clickHandler} key={i} className={`menu-option${danger ? "-warning" : ""}`}>
                                {option}
                            </div>
                        )
                        }
                    </div>
                </div>
            }
            <div onClick={expandHandler}>
                {trigger}
            </div>
        </div>
    )
}