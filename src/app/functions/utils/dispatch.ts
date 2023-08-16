const dispatch = ({ func, data }: {func: string, data: any}) => { 
    return parent.postMessage({ pluginMessage: { func, data } }, '*'); 
};

export default dispatch;