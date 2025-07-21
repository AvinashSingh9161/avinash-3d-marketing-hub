import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface Robot3DProps {
  modelPath?: string;
  direction: { x: number };
  isWalking: boolean;
  scale?: number;
}

export const Robot3D = ({ 
  modelPath = '/robot.glb', 
  direction, 
  isWalking, 
  scale = 1 
}: Robot3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const walkingRef = useRef<number>(0);
  
  // Load GLB model
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, groupRef);
  
  // Handle animations
  useEffect(() => {
    if (actions && names.length > 0) {
      // Stop all animations first
      Object.values(actions).forEach(action => action?.stop());
      
      if (isWalking) {
        // Try to find walking animation by common names
        const walkAction = actions.walk || 
                          actions.Walk || 
                          actions.running || 
                          actions.Run ||
                          actions.walking ||
                          actions.Walking ||
                          Object.values(actions)[0];
        if (walkAction) {
          walkAction.reset().fadeIn(0.5).play();
        }
      } else {
        // Try to find idle animation
        const idleAction = actions.idle || 
                          actions.Idle || 
                          actions.default ||
                          actions.Default ||
                          Object.values(actions)[0];
        if (idleAction) {
          idleAction.reset().fadeIn(0.5).play();
        }
      }
    }
  }, [actions, names, isWalking]);

  // Handle rotation and walking animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Handle rotation based on direction with smooth transition
      const targetRotation = direction.x > 0 ? 0 : Math.PI;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, 
        targetRotation, 
        delta * 5
      );
      
      // Add human-like walking animation
      if (isWalking) {
        walkingRef.current += delta * 8; // More natural speed
        
        // Subtle bobbing motion like human walking
        groupRef.current.position.y = Math.sin(walkingRef.current) * 0.015;
        
        // Slight forward lean when walking
        groupRef.current.rotation.x = Math.sin(walkingRef.current * 0.5) * 0.015;
        
        // Subtle side-to-side sway
        groupRef.current.rotation.z = Math.sin(walkingRef.current * 0.8) * 0.008;
      } else {
        // Smooth return to neutral position when not walking
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, delta * 3);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, delta * 3);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, delta * 3);
      }
    }
  });

  // Clone scene and setup materials
  const clonedScene = scene.clone();
  
  // Ensure proper material and shadow setup
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        // Ensure materials are properly set up
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            mat.side = THREE.FrontSide;
          });
        } else {
          child.material.side = THREE.FrontSide;
        }
      }
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -0.3, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Preload the model
useGLTF.preload('/robot.glb');