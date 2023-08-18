import {readRoot} from "../app/functions/read";
import { writeRootModel, writeSelection } from "../app/functions/write";
import { readSelection } from "../app/functions/read";

figma.showUI(__html__);
figma.ui.resize(300, 400); // set the size of the plugin UI height: 400, width: 300
figma.on("documentchange",(event:any) => {
  const {documentChanges} = event;
  if (!documentChanges) return;
  const removed = documentChanges.filter((e:any)=>e.type === "DELETE");
  const created = documentChanges.filter((e:any)=>e.type === "CREATE");
  if (removed) {
  // TODO get .id and make inactive in library
  }
  else if (created) {
// TODO get .id and make active in library if exists
  }

})
figma.on("selectionchange", () => {
  if (figma.currentPage.selection.length === 1) {
    const r = readSelection(figma);
    figma.ui.postMessage({echo: r});
  }
})

figma.ui.onmessage = ({func, data}) => {
  switch (func) {
    case 'init':
      const r = readRoot(figma);
      figma.ui.postMessage({state: {root: r}});
      break;
    case 'read':
      break;
    case 'write':
      if (data.model === 'selection') writeSelection(figma, data.key, data.value);
      else writeRootModel(figma, data.model, data.key, data.value);
      break;
    default:
      throw new Error(`Unknown command ${func}`);
      break; 
  };

  // figma.closePlugin();

};
