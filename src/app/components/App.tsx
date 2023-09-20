// from: https://github.com/nirsky/figma-plugin-react-template

import React, {useState} from 'react';
import { controller } from '../functions/utils';

// import logo from '../assets/logo.svg';
import '../styles/theme.css';
import '../styles/base.css';
import '../styles/menu.module.css';
import '../styles/components.css';

// Components
import { Header } from './Header';
import { Footer } from './Footer';
import { Action } from './Action';

function App() {
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [actionView, setActionView] = useState<string>('inspector');
  const [db, setDb] = useState<any>(undefined);
  const [selectionData, setSelectionData] = useState<any>(undefined);
  React.useEffect(() => {
    controller({func: 'init', data: {}});
    window.onmessage = async (event) => {
      // Listen to data sent from the plugin controller
      if (!event.data?.pluginMessage) return;
      else if (event.data.pluginMessage.echo) console.log(event.data.pluginMessage.echo); // FOR TESTING
      else if ('selection' in event.data.pluginMessage) {
        setSelectionData(event.data.pluginMessage.selection);
        setLastUpdated(Date.now()); // Required to force re-render
      }
      else if (event.data?.pluginMessage && event.data.pluginMessage.state) {
        const {state} = event.data.pluginMessage;
        if (state.root) await setDb(()=> (state.root));
        else if (state.model) await setDb((prevState:any)=>({...prevState, ...state.model}));
        setLastUpdated(Date.now()); // Required to force re-render
      }
    };


  }, []);

  return (
    <div key={lastUpdated} id="primary-container" className="figma-dark">
      <Header setView={setActionView}/>
      <Action selectionData={selectionData} db={db} currentView={actionView} />
      <Footer/>
    </div>
  );
}

export default App;
