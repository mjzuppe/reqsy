import {validateRootInput} from "../validations";

const writeRoot = (figma:any, key:string, value: string) => figma.root.setPluginData(key, value);
const writeSelection = (figma:any, key:string, value: string) => {
    const node = figma.currentPage.selection[0];
    return node.setPluginData(key, value);
};
const writeRootModel = async (figma:any, model: string, key: string, value:any) => {
    if (typeof value === 'string') throw Error ('value must be an object');
    // TODO validate key
    await validateRootInput(model, value);
    let table = JSON.parse(figma.root.getPluginData(model));
    table[key] = value;
    writeRoot(figma, model, JSON.stringify(table));
    let r = {};
    r[model] = table;
    return r;
};


export {writeRoot, writeSelection, writeRootModel};