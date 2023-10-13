import React from 'react';
import { Nav } from './Nav';

export const Header = (props) => {
    return (
        <div id="header-container">
                <Nav currentView={props.currentView} setView={props.setView} />
        </div>
    )
}