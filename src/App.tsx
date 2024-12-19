import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import { sheet } from "./theatre/project";
import { Mesh } from "three";
import "./App.css";

const RotatingBox: React.FC = () => {
    const boxRef = useRef<Mesh>(null!);

    // Animate rotation using useFrame
    useFrame(() => {
        if (boxRef.current) {
            boxRef.current.rotation.x += 0.01;
            boxRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={boxRef} position={[0, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="lightblue" />
        </mesh>
    );
};

export default function App() {
    const [studioVisible, setStudioVisible] = useState(false);
    const [studioInitialized, setStudioInitialized] = useState(false);

    // Initialize Theatre.js Studio only once
    useEffect(() => {
        const loadTheatreStudio = async () => {
            const studio = (await import("@theatre/studio")).default;
            const extension = (await import("@theatre/r3f/dist/extension"))
                .default;

            studio.initialize();
            studio.extend(extension);

            studio.ui.hide(); // Hide studio UI on startup
            setStudioInitialized(true);
            console.log("Theatre.js Studio Initialized and Hidden");
        };

        loadTheatreStudio();
    }, []);

    // Toggle Studio UI visibility
    const toggleStudioUI = async () => {
        if (studioInitialized) {
            const studio = (await import("@theatre/studio")).default;
            if (studioVisible) {
                studio.ui.hide(); // Hide the Theatre.js UI
            } else {
                studio.ui.restore(); // Show the Theatre.js UI
            }
            setStudioVisible(!studioVisible);
        }
    };

    return (
        <>
            {/* Button to toggle Theatre.js Studio visibility */}
            <div
                style={{
                    position: "absolute",
                    bottom: "10px", // Bottom-right position
                    right: "10px",
                    zIndex: 10,
                }}
            >
                <button
                    onClick={toggleStudioUI}
                    className="px-4 py-2 rounded-md text-white font-medium shadow-md transition-colors duration-300 ease-in-out"
                    style={{
                        backgroundColor: studioVisible ? "#FF5733" : "#3498DB",
                    }}
                >
                    {studioVisible
                        ? "Hide Theatre Studio"
                        : "Show Theatre Studio"}
                </button>
            </div>

            {/* 3D Scene */}
            <Canvas>
                <SheetProvider sheet={sheet}>
                    <PerspectiveCamera
                        theatreKey="Camera"
                        makeDefault
                        position={[0, 0, 5]} // Camera closer to cube
                        fov={75}
                    />
                    <e.ambientLight theatreKey="AmbientLight" intensity={0.5} />
                    <e.pointLight
                        theatreKey="PointLight"
                        position={[10, 10, 10]}
                    />
                    <RotatingBox />
                    <OrbitControls />
                </SheetProvider>
            </Canvas>
        </>
    );
}
