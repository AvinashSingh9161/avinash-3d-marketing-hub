
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FallbackRobot3DProps {
  direction: { x: number };
  isWalking: boolean;
}

export const FallbackRobot3D = ({ direction, isWalking }: FallbackRobot3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const walkingRef = useRef<number>(0);

  useFrame((state) => {
    if (groupRef.current) {
      // Handle rotation based on direction
      groupRef.current.rotation.y = direction.x > 0 ? 0 : Math.PI;
      
      // Simple walking animation
      if (isWalking) {
        walkingRef.current += 0.1;
        groupRef.current.position.y = Math.sin(walkingRef.current) * 0.05;
        groupRef.current.rotation.z = Math.sin(walkingRef.current * 2) * 0.05;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Robot Head */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.1, 0.85, 0.21]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.1, 0.85, 0.21]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.3]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.4, 0.4, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      <mesh position={[0.4, 0.4, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.15, -0.3, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      <mesh position={[0.15, -0.3, 0]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.15, -0.65, 0.1]}>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[0.15, -0.65, 0.1]}>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
    </group>
  );
};
