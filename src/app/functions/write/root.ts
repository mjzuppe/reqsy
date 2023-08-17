import { initRootModel } from './index';

const initRoot = () => {
    initRootModel(figma, 'init');
    initRootModel(figma,'user');
    initRootModel(figma,'library');
    initRootModel(figma,'api');
    initRootModel(figma,'tag');
    initRootModel(figma,'variable');
    initRootModel(figma,'issue');
}

export default initRoot