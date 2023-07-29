import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import './fonts/Quark-Bold.otf';
import './fonts/Quark-Light.otf';
import './index.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
