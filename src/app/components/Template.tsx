import React from 'react';
import { TextboxAutocomplete, TextboxAutocompleteOption } from 'figma-ui-kit';

export const Template = () => {
  const options: Array<TextboxAutocompleteOption> = [
    { value: 'clear template' },
    { separator: true },
    { value: 'name1' },
    { value: 'vname2' },
    { value: 'bname3' },
  ];

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingBottom: '10px',
      }}
    >
      <TextboxAutocomplete placeholder="choose an item..." onInput={() => {}} options={options} value={null} />
    </div>
  );
};
