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
    const { db, user } = props;
    const me = db?.user?.[user?.id];
    console.log(me);
    const view = () => {
        switch (me?.status || "trial-expired") {
            case "pro":
                return <> <Text>Account: <strong>Pro</strong></Text></>
            case "trial":
                return <> <Text>Account: <strong>Trial ({String(daysRemaining(me.trial_end))} days left)</strong></Text>{" "}<Button style={{ height: "16px", font: ".5em", lineHeight: "12px" }} secondary>Upgrade</Button> </>
            case "pro-expired":
                return <> <Text>Account: <strong>Pro Expired (view only)</strong></Text>{" "}<Button style={{ height: "16px", font: ".5em", lineHeight: "12px" }} secondary>Upgrade</Button> </>
            case "trial-expired":
                return <> <Text>Account: <strong>Trial Expired (view only)</strong></Text>{" "}<Button style={{ height: "16px", font: ".5em", lineHeight: "12px" }} secondary>Upgrade</Button> </>
        }
    }
    return (
        <div id="footer-container">
           {view()}
        </div>
    )
}