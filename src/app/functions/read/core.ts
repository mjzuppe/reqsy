import { initRoot } from "../write";

const readSelection = (figma: any) => {
    const node = figma.currentPage.selection[0];
    return node.getPluginData('pizza');
}

const readRoot = (figma:any) => {
    const initialized = figma.root.getPluginData('init');
    if (!initialized) initRoot();
    let root = {};
    const models = ['init', 'user', 'library', 'api', 'tag', 'variable', 'issue'];
    models.forEach(model => root[model] = readRootModel(figma, model));
    return root;
};

const readRootModel = (figma: any, model: string) => {
    const value = figma.root.getPluginData(model);
    return value ? JSON.parse(value) : null;
};

export { readSelection, readRoot, readRootModel};
