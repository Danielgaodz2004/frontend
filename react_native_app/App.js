import {Navigation} from "./screens/Navigation";
import {Provider} from "react-redux";
import { store } from './store/store'
import {Internalization} from "./screens/Internalization";

export default function App() {
    return (
        <Provider store={store}>
            <Internalization>
                <Navigation />
            </Internalization>
        </Provider>
    );
}

