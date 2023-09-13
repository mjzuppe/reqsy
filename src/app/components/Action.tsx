import React from 'react';
import { Inspector } from './Inspector';
import { Meta } from './Meta';
import { Library } from './Library';
import { Settings } from './Settings';

export const Action = (props: {currentView: string, db: any, selectionData: any}) => {
    const {db, selectionData} = props;
    const {currentView} = props;
    const view:any = {"inspector": <Inspector selectionData={selectionData} />, "meta": <Meta data={db} />, "library": <Library/>, "settings": <Settings/> }[currentView || "inspector"];

    return (
        <div id="action-container">
            {db ? view : "Loading..."}
        </div>
    )
}