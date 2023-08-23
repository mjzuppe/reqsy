import { writeRoot } from "../write";

const deleteSelection = (figma:any, key:string) => {
    const node = figma.currentPage.selection[0];
    return node.setPluginData(key, "");
};
const validKey = (model: string, key: string):boolean => ["tags", "variables", "issues"].includes(model)? key.length > 0 : key.includes(":"); 
const deleteRootModel = async (figma:any, model: string, key: string) => {
    if (!validKey) throw new Error ('invalid key');
    let table = JSON.parse(figma.root.getPluginData(model));
    delete table[key];
    await writeRoot(figma, model, JSON.stringify(table));
    let r = {};
    r[model] = table;
    return r;
};


export {deleteSelection, deleteRootModel};