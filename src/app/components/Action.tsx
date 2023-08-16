import React from 'react';
import { Inspector } from './Inspector';
import { Meta } from './Meta';
import { Library } from './Library';
import { Settings } from './Settings';

export const Action = (props: {currentView: string, data: any}) => {
    const {currentView} = props;
    const view:any = {"inspector": <Inspector />, "meta": <Meta />, "library": <Library/>, "settings": <Settings/> }[currentView || "inspector"];

    return (
        <div id="action-container">
            {view}
        </div>
    )
}