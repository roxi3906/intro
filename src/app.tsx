// @ts-ignore
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider, Title, Meta, Link } from "@solidjs/meta";
import "./app.css";

export default function App() {
    return (
        <Router root={props => (
            <MetaProvider>
                <Title>Roxi Intro</Title>
                <Meta charset="utf-8" />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />

                <Suspense>
                    {props.children}
                </Suspense>
            </MetaProvider>
        )}>
            <FileRoutes />
        </Router>
    );
}
