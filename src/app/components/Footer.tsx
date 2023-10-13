import React from 'react';
import { Text, Button } from 'figma-ui-kit';

export const Footer = () => {
    return (
        <div id="footer-container">
            <Text>Account Status: <strong>Free</strong></Text>{" "}<Button style={{height: "16px", font: ".5em", lineHeight: "12px"}} secondary>Upgrade</Button>
        </div>
    )
}