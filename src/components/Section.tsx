import { ParentProps } from "solid-js";

interface SectionProps extends ParentProps {
    id: string;
    class?: string;
    title: string;
}

export default function Section(props: SectionProps) {
    return (
        <section
            id={props.id}
            class={`min-h-screen w-full flex flex-col justify-center p-8 relative overflow-hidden ${props.class}`}
        >
            <div class="relative z-10 max-w-4xl mx-auto text-center">
                <h2 class="text-6xl font-marker mb-8 tracking-tighter text-black/80">{props.title}</h2>
                <div class="text-xl text-black/60 font-roboto font-light leading-relaxed">
                    {props.children}
                </div>
            </div>
        </section>
    );
}
