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
  const [actionView, setActionView] = useState<string>('meta');
  const [data, setData] = useState<any>(undefined);
  React.useEffect(() => {
    controller({func: 'init', data: {}});
    // controller({func: 'write', data: {model: "user", key: "rara", value: {hi: "mom"}}}); // Write to model - if model === 'selection' will write to selection;
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      // Listen to data sent from the plugin controller
      if (event.data?.pluginMessage && event.data.pluginMessage.echo) console.log(event.data.pluginMessage.echo); // FOR TESTING
      else if (event.data?.pluginMessage && event.data.pluginMessage.state) {
        const {state} = event.data.pluginMessage;
        if (state.root) setData(state.root);
        else if (state.model) setData({...data, ...state.model});
      }
    };

    
  }, []);


  return (
    <div id="primary-container" className="figma-dark">
      <Header setView={setActionView}/>
      <Action data={data} currentView={actionView} />
      <Footer/>
    </div>
  );
}

export default App;
