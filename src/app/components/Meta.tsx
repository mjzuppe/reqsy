import React, { useState } from 'react';
import { Submenu } from '../util/ui/submenu';
import { SearchTextbox } from 'figma-ui-kit';
// Componenets
import { Tags } from './Tags';
import { Variables } from './Variables';
import { Issues } from './Issues';

export const Meta = (props: { data: any }) => {
  const { data } = props;
  const [currentView, setCurrentView] = useState('Tags');
  const [search, setSearch] = useState('');
  const submenuClickHandler = (e) => setCurrentView(e);
  const handleSearch = (e) => setSearch(e.target.value);
  const view: any = {
    Tags: <Tags data={data} search={currentView === 'Tags' ? search : ''} />,
    Variables: <Variables data={data} search={currentView === 'Variables' ? search : ''} />,
    Issues: <Issues />,
  }[currentView || 'Tags'];

  return (
    <div id="action-container">
      <div className="action-container-content">
        <p>
          <strong>Meta.</strong> Organize and map data.
        </p>
      </div>
      <div className="action-container-subnav">
        <Submenu onClick={submenuClickHandler} options={['Tags']} />
      </div>
      <div className="action-container-search">
        <SearchTextbox onInput={handleSearch} value={search} clearOnEscapeKeyDown placeholder="search names" />
      </div>
      <div className="action-container-subcontainer">{view}</div>
    </div>
  );
};
