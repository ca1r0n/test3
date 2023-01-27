import ReactDOM from 'react-dom/client'
import {App} from "./App";
import {Provider} from "react-redux";
import {StrictMode} from "react";
import {setupStore} from "./storage/store";


const store = setupStore()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)
