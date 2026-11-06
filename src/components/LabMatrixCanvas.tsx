import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LabMatrixCanvasProps {
  activeArea?: string;
}

export const LabMatrixCanvas: React.FC<LabMatrixCanvasProps> = ({ activeArea }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- WebGL Capability Check ---
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.8);

    // --- Renderer Configuration (Performance Budget) ---
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- Central Core: Multi-layered Wireframe & Solid Icosahedron ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner dark core
    const innerGeom = new THREE.IcosahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.18,
      metalness: 0.94,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerMesh);

    // Outer wireframe shell
    const wireGeom = new THREE.IcosahedronGeometry(1.5, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });
    const wireMesh = new THREE.Mesh(wireGeom, wireMat);
    coreGroup.add(wireMesh);

    // Surrounding orbital nodes
    const nodeCount = 12;
    const nodeGeom = new THREE.SphereGeometry(0.06, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
    const nodes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.4;
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.4, Math.sin(angle) * radius * 0.8);
      coreGroup.add(node);
      nodes.push(node);
    }

    // Outer concentric thin ring
    const ringGeom = new THREE.RingGeometry(2.38, 2.42, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 2.8;
    coreGroup.add(ringMesh);

    // --- Particle field ---
    const particleCount = 160;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 10;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // --- Restrained Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 3.2);
    dirLight1.position.set(5, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 2.4);
    dirLight2.position.set(-5, -3, 2);
    scene.add(dirLight2);

    // --- Pointer Tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // --- Visibility Throttling (Rule 6) ---
    let isIntersecting = true;
    let isTabVisible = !document.hidden;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => (isIntersecting = e.isIntersecting));
    });
    observer.observe(container);

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // --- Resize ---
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // --- Render Loop ---
    let frameId: number;
    let lastTime = performance.now();
    let totalElapsedTime = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Freeze rendering when offscreen or tab hidden (Rule 6)
      if (!isIntersecting || !isTabVisible) {
        lastTime = performance.now();
        return;
      }

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      totalElapsedTime += delta;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (!prefersReducedMotion) {
        coreGroup.rotation.y = totalElapsedTime * 0.2 + mouse.x * 0.4;
        coreGroup.rotation.x = totalElapsedTime * 0.12 + mouse.y * 0.3;
        wireMesh.rotation.y = -totalElapsedTime * 0.15;
        particles.rotation.y = totalElapsedTime * 0.02;

        // Pulse orbital nodes slightly
        nodes.forEach((n, idx) => {
          const s = 1 + Math.sin(totalElapsedTime * 2 + idx) * 0.2;
          n.scale.set(s, s, s);
        });
      } else {
        coreGroup.rotation.y = mouse.x * 0.2;
        coreGroup.rotation.x = mouse.y * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);

      innerGeom.dispose();
      innerMat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [activeArea]);

  if (!webglSupported) {
    return (
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50 bg-gradient-to-tr from-cyan-950/20 via-purple-950/15 to-transparent rounded-[2.5rem]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-65"
      aria-hidden="true"
    />
  );
};
