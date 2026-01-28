import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Toaster} from "@/components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App/>
        <Toaster
            position="bottom-right"
            expand={true}
            richColors
            theme="light"
            toastOptions={{
                style: {
                    fontWeight: 'normal',
                    fontFamily: 'var(--font-inter), sans-serif',
                },
            }}
        />
    </React.StrictMode>,
);
