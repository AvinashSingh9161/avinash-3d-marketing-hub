
import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface Robot3DProps {
  modelPath?: string;
  direction: { x: number };
  isWalking: boolean;
  scale?: number;
}

export const Robot3D = ({ 
  modelPath = '/models/robot.glb', 
  direction, 
  isWalking, 
  scale = 1 
}: Robot3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useLoader(GLTFLoader, modelPath);
  const { actions } = useAnimations(animations, groupRef);
  
  // Handle animations
  useEffect(() => {
    if (actions) {
      // Stop all animations first
      Object.values(actions).forEach(action => action?.stop());
      
      if (isWalking && actions.walk) {
        actions.walk.play();
      } else if (actions.idle) {
        actions.idle.play();
      }
    }
  }, [actions, isWalking]);

  // Handle rotation based on direction
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = direction.x > 0 ? 0 : Math.PI;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <primitive object={scene} />
    </group>
  );
};
