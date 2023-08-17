// import rectangles from "../app/functions/write/rectangles";
// import {loadall} from "../app/functions/read";
// import { rectangles } from "../app/functions/write";

import {readRoot} from "../app/functions/read";

figma.showUI(__html__);
figma.ui.resize(300, 400); // set the size of the plugin UI height: 400, width: 300
figma.on("documentchange",(event:any) => {
  const {documentChanges} = event;
  console.log("DOC CHANGE", documentChanges);
  if (!documentChanges) return;
  const removed = documentChanges.filter((e:any)=>e.type === "DELETE");
  const created = documentChanges.filter((e:any)=>e.type === "CREATE");
  // get .id and update
})
figma.ui.onmessage = ({func, data}) => {
  // console.log("MST", msg)
  // figma.root.setPluginData("test", "hi mom!");
  // const stored = figma.root.getPluginData('test');
  // console.log("stored", stored);
  // const node = figma.currentPage.selection[0];
  // node.setPluginData('pizza', 'scicilian');
  // const stored = node.getPluginData('pizza');
  // console.log("retrieved", stored);
  switch (func) {
    case 'init':
      const r = readRoot(figma);
      figma.ui.postMessage({'root': r});
      break;
    case 'read':
      break;
    case 'write':
      break;
    default:
      // throw Error('Unknown command');
      break; 
    // case 'create-rectangles':
    //   rectangles(msg);
    //   break;
    // case 'loadall': 
    //   loadall();
    //   break;
  };

  // figma.closePlugin();

};
