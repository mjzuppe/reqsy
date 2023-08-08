// import rectangles from "../app/functions/write/rectangles";
import {rectangles} from "../app/functions/write";

figma.showUI(__html__);
figma.ui.resize(300, 400); // set the size of the plugin UI height: 400, width: 300
figma.ui.onmessage = (msg) => {
  console.log(figma.currentPage.selection);
  const node = figma.currentPage.selection[0];
  // node.setPluginData('pizza', 'scicilian');
  const stored = node.getPluginData('pizza');
  console.log("retrieved", stored);
  if (msg.type === 'create-rectangles') {
    switch (msg.type) {
      case 'create-rectangles':
        rectangles(msg);
        break;
    };

  figma.closePlugin();
};
};
