import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from '~/utils/history'
import '~/styles/index.scss';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </React.StrictMode>,
)
