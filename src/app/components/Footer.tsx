import React from 'react';
import { Text, Button } from 'figma-ui-kit';

const daysRemaining = (futureDate_ts: string) => {
    const endDate = new Date(futureDate_ts);
    const startDate = new Date();
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
}

export const Footer = (props: { db: any, user: any }) => {
    const { user } = props;
    const view = () => {
        console.log("USER", user)
        switch (!user ? undefined : user.status || null) {
            case undefined:
                return <></>
            case null:
                return <> <Text><strong>Can't reach server.</strong> Check connection and try again.</Text></>
            case "pro":
                return <> <Text>Account: <strong>Pro</strong></Text></>
            case "trial":
                return <> <Text>Account: <strong>Trial ({String(daysRemaining(user.trial_end))} days left)</strong></Text>{" "}<Button style={{ height: "16px", font: ".5em", lineHeight: "12px" }} secondary>Upgrade</Button> </>
            case "pro-expired":
                return <> <Text>Account: <strong>Pro Expired (view only)</strong></Text>{" "}<a target='_blank' href={process.env.CHECKOUT_URI}><Button style={{ height: "16px", font: ".5em", lineHeight: "12px" }} secondary>Upgrade</Button></a> </>
            case "trial-expired":
                return <> <Text>Account: <strong>Trial Expired (view only)</strong></Text>{" "}<a target='_blank' href={process.env.CHECKOUT_URI}><Button style={{ height: "16px", font: ".5em", lineHeight: "12px" }} secondary>Upgrade</Button></a> </>
        }
    }
    return (
        <div id="footer-container">
           {view()}
        </div>
    )
}