import { onMount, onCleanup } from "solid-js";
import { Title } from "@solidjs/meta";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Section from "../components/Section";
import CustomCursor from "../components/CustomCursor";
import Blob from "../components/Blob";

gsap.registerPlugin(ScrollTrigger);

// 每个 section 的颜色组 [start, middle, end]
const COLORS = {
    brave: ["#ff6b6b", "#ee5a24", "#c0392b"],
    kind: ["#ffe66d", "#f8b739", "#ffa502"],
    honest: ["#74b9ff", "#0984e3", "#1e3a5f"],
    empathic: ["#dfe6e9", "#636e72", "#2d3436"],
    resilient: ["#55efc4", "#00b894", "#016a4e"],
    humble: ["#fd79a8", "#e84393", "#833471"],
    hopeful: ["#ffeaa7", "#f39c12", "#d68910"],
    curious: ["#81ecec", "#00cec9", "#0a6b68"],
    you: ["#a29bfe", "#6c5ce7", "#341f97"]
};

// Unique border-radius shapes for each section
const SHAPES = {
    brave: "70% 30% 30% 70% / 60% 40% 60% 40%",     // sharp, angular
    kind: "40% 60% 60% 40% / 50% 50% 50% 50%",       // soft, rounded
    honest: "50% 50% 50% 50% / 50% 50% 50% 50%",     // perfect circle
    empathic: "30% 70% 70% 30% / 30% 30% 70% 70%",   // organic flow
    resilient: "60% 40% 30% 70% / 70% 30% 40% 60%",  // irregular strength
    humble: "45% 55% 50% 50% / 55% 45% 55% 45%",     // subtle, modest
    hopeful: "35% 65% 55% 45% / 45% 55% 65% 35%",    // upward reaching
    curious: "55% 45% 40% 60% / 40% 60% 55% 45%",    // exploratory, open
    you: "50% 50% 50% 50% / 50% 50% 50% 50%"         // centered, complete
};

export default function Home() {
    let containerRef: HTMLDivElement | undefined;
    let lenis: Lenis | undefined;

    onMount(() => {
        if (typeof window === "undefined") return;

        // 初始化 Lenis 平滑滚动
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        // 让 GSAP ScrollTrigger 与 Lenis 同步
        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis?.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        const blob1 = document.getElementById("blob-1");
        const stop0 = document.getElementById("heart-stop-0");
        const stop1 = document.getElementById("heart-stop-1");
        const stop2 = document.getElementById("heart-stop-2");

        if (!blob1 || !stop0 || !stop1 || !stop2) {
            console.warn("Blob or gradient stops not found!");
            return;
        }

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Initial position and colors
        gsap.set(blob1, {
            xPercent: -50,
            yPercent: -50,
            x: vw * 0.45,
            y: vh * 0.3,
            scale: 0.9
        });
        gsap.set(stop0, { attr: { "stop-color": COLORS.brave[0] } });
        gsap.set(stop1, { attr: { "stop-color": COLORS.brave[1] } });
        gsap.set(stop2, { attr: { "stop-color": COLORS.brave[2] } });

        // Scrubbed timeline - 8 sections (7 virtues + You)
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.2,
            }
        });

        scrollTl
            // Brave section
            .to(blob1, { x: vw * 0.5, y: vh * 0.5, scale: 1, ease: "sine.inOut", duration: 0.12 }, 0)
            .to(stop0, { attr: { "stop-color": COLORS.brave[0] }, duration: 0.12 }, 0)
            .to(stop1, { attr: { "stop-color": COLORS.brave[1] }, duration: 0.12 }, 0)
            .to(stop2, { attr: { "stop-color": COLORS.brave[2] }, duration: 0.12 }, 0)
            // Kind section
            .to(blob1, { x: vw * 0.55, y: vh * 0.45, scale: 0.95, ease: "sine.inOut", duration: 0.12 })
            .to(stop0, { attr: { "stop-color": COLORS.kind[0] }, duration: 0.12 }, "<")
            .to(stop1, { attr: { "stop-color": COLORS.kind[1] }, duration: 0.12 }, "<")
            .to(stop2, { attr: { "stop-color": COLORS.kind[2] }, duration: 0.12 }, "<")
            // Honest section
            .to(blob1, { x: vw * 0.5, y: vh * 0.5, scale: 1.05, ease: "sine.inOut", duration: 0.12 })
            .to(stop0, { attr: { "stop-color": COLORS.honest[0] }, duration: 0.12 }, "<")
            .to(stop1, { attr: { "stop-color": COLORS.honest[1] }, duration: 0.12 }, "<")
            .to(stop2, { attr: { "stop-color": COLORS.honest[2] }, duration: 0.12 }, "<")
            // Empathic section
            .to(blob1, { x: vw * 0.45, y: vh * 0.55, scale: 1, ease: "sine.inOut", duration: 0.12 })
            .to(stop0, { attr: { "stop-color": COLORS.empathic[0] }, duration: 0.12 }, "<")
            .to(stop1, { attr: { "stop-color": COLORS.empathic[1] }, duration: 0.12 }, "<")
            .to(stop2, { attr: { "stop-color": COLORS.empathic[2] }, duration: 0.12 }, "<")
            // Resilient section
            .to(blob1, { x: vw * 0.5, y: vh * 0.5, scale: 1.1, ease: "sine.inOut", duration: 0.12 })
            .to(stop0, { attr: { "stop-color": COLORS.resilient[0] }, duration: 0.12 }, "<")
            .to(stop1, { attr: { "stop-color": COLORS.resilient[1] }, duration: 0.12 }, "<")
            .to(stop2, { attr: { "stop-color": COLORS.resilient[2] }, duration: 0.12 }, "<")
            // Humble section
            .to(blob1, { x: vw * 0.52, y: vh * 0.48, scale: 1, ease: "sine.inOut", duration: 0.12 })
            .to(stop0, { attr: { "stop-color": COLORS.humble[0] }, duration: 0.12 }, "<")
            .to(stop1, { attr: { "stop-color": COLORS.humble[1] }, duration: 0.12 }, "<")
            .to(stop2, { attr: { "stop-color": COLORS.humble[2] }, duration: 0.12 }, "<")
            // Hopeful section
            .to(blob1, { x: vw * 0.5, y: vh * 0.5, scale: 1.05, ease: "sine.inOut", duration: 0.12 })
            .to(stop0, { attr: { "stop-color": COLORS.hopeful[0] }, duration: 0.12 }, "<")
            .to(stop1, { attr: { "stop-color": COLORS.hopeful[1] }, duration: 0.12 }, "<")
            .to(stop2, { attr: { "stop-color": COLORS.hopeful[2] }, duration: 0.12 }, "<")
            // Curious section
            .to(blob1, { x: vw * 0.48, y: vh * 0.52, scale: 1.08, ease: "sine.inOut", duration: 0.12 })
            .to(stop0, { attr: { "stop-color": COLORS.curious[0] }, duration: 0.12 }, "<")
            .to(stop1, { attr: { "stop-color": COLORS.curious[1] }, duration: 0.12 }, "<")
            .to(stop2, { attr: { "stop-color": COLORS.curious[2] }, duration: 0.12 }, "<")
            // You section
            .to(blob1, { x: vw * 0.5, y: vh * 0.5, scale: 1.4, ease: "sine.inOut", duration: 0.16 })
            .to(stop0, { attr: { "stop-color": COLORS.you[0] }, duration: 0.16 }, "<")
            .to(stop1, { attr: { "stop-color": COLORS.you[1] }, duration: 0.16 }, "<")
            .to(stop2, { attr: { "stop-color": COLORS.you[2] }, duration: 0.16 }, "<");

        // Cursor rotation
        gsap.to(".cursor-arrow", {
            rotation: 360 * 3,
            scrollTrigger: {
                trigger: containerRef,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5
            }
        });
    });

    // 清理 Lenis 实例
    onCleanup(() => {
        lenis?.destroy();
    });

    return (
        <main ref={containerRef} class="relative min-h-[800vh] bg-white">

            <CustomCursor />

            {/* Floating Blob - Fixed position, large, flowing gradient */}
            <div class="fixed inset-0 pointer-events-none overflow-hidden z-10">
                <Blob id="blob-1" class="w-[400px] h-[400px] md:w-[500px] md:h-[500px]" />
            </div>

            {/* Content */}
            <div class="relative z-20 w-full">
                <Section id="brave" title="Brave" class="section-item">
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">Forward motion,</p>
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">chosen</p>
                    <p class="text-xl md:text-2xl font-light text-neutral-600">within uncertainty.</p>
                </Section>

                <Section id="kind" title="Kind" class="section-item">
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">An offering,</p>
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">extended freely,</p>
                    <p class="text-xl md:text-2xl font-light text-neutral-600">without claim or return.</p>
                </Section>

                <Section id="honest" title="Honest" class="section-item">
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">Alignment</p>
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">with what is present,</p>
                    <p class="text-xl md:text-2xl font-light text-neutral-600">without ornament.</p>
                </Section>

                <Section id="empathic" title="Empathic" class="section-item">
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">Attention</p>
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">moving outward,</p>
                    <p class="text-xl md:text-2xl font-light text-neutral-600">crossing the boundary of self.</p>
                </Section>

                <Section id="resilient" title="Resilient" class="section-item">
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">Endurance</p>
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">through fracture and change,</p>
                    <p class="text-xl md:text-2xl font-light text-neutral-600">remaining.</p>
                </Section>

                <Section id="humble" title="Humble" class="section-item">
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">Awareness</p>
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">of scale and limitation,</p>
                    <p class="text-xl md:text-2xl font-light text-neutral-600">held with care.</p>
                </Section>

                <Section id="hopeful" title="Hopeful" class="section-item">
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">Light</p>
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">assumed to continue,</p>
                    <p class="text-xl md:text-2xl font-light text-neutral-600">even without proof.</p>
                </Section>

                <Section id="curious" title="Curious" class="section-item">
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">A question</p>
                    <p class="mb-2 text-xl md:text-2xl font-light text-neutral-600">resting at the edge of the known,</p>
                    <p class="text-xl md:text-2xl font-light text-neutral-600">waiting to bloom.</p>
                </Section>

                {/* "You" Section - Full page like other sections */}
                <section id="you" class="min-h-screen w-full flex flex-col justify-center items-center p-8 relative">
                    <h2 class="text-7xl md:text-8xl font-marker tracking-tight text-black/90">You</h2>
                </section>

                {/* Footer - Horizontal layout, not a separate section */}
                <footer class="w-full py-8 px-8 md:px-12 border-t border-neutral-200">
                    <div class="max-w-6xl mx-auto flex items-center justify-between">
                        <p class="text-xl md:text-2xl font-righteous text-black/80">Humanity</p>
                        <p class="text-lg md:text-xl font-righteous text-neutral-600">Roxi.dev</p>
                    </div>
                </footer>
            </div>
        </main>
    );
}
