// @ts-ignore
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider, Title, Meta, Link } from "@solidjs/meta";
import "./app.css";

export default function App() {
    return (
        <Router base={import.meta.env.BASE_URL} root={props => (
            <MetaProvider>
                <Title>You</Title>
                <Meta charset="utf-8" />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />
                <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <Link rel="stylesheet" href="https://fonts.font.im/css?family=Permanent+Marker|Righteous|Roboto" />

                <Suspense>
                    {props.children}
                </Suspense>
            </MetaProvider>
        )}>
            <FileRoutes />
        </Router>
    );
}
