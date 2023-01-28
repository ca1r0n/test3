import "./App.scss"
import {TopBar} from "./components/sections/top-bar/TopBar";
import {Content} from "./components/sections/content/Content";
import {Notify} from "./components/sections/notify/Notify";
export function App() {
    return <>
        <TopBar />
        <Content />
        <Notify />
    </>
}