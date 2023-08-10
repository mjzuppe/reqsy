import React, { useState } from 'react';

export const LeftMenu = (props: any) => {
    const { options, trigger } = props;
    const [expanded, setExpanded] = useState(false);
    const expandHandler = () => setExpanded(!expanded);
    const clickHandler = (e) => {
        props.onClick(e.target.id);
        expandHandler();
    };

    return (

        <div className="left-menu-container">
            {expanded &&
                <div>
                    <div className="left-menu-listener" onClick={expandHandler} />
                    <div className="left-menu">
                        {options.map((option, i) =>
                            <div id={option} onClick={clickHandler} key={i} className="left-menu-option">
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