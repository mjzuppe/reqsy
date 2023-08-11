// from: https://github.com/nirsky/figma-plugin-react-template

import React, {useState} from 'react';

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
  const [actionView, setActionView] = useState<string>('settings');
  // const textbox = React.useRef<HTMLInputElement>(undefined);

  // const saveData = (e) => {
  //   e.preventDefault();

  //   const testForm:any = document.getElementById("TestForm");
  //   const {value} = testForm.elements[0];
  //   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
    
  // }

  // const countRef = React.useCallback((element: HTMLInputElement) => {
  //   if (element) element.value = '5';
  //   textbox.current = element;
  // }, []);

  // const onCreate = () => {
  //   const count = parseInt(textbox.current.value, 10);
  //   parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
  // };

  // const onCancel = () => {
  //   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  // };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div id="primary-container" className="figma-dark">
      <Header setView={setActionView}/>
      <Action currentView={actionView} />
      
      {/* <div id="action-container">

      <Section title="Store Data">
      <form id="TestForm" onSubmit={saveData}>
      <Textbox onInput={(e) => setValue(e.target.value)} value={value} placeholder="Enter text here" />
      <Button typeof='submit'>Submit</Button>
      </form>

      </Section>
      <Section title="Load Data">
        <Text>{"hi mom!"}</Text>
        </Section>

      </div> */}
      <Footer/>
    </div>
  );
}

export default App;
