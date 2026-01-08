import { onMount, onCleanup } from "solid-js";
import gsap from "gsap";

export default function CustomCursor() {
    let cursorRef: HTMLDivElement | undefined;

    onMount(() => {
        if (!cursorRef) return;

        // Initial hide
        gsap.set(cursorRef, { xPercent: -50, yPercent: -50, opacity: 0 });

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursorRef, {
                x: e.clientX,
                y: e.clientY,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", onMouseMove);

        onCleanup(() => {
            window.removeEventListener("mousemove", onMouseMove);
        });
    });

    return (
        <div
            ref={cursorRef}
            class="fixed top-0 left-0 w-12 h-12 pointer-events-none z-50 flex items-center justify-center mix-blend-difference text-white"
        >
            {/* Animated Ring */}
            <div class="absolute inset-0 border border-white/50 rounded-full"></div>

            {/* Arrow Icon */}
            <div class="cursor-arrow transform origin-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
            </div>
        </div>
    );
}
