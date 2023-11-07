import { writeRoot, writeSelection } from '.';
const initRootModel = (figma: any, model: string) =>
  writeRoot(figma, model, model === 'init' ? `{"created": "${String(Date.now())}"}` : '{}');

const initSelection = async (figma: any, id: string, name: string, type: string, location: string, root?: any) => {
  const label = name || 'New Component';
  writeSelection(figma, 'init', { created: String(Date.now()) });
  writeSelection(figma, 'id', id);
  await writeSelection(figma, 'label', label, { id, label, tag: [], type, location, root });
  writeSelection(figma, 'tag', [], { id, label, tag: [], type, location, root });
  writeSelection(figma, 'note', []);
  writeSelection(figma, 'link', '', { id, label, tag: [], type, location, root });
  writeSelection(figma, 'condition', []);
  writeSelection(figma, 'behavior', []);
};

const initRoot = () => {
  initRootModel(figma, 'init');
  initRootModel(figma, 'user');
  initRootModel(figma, 'library');
  initRootModel(figma, 'api');
  initRootModel(figma, 'tag');
  initRootModel(figma, 'variable');
  initRootModel(figma, 'issue');
};

export { initRoot, initRootModel, initSelection };
