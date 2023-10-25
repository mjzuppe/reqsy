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
        await writeRootModel(figma, 'library', component.id, { ...library[component.id], active: false });
      }
    }
    await reloadRoot({ model: 'library' });
  }
  else if (created) {
    for (const component of created) {
      if (library[component.id] !== undefined) {
        await writeRootModel(figma, 'library', component.id, { ...library[component.id], active: true });
      }
    }
    await reloadRoot({ model: 'library' });
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
        await initSelection(figma, id, name, type, parent, root);
        figma.ui.postMessage({ selection: r });
        await reloadRoot({ model: 'library' });
      }
      else {
        const u: any = await readUser(figma);
        const r: any = await readRoot(figma);
        let payload: any = r;
        // Get user record
        let registeredUser: any = null;
        try {
          registeredUser = await fetch(`${process.env.API_URI}/functions/v1/api/auth`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
            },
            method: 'POST',
            body: JSON.stringify({ id_figma: u.id })
          });
          registeredUser = await registeredUser.json();
        }
        catch(e) {
          console.log("Error fetching user", e);
          registeredUser = { error: e };
        }
        if (!registeredUser.error) {
          const { id, id_figma, trial_end, status } = registeredUser;

          const userState = () => {
            const trial = new Date(trial_end);
            if (registeredUser.ls && registeredUser.ls.status === 'active') return "pro";
            else if (registeredUser.ls && registeredUser.ls.status !== 'active') return "pro-expired";
            else if ((trial.valueOf() - Date.now()) < 0) return "trial-expired";
            else return "trial";
          }
  
          if (r.user && r.user[u.id] === undefined) {
            payload.user = { ...r.user, [u.id]: { id, id_figma, trial_end, status: userState() } };
          }
        }
        
        figma.ui.postMessage({ state: { root: payload } });
        figma.ui.postMessage({ user: payload.user[u.id] });
      }
      break;
    case 'get':
      if (!data.key) throw new Error('failure to select, key required');
      else getNodeById(figma, data.key);
      break;
    case 'read':
      // TODO obsolete?
      break;
    case 'write':
      if (data.model === 'selection') {
        const root = readRoot(figma);
        const selectionId = await readSelectionId(figma);
        const syncData = await readRootLibraryOne(figma, selectionId);
        await writeSelection(figma, data.key, data.value, { id: selectionId, root, ...syncData });
        const selectionMutated = await readSelection(figma);
        figma.ui.postMessage({ selection: selectionMutated });
        if (['label', 'tag'].includes(data.key)) {
          await reloadRoot({ model: 'library' });
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
    case 'activate':
      const { license_key } = data;
      const { id } = await readUser(figma);
      try {
      let activateCall: any = await fetch(`${process.env.API_URI}/functions/v1/api/activate`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          },
          method: 'POST',
          body: JSON.stringify({ id_figma: id, license_key })
        });
        await reloadRoot(data);
      }
      catch(e) {
        return ({error: e.message});
      }
   
        
      break;
    case 'support':
      const { category, email, text } = data;
      const u: any = await readUser(figma);
      let supportCall: any = await fetch(`${process.env.API_URI}/functions/v1/api/support`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          },
          method: 'POST',
          body: JSON.stringify({ user_id: u.id, category, email, text })
        });
      break;
    case 'test':
      if (!data.id_figma) console.log("No id_figma");
      const options = {
        "method": "GET",
        "headers": {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          "X-Figma-User-Id": data.id_figma,
          "Sec-Ch-Ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Ch-Ua-Platform": "\"macOS\"",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
        }
      };
      try {
        let r:any = await fetch('https://www.figma.com/api/session/state', options);
        r = r.json();
        const userEmail = r?.meta?.users[0].email;
        console.log("Testing user email", userEmail);
      }
      catch(e) {
        console.log("Test failed:", e);
      }
      break;
    default:
      throw new Error(`Unknown command ${func}`);
      break;
  };

  // figma.closePlugin();

};
