import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from "redux";
import {appReducer} from "../../reducer/appReducer";
import {Provider} from "react-redux";
import {ThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme/appTheme";

const store = createStore(appReducer);

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider  theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root')
);


registerServiceWorker();
