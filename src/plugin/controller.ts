import { readElementOne, readRoot, readRootLibraryOne, readRootModel, readSelectionData, readSelectionName, readUser } from "../app/functions/read";
import { initSelection, writeRootModel, writeSelection } from "../app/functions/write";
import { readSelection, readSelectionId } from "../app/functions/read";
import { deleteSelection, deleteRootModel } from "../app/functions/delete";
import { getNodeById } from "../app/functions/ui";

const reloadRoot = async (data: { model: string }) => {
  const r = await readRootModel(figma, data.model);
  let payload = {};
  payload[data.model] = r;
  return await figma.ui.postMessage({ state: { model: payload } });
}

figma.showUI(__html__);
figma.ui.resize(300, 400); // set the size of the plugin UI height: 400, width: 3
figma.on("documentchange", async (event: any) => {
  const { documentChanges } = event;
  if (!documentChanges) return;
  const removed = documentChanges.filter((e: any) => e.type === "DELETE");
  const created = documentChanges.filter((e: any) => e.type === "CREATE");
  let library = await readRootModel(figma, 'library');
  if (removed) {
    for (const component of removed) {
      if (library[component.id] !== undefined) {
        await writeRootModel(figma, 'library', component.id, {...library[component.id], active:false});
      }
    }
    await reloadRoot({model: 'library'});
  }
  else if (created) {
    for (const component of created) {
      if (library[component.id] !== undefined) {
        await writeRootModel(figma, 'library', component.id, {...library[component.id], active:true});
      }
    }
    await reloadRoot({model: 'library'});
  }

})

figma.on("selectionchange", () => {
  if (!figma.currentPage.selection.length) figma.ui.postMessage({ selection: null });
});

figma.on("selectionchange", async () => {
  if (figma.currentPage.selection.length === 1) {
    const r = await readSelection(figma);
    // TODO if selection data not equal to library, then resync before proceeding
    figma.ui.postMessage({ selection: r });
  }
  else figma.ui.postMessage({ selection: undefined });
})

figma.ui.onmessage = async ({ func, data }) => {
  switch (func) {
    case 'init':
      if (data.model === 'selection') {
        const root = readRoot(figma);
        const r = await readSelection(figma);
        const selectionData = await readSelectionData(figma);
        const { id, name, type, parent } = selectionData;
        // const selectionName = await readSelectionName(figma);
        await initSelection(figma, id, name, type, parent, root);
        figma.ui.postMessage({ selection: r });
        await reloadRoot({model: 'library'});
      }
      else {
        const u:any = await readUser(figma);
        console.log("USER", u);
        const r:any = await readRoot(figma);
        let payload:any = r;
        // Get user record
        const registeredUser = await fetch(`http://localhost:54321/functions/v1/api/auth`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          },
          method: 'POST',
          body: JSON.stringify({ email: u.email })
        });
        registeredUser.json().then((r:any) => console.log("REGISTERED", u.email, r));
        // TODO Handle no data?

        if (r.user && r.user[u.id] === undefined) {
          payload.user = { ...r.user, [u.id]: {name: u.name, photoUrl: u.photoUrl, color: u.color} };
        }
        figma.ui.postMessage({ state: { root: payload } });
      }
      break;
    case 'get':
      if (!data.key) throw new Error('failure to select, key required');
      else getNodeById(figma, data.key);
      break;
    case 'read':
      // if (data.model === 'selection') {
      //   if (!data.key) throw new Error('failure to select, key required');
      //   return await readElementOne(figma, data.key);
      // }
      break;
    case 'write':
      if (data.model === 'selection') {
        const root = readRoot(figma);
        const selectionId = await readSelectionId(figma);
        const syncData = await readRootLibraryOne(figma, selectionId);
        await writeSelection(figma, data.key, data.value, {id: selectionId, root, ...syncData});
        const selectionMutated = await readSelection(figma);
        figma.ui.postMessage({ selection: selectionMutated });
        if (['label', 'tag'].includes(data.key)) {
          await reloadRoot({model: 'library'});
        }
      }
      else {
        await writeRootModel(figma, data.model, data.key, data.value);
        await reloadRoot(data);
      }
      break;
    case 'delete':
      if (data.model === 'selection') {
        await deleteSelection(figma, data.key);
      }
      else {
        await deleteRootModel(figma, data.model, data.key);
        await reloadRoot(data);
      }
      break;
    default:
      throw new Error(`Unknown command ${func}`);
      break;
  };

  // figma.closePlugin();

};
