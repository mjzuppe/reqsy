import React, { KeyboardEvent } from 'react';
import { Inspector } from './Inspector';
import { Meta } from './Meta';
import { Library } from './Library';
import { Settings } from './Settings';
// components
import { LoadingIndicator } from 'figma-ui-kit';

export const Action = (props: { currentView: string; db: any; selectionData: any; user: any; updated: number }) => {
  const { db, selectionData, user, updated } = props;
  const { currentView } = props;
  const readOnly = user?.status?.includes('expired') || user?.status === null ? true : false;
  const view: any = {
    inspector: <Inspector updated={updated} db={db} selectionData={selectionData} readOnly={readOnly} />,
    meta: <Meta data={db} />,
    library: <Library db={db} readOnly={readOnly} />,
    settings: <Settings user={user} />,
  }[currentView || 'inspector'];
  return (
    <div id="action-container">
      {db ? (
        view
      ) : (
        <div className="action-container-content" style={{ height: '100%', alignItems: 'center' }}>
          <LoadingIndicator />
        </div>
      )}
    </div>
  );
};
