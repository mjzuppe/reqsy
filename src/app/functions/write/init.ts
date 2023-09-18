import {writeRoot, writeSelection} from '.';
const initRootModel = (figma:any, model: string) => writeRoot(figma, model, model === 'init'? `{"created": "${ String(Date.now())}"}` : '{}');

const initSelection = async (figma:any, id: string, name: string, root?:any) => {
    const label = name || "New Component";
    writeSelection(figma, 'init', {created: String(Date.now())});
    writeSelection(figma, 'id', id);
    await writeSelection(figma, 'label', label, {id, label, tags: [], type: null, location: null, root});
    writeSelection(figma, 'tag', []);
    writeSelection(figma, 'link', "");
    writeSelection(figma, 'condition', []);
    writeSelection(figma, 'behavior', []);
}

const initRoot = () => {
    initRootModel(figma,'init');
    initRootModel(figma,'user');
    initRootModel(figma,'library');
    initRootModel(figma,'api');
    initRootModel(figma,'tag');
    initRootModel(figma,'variable');
    initRootModel(figma,'issue');
}

export {initRoot, initRootModel, initSelection}