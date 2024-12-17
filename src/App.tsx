import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import { sheet } from "./theatre/project";
import RotatingCartoonCube from "./components/RotatingCartoonCube";
import "./App.css";

export default function App() {
    return (
        <>
            <Canvas>
                <SheetProvider sheet={sheet}>
                    {/* Editable camera */}
                    <PerspectiveCamera
                        theatreKey="Camera"
                        makeDefault
                        position={[0, 0, 10]}
                        fov={75}
                    />

                    {/* Lights */}
                    <e.ambientLight theatreKey="AmbientLight" intensity={0.5} />
                    <e.pointLight
                        theatreKey="PointLight"
                        position={[10, 10, 10]}
                    />

                    {/* Our rotating cartoon-shaded cube */}
                    <RotatingCartoonCube />

                    <OrbitControls />
                </SheetProvider>
            </Canvas>
        </>
    );
}
