/*=====================================
    App

    Author: Jhang
    CreateTime: 2022 / 05 / 25
=====================================*/

import "./App.css";
import { Provider } from "react-redux";
import rootStore from "./redux/configureStore";
import Root from "./container/Root";

function App() {
    return (
        <Provider store={rootStore}>
            <Root />
        </Provider>
    );
}

export default App;
