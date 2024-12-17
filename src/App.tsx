import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import { sheet } from "./theatre/project";
import "./App.css";

export default function App() {
    return (
        <Canvas>
            {/* Provide the sheet to all descendants */}
            <SheetProvider sheet={sheet}>
                {/* A default camera that is editable */}
                <PerspectiveCamera
                    theatreKey="Camera"
                    makeDefault
                    position={[0, 0, 10]}
                    fov={75}
                />
                {/* Some lights */}
                <e.ambientLight theatreKey="AmbientLight" intensity={0.5} />
                <e.pointLight theatreKey="PointLight" position={[10, 10, 10]} />

                {/* A simple editable mesh */}
                <e.mesh theatreKey="Box" position={[0, 0, 0]}>
                    <boxGeometry />
                    <meshStandardMaterial color="blue" />
                </e.mesh>

                {/* Orbit controls */}
                <OrbitControls />
            </SheetProvider>
        </Canvas>
    );
}
