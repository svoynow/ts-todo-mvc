import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import { Model } from '../model';
// import registerServiceWorker from '../registerServiceWorker';
import App from './App';

interface RouterProps {
  path: string;
}

const model = Model.hydrate();

const Router = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/:active" render={render} />
        <Route path="/" render={render} />
      </Switch>
    </div>
  </BrowserRouter>
);

const render = (props: RouteComponentProps<RouterProps>) => (
  <App path={props.match.params.path || ''} />
);

const renderApp = () => {
  ReactDOM.render(<Router />, document.getElementById('root') as HTMLElement);
};

renderApp();

model.onChange(renderApp);

// registerServiceWorker();
