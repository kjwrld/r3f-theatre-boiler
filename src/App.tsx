import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import { sheet } from "./theatre/project";
import "./App.css";

const RotatingBox: React.FC = () => {
    const boxRef = useRef<THREE.Mesh>(null!);

    // Animate rotation using useFrame
    useFrame(() => {
        if (boxRef.current) {
            boxRef.current.rotation.x += 0.01; // Increment rotation on X-axis
            boxRef.current.rotation.y += 0.01; // Increment rotation on Y-axis
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
    return (
        <Canvas>
            {/* Provide the sheet to all descendants */}
            <SheetProvider sheet={sheet}>
                {/* A default camera */}
                <PerspectiveCamera
                    theatreKey="Camera"
                    makeDefault
                    position={[0, 0, 10]}
                    fov={75}
                />

                {/* Lights */}
                <e.ambientLight theatreKey="AmbientLight" intensity={0.5} />
                <e.pointLight theatreKey="PointLight" position={[10, 10, 10]} />

                {/* Rotating Box */}
                <RotatingBox />

                {/* Orbit controls */}
                <OrbitControls />
            </SheetProvider>
        </Canvas>
    );
}
