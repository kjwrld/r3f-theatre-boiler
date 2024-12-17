import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { editable as e } from "@theatre/r3f";

const RotatingCartoonCube: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null!);

    // Slowly rotate the cube
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2;
            groupRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <e.group ref={groupRef} theatreKey="CartoonCube">
            {/* The main cube */}
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshToonMaterial color="blue" />
            </mesh>

            {/* The outline cube (slightly larger, inverted faces) */}
            <mesh scale={[1.05, 1.05, 1.05]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="black" side={THREE.BackSide} />
            </mesh>
        </e.group>
    );
};

export default RotatingCartoonCube;
