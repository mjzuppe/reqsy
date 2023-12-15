import React, { useState } from 'react';

import { IconToggleButton, IconLibrary32, IconInfo32, IconAdjust32, IconList32 } from 'figma-ui-kit';

export const Nav = (props) => {
  const [currentView, nextView] = useState<string>(props.currentView);
  const setView = (v) => {
    const view = v.target.id;
    props.setView(view);
    nextView(view);
  };
  return (
    <div id="navigation-container">
      <div>
        <IconToggleButton id="inspector" onClick={setView} value={currentView === 'inspector'}>
          <IconInfo32 />
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> */}
        </IconToggleButton>
      </div>
      <div>
        <IconToggleButton id="library" onClick={setView} value={currentView === 'library'}>
          <IconLibrary32 />
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-table"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path></svg> */}
        </IconToggleButton>
      </div>
      <div>
        <IconToggleButton id="meta" onClick={setView} value={currentView === 'meta'}>
          
        <IconList32 />
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg> */}
        </IconToggleButton>
      </div>

      <div className="navigataion-items-settings">
        <div>
          <IconToggleButton id="settings" onClick={setView} value={currentView === 'settings'}>
            <IconAdjust32 />
          </IconToggleButton>
        </div>
      </div>
    </div>
  );
};
