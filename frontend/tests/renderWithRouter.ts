import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {ReactElement} from "react";

const renderWithRouter = (ui: ReactElement, {route = '/'} = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
        ...render(ui, {wrapper: BrowserRouter}),
    }
}

export default renderWithRouter;