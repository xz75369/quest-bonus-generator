
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface GameCharacterProps {
  isMoving: boolean;
}

const GameCharacter: React.FC<GameCharacterProps> = ({ isMoving }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const characterRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const initialY = useRef<number>(0);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    // Initialize the scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create character (a simple geometric shape for now)
    const geometry = new THREE.ConeGeometry(1, 2, 4);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x6b46c1, // Purple color
      shininess: 100,
      flatShading: true
    });
    
    const character = new THREE.Mesh(geometry, material);
    characterRef.current = character;
    initialY.current = character.position.y;
    scene.add(character);
    
    // Animation function
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !characterRef.current) return;
      
      frameIdRef.current = requestAnimationFrame(animate);
      
      // Rotate character
      characterRef.current.rotation.y += 0.01;
      
      // Float animation when moving
      if (isMoving) {
        const elapsedTime = (Date.now() - startTime.current) / 1000;
        characterRef.current.position.y = initialY.current + Math.sin(elapsedTime * 2) * 0.2;
      } else {
        characterRef.current.position.y = initialY.current;
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of geometry and material
      if (characterRef.current) {
        characterRef.current.geometry.dispose();
        (characterRef.current.material as THREE.Material).dispose();
      }
    };
  }, [isMoving]);
  
  return (
    <div className={`absolute bottom-28 left-1/2 transform -translate-x-1/2`} ref={containerRef}></div>
  );
};

export default GameCharacter;
