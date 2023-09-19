const getNodeById = (figma:any, id: string) => {
    const node = figma.getNodeById(id);
    figma.currentPage.selection = [node];
}

export {getNodeById};