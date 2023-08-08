import React from 'react';
import { Nav } from './Nav';

export const Header = (props) => {
    return (
        <div id="header-container">
                <Nav setView={props.setView} />
        </div>
    )
}