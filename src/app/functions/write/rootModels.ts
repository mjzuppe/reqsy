import {writeRoot} from '.';
import {validateRootInput} from "../validations";

export const initRootModel = (figma:any, model: string) => writeRoot(figma, model, model === 'init'? `{"created": "${ String(Date.now())}"}` : '{}')

export const writeRootModel = (figma:any, model: string, key: string, value:any) => {
    if (typeof value === 'string') throw Error ('value must be an object');
    // TODO validate key
    // validateRootInput(model, value);
    let table = JSON.parse(figma.root.getPluginData(model));
    console.log("value", value)
    table[key] = value;
    writeRoot(figma, model, JSON.stringify(table));
    let r = {};
    r[model] = table;
    return r;
};

