import React, { useState, useEffect, ReactElement } from 'react';
import { controller } from '../functions/utils';
import { useRemark } from 'react-remark';

const MDView = (props: { md: string, disabled: boolean, readOnly: boolean }) => {
  const [reactContent, setMarkdownSource] = useRemark();
  useEffect(() => {
    setMarkdownSource(props.md || (!(props.disabled || props.readOnly) ? 'input notes here...' : 'No notes have been entered for this element.'));
  }, []);

  const processNodes = (nodes) => {
    return React.Children.map(nodes, (child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      
      let props = {};
      if (child.type === 'a') {
        props = { target: '_blank', rel: 'noopener noreferrer' };
      }
      else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(String(child.type))) {
        props = { style: {marginTop: "10px", fontWeight: "700"} };
      }
      if (index === 0) {
        props = { style: {marginTop: "0px"} };
      }

      if ((child as ReactElement).props.children) {
        child = React.cloneElement(child, props, processNodes((child as ReactElement).props.children));
      } else {
        child = React.cloneElement(child, props);
      }

      return child;
    });
  };

  return processNodes(reactContent);
}

export const Notes = (props: {
  selectionData: any;
  currentViewValue: string;
  disabled: boolean;
  readOnly: boolean;
}) => {
  const { selectionData, currentViewValue, disabled, readOnly } = props;
  const [editing, setEditing] = useState<boolean>(false);
  const currentViewData = currentViewValue || 'default';
  const conditionId = selectionData.condition.length
    ? selectionData.condition.filter((c: any) => c.label === currentViewData)[0].id
    : 'default';
  const isNew = selectionData.note.filter((n: any) => n.id === conditionId).length === 0;
  const note = selectionData.note.filter((n: any) => n.id === conditionId)[0]?.value || '';

  const handleNoteUpdate = async (e: any) => {
    const payload = isNew
      ? [{ id: conditionId, value: e.target.value }, ...selectionData.note]
      : [{ id: conditionId, value: e.target.value }, ...selectionData.note.filter((n: any) => n.id !== conditionId)];
    await controller({ func: 'write', data: { model: 'selection', key: 'note', value: payload } });
    handleBlur(e);
  };

  const handleFocus = (e: any) => {
    if (disabled || readOnly) return;
    setEditing(true);
    setTimeout(() => {
      const el: any = document.getElementById('notes-textarea-input');
      el.focus();
      const value = el ? el.value : 0;
      el.selectionStart = value.length - 1;
      el.selectionEnd = value.length - 1;
    }, 100);

  };
  const handleBlur = (e: any) => {
    setEditing(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const value = e.currentTarget.value;
      e.currentTarget.value = value.substring(0, start) + '\n' + value.substring(end);
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1;
    } else if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  }

  return (
    <div
      key={`inspector-note-${conditionId}`}
      style={{
        marginLeft: '10px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingBottom: '10px',
      }}
    >
      {
        editing ?
          <>
            <textarea
              id={"notes-textarea-input"}
              disabled={disabled || readOnly}
              onBlur={handleNoteUpdate}
              defaultValue={note}
              maxLength={1000}
              onKeyDown={handleKeyDown}
              placeholder={!(disabled || readOnly) ? 'input notes here...' : 'No notes have been entered for this element.'}
              className="notes"
            /></> :
          <div className="notes" onClick={(e: any) => handleFocus(e)}>
            <MDView md={note} disabled={disabled} readOnly={readOnly} />
          </div>
      }
    </div>
  );
};
