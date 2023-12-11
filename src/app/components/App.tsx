import React, { useState } from 'react';
import { controller } from '../functions/utils';
import * as mixpanel from 'mixpanel-figma';

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
  const [user, setUser] = useState<any>(undefined); // figma user data

  React.useEffect(() => {
    controller({ func: 'init', data: {} });
    window.onmessage = async (event) => {
      // Listen to data sent from the plugin controller
      if (!event.data?.pluginMessage) return;
      else if (event.data.pluginMessage.echo) {
        mixpanel.track('Create', { model: event.data.pluginMessage.echo.model });
      }
      else if ('selection' in event.data.pluginMessage) {
        setSelectionData(event.data.pluginMessage.selection);
        setLastUpdated(Date.now()); // This is only passed to inspector to force re-render/reset conditions on selection change
      } else if (event.data?.pluginMessage && event.data.pluginMessage.state) {
        const { state } = event.data.pluginMessage;
        if (state.root) await setDb(() => state.root);
        else if (state.model) await setDb((prevState: any) => ({ ...prevState, ...state.model }));
        //setLastUpdated(Date.now()); // Required to force re-render
      } else if ('user' in event.data?.pluginMessage) {
        setUser(
          process.env.AUTH_OVERRIDE
            ? { ...event.data.pluginMessage.user, status: process.env.AUTH_OVERRIDE }
            : event.data.pluginMessage.user
        );
        mixpanel.init(process.env.MIXPANEL_TOKEN, {
          disable_cookie: true,
          disable_persistence: true
        });
        // mixpanel.identify(event.data.pluginMessage.user.id);
      }
    };
  }, []);
  const handleKeydown = (e: any) => {
    // Feature flag at cmd + A
    // if (e.metaKey && e.which === 65) {
    //   console.log('Testing window.localStorage', window.localStorage);
    //   controller({ func: 'test', data: { id_figma: user.id } });
    // }
  };
  return (
    <div onKeyDown={handleKeydown} id="primary-container" className="figma-dark">
      <Header currentView={actionView} setView={setActionView} />
      <Action updated={lastUpdated} selectionData={selectionData} db={db} currentView={actionView} user={user} />
      <Footer user={user} db={db} />
    </div>
  );
}

export default App;
