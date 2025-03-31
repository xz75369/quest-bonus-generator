
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
  const characterRef = useRef<THREE.Group | null>(null);
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
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create Nezha character
    const character = createNezhaCharacter();
    characterRef.current = character;
    initialY.current = character.position.y;
    scene.add(character);
    
    // Animation function
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !characterRef.current) return;
      
      frameIdRef.current = requestAnimationFrame(animate);
      
      // Rotate character slightly
      characterRef.current.rotation.y += 0.01;
      
      // Float animation when moving
      if (isMoving) {
        const elapsedTime = (Date.now() - startTime.current) / 1000;
        characterRef.current.position.y = initialY.current + Math.sin(elapsedTime * 3) * 0.2;
        
        // Add some movement to arms when moving
        const arms = characterRef.current.children.filter(child => 
          child.name === "leftArm" || child.name === "rightArm");
        
        arms.forEach((arm, index) => {
          const offset = index === 0 ? 0 : Math.PI; // opposite movement for each arm
          arm.rotation.x = Math.sin(elapsedTime * 5 + offset) * 0.3;
        });
        
        // Add some movement to legs when moving
        const legs = characterRef.current.children.filter(child => 
          child.name === "leftLeg" || child.name === "rightLeg");
        
        legs.forEach((leg, index) => {
          const offset = index === 0 ? 0 : Math.PI; // opposite movement for each leg
          leg.rotation.x = Math.sin(elapsedTime * 5 + offset) * 0.3;
        });
      } else {
        characterRef.current.position.y = initialY.current;
        
        // Reset arm and leg positions when not moving
        characterRef.current.children.forEach(child => {
          if (["leftArm", "rightArm", "leftLeg", "rightLeg"].includes(child.name)) {
            child.rotation.x = 0;
          }
        });
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
      
      // Dispose of geometries and materials
      if (characterRef.current) {
        characterRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            } else if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            }
          }
        });
      }
    };
  }, [isMoving]);
  
  // Function to create Nezha character
  const createNezhaCharacter = () => {
    const group = new THREE.Group();
    
    // Material for skin
    const skinMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffdbac, 
      shininess: 30
    });
    
    // Material for clothes - red for Nezha
    const clothesMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff4d4d, 
      shininess: 10 
    });
    
    // Material for hair - black for Nezha
    const hairMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x090909, 
      shininess: 30 
    });
    
    // Create head
    const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.position.y = 1.5;
    head.name = "head";
    
    // Create hair - Nezha's characteristic bunched hair
    const hairGeometry = new THREE.SphereGeometry(0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.rotation.x = Math.PI;
    hair.position.y = 1.5;
    hair.name = "hair";
    
    // Create bun for the top of head
    const bunGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const bun = new THREE.Mesh(bunGeometry, hairMaterial);
    bun.position.y = 1.9;
    bun.name = "bun";
    
    // Create body
    const bodyGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.8, 32);
    const body = new THREE.Mesh(bodyGeometry, clothesMaterial);
    body.position.y = 0.9;
    body.name = "body";
    
    // Create arms
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6, 16);
    
    const leftArm = new THREE.Mesh(armGeometry, skinMaterial);
    leftArm.position.set(-0.35, 1.1, 0);
    leftArm.rotation.z = Math.PI / 3;
    leftArm.name = "leftArm";
    
    const rightArm = new THREE.Mesh(armGeometry, skinMaterial);
    rightArm.position.set(0.35, 1.1, 0);
    rightArm.rotation.z = -Math.PI / 3;
    rightArm.name = "rightArm";
    
    // Create legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6, 16);
    
    const leftLeg = new THREE.Mesh(legGeometry, skinMaterial);
    leftLeg.position.set(-0.15, 0.3, 0);
    leftLeg.name = "leftLeg";
    
    const rightLeg = new THREE.Mesh(legGeometry, skinMaterial);
    rightLeg.position.set(0.15, 0.3, 0);
    rightLeg.name = "rightLeg";
    
    // Create a simple fire-wheel (one of Nezha's iconic items)
    const wheelGeometry = new THREE.TorusGeometry(0.2, 0.03, 16, 32);
    const wheelMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffd700,
      emissive: 0xff4000,
      emissiveIntensity: 0.5,
      shininess: 100 
    });
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.position.set(0, 0, -0.3);
    wheel.rotation.y = Math.PI / 2;
    wheel.name = "wheel";
    
    // Add all parts to the group
    group.add(head);
    group.add(hair);
    group.add(bun);
    group.add(body);
    group.add(leftArm);
    group.add(rightArm);
    group.add(leftLeg);
    group.add(rightLeg);
    group.add(wheel);
    
    // Scale down the character
    group.scale.set(0.5, 0.5, 0.5);
    
    return group;
  };
  
  return (
    <div className={`absolute bottom-28 left-1/2 transform -translate-x-1/2`} ref={containerRef}></div>
  );
};

export default GameCharacter;
