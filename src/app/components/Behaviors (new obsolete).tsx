import React, { useState } from 'react';
import { Button } from 'figma-ui-kit';
import { Select } from '../util/ui/select';

const ChooseBehaviorView = () => {
  return (
    <div id="action-container">
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%' }}>
        <div style={{ padding: '5px' }}>
          <Button onClick={() => {}}>Get suggested</Button>
        </div>
        <div style={{ padding: '5px' }}>
          <Button onClick={() => {}}>Manually create</Button>
        </div>
      </div>
    </div>
  );
};

const MutateBehaviorView = () => {
  return <div />;
};

const SelectBehavior = () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', width: '100%' }}
    className="action-container-content"
  >
    <div style={{ fontWeight: 'bold', fontSize: '1.5em', padding: '5px' }}>Select element type</div>
    <Select
      style={{ width: '100px' }}
      id="behavior-element-type-select"
      defaultValue={'null'}
      options={[
        { label: 'element type', value: null },
        { label: 'select', value: 'select' },
      ]}
    />
  </div>
);

export const Behaviors = (props: { selectionData: any; currentViewData: any }) => {
  const { selectionData } = props;
  const [selectBehaviorView, setSelectBehaviorView] = useState(false);
  const isNew = true;
  const view = isNew ? (
    selectBehaviorView ? (
      <SelectBehavior />
    ) : (
      <div onClick={() => setSelectBehaviorView(true)}>
        <ChooseBehaviorView />
      </div>
    )
  ) : (
    <MutateBehaviorView />
  );
  return view;
};
