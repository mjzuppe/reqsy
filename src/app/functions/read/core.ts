import { initRoot } from "../write";
import {Node} from 'figma-types/types/node'

const readSelectionModel = (figma: any, key: string) => {
    const node = figma.currentPage.selection[0];
    const r = node.getPluginData(key);
    return r ? JSON.parse(r) : "";
}

const readSelectionId = (figma:any) => { // TODO Obsolete
    const node: Node = figma.currentPage.selection[0];
    return node.id;
}

const readSelectionData = (figma:any) => {
    const node: Node = figma.currentPage.selection[0];
    const {name, type, id} = node;
    const parent:any = figma.currentPage.selection[0].parent.name; // .parent not in typings?
    return {name, type, id, parent};
}

const readSelectionName = (figma:any) => {
    const node = figma.currentPage.selection[0];
    return node.name;
}

const readSelection = (figma: any) => { // TODO Obsolete
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

const readRootLibraryOne = async (figma: any, id: string) => {
    const library = await readRootModel(figma, 'library');
    return library[id];
}


export { readSelection, readRoot, readRootModel, readRootLibraryOne, readSelectionId, readSelectionData, readSelectionName};
