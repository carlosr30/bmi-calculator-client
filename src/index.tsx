import App from "./App"
import React from "react"
import ReactDOM from "react-dom/client"
import { bootstrapAxios } from "./services/bootstrappers/axios"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

bootstrapAxios()

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
