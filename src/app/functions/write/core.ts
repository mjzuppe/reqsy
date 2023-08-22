import {validateRootInput} from "../validations";

const writeRoot = (figma:any, key:string, value: string) => figma.root.setPluginData(key, value);
const writeSelection = (figma:any, key:string, value: string) => {
    const node = figma.currentPage.selection[0];
    return node.setPluginData(key, value);
};
const validKey = (model: string, key: string):boolean => ["tags", "variables", "issues"].includes(model)? key.length > 0 : key.includes(":"); 
const writeRootModel = async (figma:any, model: string, key: string, value:any) => {
    if (typeof value === 'string') throw new Error ('value must be an object');
    if (!validKey) throw new Error ('invalid key');
    await validateRootInput(model, value);
    let table = JSON.parse(figma.root.getPluginData(model));
    table[key] = value;
    await writeRoot(figma, model, JSON.stringify(table));
    let r = {};
    r[model] = table;
    return r;
};


export {writeRoot, writeSelection, writeRootModel};