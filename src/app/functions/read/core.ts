import { initRoot } from "../write";

const readSelectionModel = (figma: any, key: string) => {
    const node = figma.currentPage.selection[0];
    const r = node.getPluginData(key);
    return r ? JSON.parse(r) : "";
}

const readSelectionId = (figma:any) => {
    const node = figma.currentPage.selection[0];
    return node.id;
}

const readSelection = (figma: any) => {
    const models = ['init', 'id', 'label', 'tag', 'link', 'condition', 'behavior', 'note'];
    let selection = {};
    models.forEach(model => { selection[model] = readSelectionModel(figma, model)});
    console.log("SELECTION::", selection);
    return selection;
}

const readRoot = (figma:any) => {
    const initialized = figma.root.getPluginData('init');
    if (!initialized) initRoot();
    let root = {};
    const models = ['account','init', 'user', 'library',  'tag', 'variable'];
    models.forEach(model => root[model] = readRootModel(figma, model));
    console.log("ROOT::", root);
    return root;
};

const readRootModel = (figma: any, model: string) => {
    const value = figma.root.getPluginData(model);
    return value ? JSON.parse(value) : {};
};



export { readSelection, readRoot, readRootModel, readSelectionId};
