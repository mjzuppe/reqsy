const base = {
    users: {},
    library: {}, // each component will be recorded seperately no in this base (more efficent)
    apis: {},
    meta: {
        tags: [],
        variables: [],
        issues: []
    },
}

const init = () => {
    let retrieved = figma.root.getPluginData('base');
    if (!retrieved) {
        figma.root.setPluginData('base', JSON.stringify(base));
        retrieved = figma.root.getPluginData('base');
    }
    return(JSON.parse(retrieved));
}

export default init;

// TODOS
// Seperate stores for user, lib, apis, tags, variables, issues
// lib is minimal data only (what's required for non inspector screens), should also include .active
// active field will eventually need to update based on document changes
// each componenet stores in it's own data record is: {'id': {}}