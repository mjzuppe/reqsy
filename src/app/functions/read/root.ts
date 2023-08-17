import { initRoot } from "../write";
import { readRootModel } from ".";

const readRoot = (figma:any) => {
    const initialized = figma.root.getPluginData('init');
    if (!initialized) initRoot();
    let root = {};
    const models = ['init', 'user', 'library', 'api', 'tag', 'variable', 'issue'];
    models.forEach(model => root[model] = readRootModel(figma, model));
    return root;
};

export default readRoot;