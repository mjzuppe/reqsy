import React, { useState } from 'react';
// components
import { IconButton, IconEllipsis32 } from 'figma-ui-kit';
import { Menu } from '../util/ui/menu';
import { PlusMinusToggle } from '../util/ui/plusminus';
import { TextInput } from '../util/ui/text-input';
// data
import { controller, generateReqsyId } from '../functions/utils';

export const Variables = (props) => {
  const { data, search } = props;
  const variableObject = data.variable;
  const variableKeys = Object.keys(variableObject).reverse();
  const variablesFiltered = search
    ? variableKeys.filter((v: any) => variableObject[v].label.toLowerCase().includes(search.toLowerCase()))
    : variableKeys;

  const [newVariableOpen, setNewVariableOpen] = useState(false);

  const clickHandlerAdd = async () => {
    if (!newVariableOpen) {
      await setNewVariableOpen(true);
      document.getElementById(`variable-items-new-variable-label`).focus();
    }
  };

  const [expanded, setExpanded] = useState([]);
  const handleExpand = (i: number) => {
    if (expanded.includes(i)) setExpanded(expanded.filter((e) => e !== i));
    else setExpanded([...expanded, i]);
  };

  const typeOptions = ['string', 'number', 'boolean', 'object', 'array'];
  const invalidVariables = (current: string) =>
    Object.values(variableObject)
      .map((tagData: any) => tagData.label)
      .filter((tagLabel: string) => tagLabel !== current);

  const clickHandlerNewOrUpdate = async (e: any) => {
    // Only label is required to save, when onblur, ensure default values for other fields
    if (e.target.value.trim() === '' && newVariableOpen) return setNewVariableOpen(false);
    let variableId = newVariableOpen
      ? await generateReqsyId()
      : e.target.id.split('-')[e.target.id.split('-').length - 2];
    const param = newVariableOpen ? 'label' : e.target.id.split('-')[e.target.id.split('-').length - 1];
    if (!['label', 'type', 'description'].includes(param)) throw new Error('invalid parameter');
    let mutatedData = {};
    mutatedData[param] = e.target.value.trim();
    const payload = newVariableOpen
      ? { type: 'string', ...mutatedData }
      : { ...variableObject[variableId], ...mutatedData };
    await controller({ func: 'write', data: { model: 'variable', key: variableId, value: payload } });
    await setNewVariableOpen(false);
  };

  const clickHandlerDelete = async (variableId: string) => {
    await controller({ func: 'delete', data: { model: 'variable', key: variableId } });
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PlusMinusToggle value={!newVariableOpen} onClick={clickHandlerAdd} />
      </div>
      <div className="items-list">
        {newVariableOpen && (
          <div
            key={`variables-items-new-variable`}
            style={{ padding: '5px 0 5px' }}
            className="items-list-item items-border-bottom"
          >
            <div
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              className="items-list-item"
            >
              <TextInput
                invalidlist={invalidVariables('')}
                placeholder="enter label..."
                style={{ marginLeft: '10px' }}
                maxLength={16}
                onblur={clickHandlerNewOrUpdate}
                defaultValue={''}
                id="variable-items-new-variable-label"
              />
            </div>
            <div className={`items-list-item-expanded`} style={{ padding: '5px 0 5px' }}>
              <div
                style={{
                  paddingLeft: '7px',
                  alignItems: 'center',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div className="select">
                  <select defaultValue={'string'} id="variable-items-new-variable-type">
                    {typeOptions.map((type, i) => (
                      <option key={`type-${i}`} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <TextInput
                    placeholder="validation/notes"
                    style={{ marginLeft: '2px', width: '160px' }}
                    maxLength={32}
                    onblur={clickHandlerNewOrUpdate}
                    defaultValue={''}
                    id="variable-items-new-variable-description"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {variablesFiltered.map((variableId, i) => {
          const variableData = variableObject[variableId];
          return (
            <div
              key={`variables-items-${variableId}`}
              style={{ padding: '5px 0 5px' }}
              className="items-list-item items-border-bottom"
            >
              <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                className="items-list-item"
              >
                <TextInput
                  dblclick
                  invalidlist={invalidVariables(variableObject[variableId].label)}
                  placeholder="enter label..."
                  style={{ marginLeft: '10px' }}
                  maxLength={16}
                  onblur={clickHandlerNewOrUpdate}
                  defaultValue={variableData.label}
                  id={`variable-items-${variableId}-label`}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <PlusMinusToggle onClick={() => handleExpand(i)} />
                </div>
              </div>
              <div
                className={`items-list-item-expanded ${expanded.includes(i) ? '' : 'hide'}`}
                style={{ padding: '5px 0 5px' }}
              >
                <div
                  style={{
                    paddingLeft: '7px',
                    alignItems: 'center',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div className="select">
                    <select defaultValue={variableData.type} id={`variable-items-${variableId}-type`}>
                      {typeOptions.map((type, i) => (
                        <option key={`type-${i}`} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <TextInput
                      invalidlist={[]}
                      placeholder="validation/notes"
                      style={{ marginLeft: '2px', width: '160px' }}
                      maxLength={32}
                      onblur={clickHandlerNewOrUpdate}
                      defaultValue={variableData.description}
                      id={`variable-items-${variableId}-description`}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Menu
                      danger
                      marginLeft={'-28px'}
                      onClick={() => clickHandlerDelete(variableId)}
                      options={['delete?']}
                      trigger={
                        <IconButton>
                          <IconEllipsis32 />
                        </IconButton>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
