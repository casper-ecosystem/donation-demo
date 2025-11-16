import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ClickProvider } from '@make-software/csprclick-ui';
import { CONTENT_MODE, CsprClickInitOptions } from '@make-software/csprclick-core-types';
import App from './App';
import ReactModal from 'react-modal';

const clickOptions: CsprClickInitOptions = {
  appName: config.cspr_click_app_name,
  appId: config.cspr_click_app_id,
  contentMode: CONTENT_MODE.IFRAME,
  providers: JSON.parse(config.cspr_click_providers)
};

ReactModal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ClickProvider options={clickOptions}>
      <App />
    </ClickProvider>
  </React.StrictMode>
);
