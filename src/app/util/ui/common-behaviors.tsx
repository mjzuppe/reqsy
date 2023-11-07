export const commonBehaviors = [
  {
    element: 'a',
    attributes: ['href', 'target', 'download', 'rel', 'title'],
    eventHandlers: ['onClick', 'onContextMenu', 'onMouseOver', 'onMouseOut'],
  },
  {
    element: 'img',
    attributes: ['src', 'alt', 'width', 'height', 'usemap', 'ismap'],
    eventHandlers: ['onClick', 'onLoad', 'onError'],
  },
  {
    element: 'input',
    attributes: [
      'type',
      'name',
      'value',
      'placeholder',
      'maxlength',
      'size',
      'checked',
      'disabled',
      'readonly',
      'required',
      'pattern',
      'autocomplete',
      'autofocus',
    ],
    eventHandlers: ['onChange', 'onClick', 'onKeyDown', 'onBlur', 'onFocus'],
  },
  {
    element: 'button',
    attributes: [
      'type',
      'name',
      'value',
      'form',
      'formaction',
      'formmethod',
      'formenctype',
      'formnovalidate',
      'formtarget',
      'autofocus',
      'disabled',
    ],
    eventHandlers: ['onClick', 'onKeyDown', 'onContextMenu'],
  },
  {
    element: 'form',
    attributes: [
      'action',
      'method',
      'enctype',
      'name',
      'id',
      'target',
      'accept-charset',
      'autocomplete',
      'novalidate',
      'onsubmit',
      'onClick',
      'onReset',
    ],
  },
  {
    element: 'label',
    attributes: ['for', 'onClick'],
  },
  {
    element: 'select',
    attributes: ['name', 'size', 'multiple', 'disabled', 'autofocus', 'required'],
    eventHandlers: ['onChange', 'onClick', 'onKeyDown'],
  },
  {
    element: 'textarea',
    attributes: [
      'name',
      'rows',
      'cols',
      'maxlength',
      'placeholder',
      'readonly',
      'disabled',
      'required',
      'autofocus',
      'onChange',
      'onClick',
      'onKeyDown',
    ],
  },
  {
    element: 'table',
    attributes: ['border', 'cellspacing', 'cellpadding', 'width', 'height', 'summary', 'bgcolor'],
  },
  {
    element: 'tr',
    attributes: ['align', 'valign'],
  },
  {
    element: 'td',
    attributes: ['colspan', 'rowspan', 'width', 'height', 'headers', 'abbr', 'align', 'valign', 'bgcolor'],
  },
  {
    element: 'th',
    attributes: ['colspan', 'rowspan', 'scope', 'headers', 'abbr', 'align', 'valign', 'onClick'],
  },
  {
    element: 'div',
    attributes: ['class', 'id', 'style'],
    eventHandlers: ['onClick', 'onMouseOver', 'onMouseOut'],
  },
  {
    element: 'span',
    attributes: ['class', 'id', 'style'],
  },
  {
    element: 'p',
    attributes: ['class', 'id', 'style'],
  },
  {
    element: 'h1',
    attributes: ['class', 'id', 'style'],
  },
  {
    element: 'h2',
    attributes: ['class', 'id', 'style'],
  },
  {
    element: 'h3',
    attributes: ['class', 'id', 'style'],
  },
  {
    element: 'h4',
    attributes: ['class', 'id', 'style'],
  },
  {
    element: 'h5',
    attributes: ['class', 'id', 'style'],
  },
  {
    element: 'h6',
    attributes: ['class', 'id', 'style'],
  },
  {
    element: 'ol',
    attributes: ['type', 'start', 'reversed'],
  },
  {
    element: 'ul',
    attributes: ['type'],
  },
  {
    element: 'li',
    attributes: ['value'],
  },
  {
    element: 'meta',
    attributes: ['charset', 'name', 'content'],
  },
  {
    element: 'link',
    attributes: ['rel', 'type', 'href', 'media'],
  },
  {
    element: 'script',
    attributes: ['src', 'type', 'async', 'defer'],
  },
];
