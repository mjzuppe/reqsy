import {writeRoot} from '.';
const initRootModel = (figma:any, model: string) => writeRoot(figma, model, model === 'init'? `{"created": "${ String(Date.now())}"}` : '{}');

const initRoot = () => {
    initRootModel(figma, 'init');
    initRootModel(figma,'user');
    initRootModel(figma,'library');
    initRootModel(figma,'api');
    initRootModel(figma,'tag');
    initRootModel(figma,'variable');
    initRootModel(figma,'issue');
}

export {initRoot, initRootModel}