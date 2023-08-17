const writeRoot = (figma:any, key:string, value: string) => figma.root.setPluginData(key, value);

export default writeRoot;