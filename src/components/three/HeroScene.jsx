import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroScene = ({ className = '' }) => {
  const mountRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect WebGL capability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xF25C22, 0.7);
    dirLight2.position.set(-10, -5, -5);
    scene.add(dirLight2);

    // 3. Materials
    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xF25C22,
      roughness: 0.25,
      metalness: 0.15
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1A1A1A,
      roughness: 0.35,
      metalness: 0.1
    });

    const lightMat = new THREE.MeshStandardMaterial({
      color: 0xEDEDEA,
      roughness: 0.4,
      metalness: 0.05
    });

    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xF25C22,
      transparent: true,
      opacity: 0.45
    });

    // 4. Group for geometric blocks representing "BUILDING DIGITAL IDENTITY"
    const group = new THREE.Group();
    scene.add(group);

    // Main central isometric block (analogous to the BUILTD brand mark)
    const centralGeo = new THREE.BoxGeometry(2.8, 2.8, 2.8);
    const centralMesh = new THREE.Mesh(centralGeo, orangeMat);
    centralMesh.position.set(0, 0, 0);
    group.add(centralMesh);

    // Wireframe cage around central block
    const wireGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(3.6, 3.6, 3.6));
    const wireMesh = new THREE.LineSegments(wireGeo, wireframeMat);
    group.add(wireMesh);

    // Surrounding architectural blocks
    const block1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.2, 1.6), darkMat);
    block1.position.set(-3.2, -1.2, 1.2);
    group.add(block1);

    const block2 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 1.8), lightMat);
    block2.position.set(3.4, 1.5, -1.0);
    group.add(block2);

    const block3 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 2.4), lightMat);
    block3.position.set(2.4, -2.2, 1.5);
    group.add(block3);

    const block4 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.0, 1.2), orangeMat);
    block4.position.set(-2.5, 2.4, -1.5);
    group.add(block4);

    // 5. Subtle Floating Particles
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 22;
      positions[i + 1] = (Math.random() - 0.5) * 22;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x999999,
      size: 0.12,
      transparent: true,
      opacity: 0.55
    });
    const particles = new THREE.Points(particleGeometry, particleMat);
    scene.add(particles);

    // 6. Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.35;
      targetY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        const elapsedTime = clock.getElapsedTime();

        // Smooth damping towards mouse position
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        // Gentle constant rotation + mouse tilt
        group.rotation.y = elapsedTime * 0.22 + currentX;
        group.rotation.x = 0.35 + Math.sin(elapsedTime * 0.4) * 0.08 - currentY;
        group.rotation.z = Math.cos(elapsedTime * 0.3) * 0.04;

        // Subtle oscillation of wireframe
        wireMesh.rotation.y = -elapsedTime * 0.15;
        wireMesh.rotation.x = elapsedTime * 0.1;

        // Slow particle drift
        particles.rotation.y = elapsedTime * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div 
        className={`hero-scene-fallback ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          background: 'radial-gradient(circle, rgba(242,92,34,0.06) 0%, transparent 70%)'
        }}
      >
        <div style={{
          width: '160px',
          height: '160px',
          border: '2px solid rgba(242,92,34,0.3)',
          transform: 'rotate(45deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'var(--brand-orange)',
            opacity: 0.85
          }} />
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className={`hero-three-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        pointerEvents: 'none', // Prevents capturing clicks over UI
        overflow: 'hidden'
      }}
      aria-hidden="true"
    />
  );
};

export default HeroScene;
