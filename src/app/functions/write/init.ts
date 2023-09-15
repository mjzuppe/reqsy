import {writeRoot, writeSelection} from '.';
import { generateReqsyId } from '../utils';
const initRootModel = (figma:any, model: string) => writeRoot(figma, model, model === 'init'? `{"created": "${ String(Date.now())}"}` : '{}');

const initSelection = async (figma:any, root?:any) => {
    const id = await generateReqsyId();
    writeSelection(figma, 'init', `{created: "${ String(Date.now())}"}`);
    writeSelection(figma, 'id', id);
    await writeSelection(figma, 'label', "New Component", {id, label: "New Component", tags: [], type: null, location: null, root});
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