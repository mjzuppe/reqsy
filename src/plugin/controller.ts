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

    // TODO LOAD USER EMAIL
    // const options = {
    //   "method": "GET",
    //   "headers": {
    //     "Accept": "*/*",
    //     "Accept-Encoding": "gzip, deflate, br",
    //     "Accept-Language": "en-US,en;q=0.9",
    //     "X-Figma-User-Id": "1128692394473232156", // id_figma
    //     "Referer": "https://www.figma.com/file/CgXKtJouqytfreezP9BPOi/Untitled?type=design&node-id=0-1&mode=design&t=O2ZEhPMkEQkVWLCO-0",
    //     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
    //     "Sec-Ch-Ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
    //     "Sec-Ch-Ua-Mobile": "?0",
    //     "Sec-Ch-Ua-Platform": "\"macOS\"",
    //     "Sec-Fetch-Dest": "empty",
    //     "Sec-Fetch-Mode": "cors",
    //     "Sec-Fetch-Site": "same-origin",
    //   }
    // };

    // const r = await fetch('https://www.figma.com/api/session/state', options).then(r => r.json());
    // const userEmail = r?.meta?.users[0].email;

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
        figma.ui.postMessage({ user: u });
        const r:any = await readRoot(figma);
        let payload:any = r;
        // Get user record
        let registeredUser:any = await fetch(`http://localhost:54321/functions/v1/api/auth`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          },
          method: 'POST',
          body: JSON.stringify({ id_figma: u.id })
        });
        registeredUser = await registeredUser.json();
              // TODO Handle no data?

        const { id, id_figma, trial_end, status } = registeredUser;
        const userState = () => {
          const trial = new Date(trial_end);
          if (registeredUser.ls && registeredUser.ls.status === 'active') return "pro";
          else if (registeredUser.ls && registeredUser.ls.status !== 'active') return "pro-expired";
          else if ((trial.valueOf() - Date.now()) < 0) return "trial-expired";
          else return "trial";
        }

        if (r.user && r.user[u.id] === undefined) {
          payload.user = { ...r.user, [u.id]: {id, id_figma, trial_end, status: userState()} };
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
