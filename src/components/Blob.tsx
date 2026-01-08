import { ParentProps } from "solid-js";

interface BlobProps extends ParentProps {
    id?: string;
    class?: string;
}

export default function Blob(props: BlobProps) {
    return (
        <div
            id={props.id}
            class={`absolute pointer-events-none blob-container ${props.class}`}
        >
            {/* 心形使用 SVG 实现，带有软边缘模糊效果 */}
            <svg
                class="blob-inner w-full h-full animate-blob-float"
                viewBox="-15 -15 130 130"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: "visible" }}
            >
                <defs>
                    {/* 内部模糊滤镜 - 让心形边缘柔和 */}
                    <filter id="heart-blur" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                    </filter>
                    {/* 默认渐变 - 会被 GSAP 覆盖 */}
                    <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop id="heart-stop-0" offset="0%" stop-color="#ff6b6b" />
                        <stop id="heart-stop-1" offset="50%" stop-color="#ee5a24" />
                        <stop id="heart-stop-2" offset="100%" stop-color="#c0392b" />
                    </linearGradient>
                </defs>
                {/* 心形路径 - 经典心形曲线 */}
                <path
                    class="heart-path animate-heart-morph"
                    d="M50 92 C15 62, -5 35, 12 15 C30 -5, 50 10, 50 28 C50 10, 70 -5, 88 15 C105 35, 85 62, 50 92 Z"
                    fill="url(#heart-gradient)"
                    filter="url(#heart-blur)"
                    style={{ opacity: 0.9 }}
                />
            </svg>
            <style>
                {`
        @keyframes blob-float {
            0%, 100% { 
                transform: translateX(0) translateY(0); 
            }
            20% { 
                transform: translateX(12px) translateY(-8px); 
            }
            40% { 
                transform: translateX(-10px) translateY(6px); 
            }
            60% { 
                transform: translateX(8px) translateY(10px); 
            }
            80% { 
                transform: translateX(-6px) translateY(-5px); 
            }
        }
        
        @keyframes heart-morph {
            0%, 100% { 
                d: path("M50 92 C15 62, -5 35, 12 15 C30 -5, 50 10, 50 28 C50 10, 70 -5, 88 15 C105 35, 85 62, 50 92 Z");
                transform: scale(1) rotate(0deg);
            }
            25% { 
                d: path("M50 94 C13 64, -7 38, 10 17 C28 -3, 50 12, 50 30 C50 12, 72 -3, 90 17 C107 38, 87 64, 50 94 Z");
                transform: scale(1.03) rotate(2deg);
            }
            50% { 
                d: path("M50 90 C17 60, -3 33, 14 13 C32 -7, 50 8, 50 26 C50 8, 68 -7, 86 13 C103 33, 83 60, 50 90 Z");
                transform: scale(0.98) rotate(-1deg);
            }
            75% { 
                d: path("M50 93 C14 63, -6 36, 11 16 C29 -4, 50 11, 50 29 C50 11, 71 -4, 89 16 C106 36, 86 63, 50 93 Z");
                transform: scale(1.02) rotate(1deg);
            }
        }
        
        .animate-blob-float {
            animation: blob-float 8s infinite ease-in-out;
        }
        
        .animate-heart-morph {
            animation: heart-morph 6s infinite ease-in-out;
        }
        `}
            </style>
        </div>
    );
}
