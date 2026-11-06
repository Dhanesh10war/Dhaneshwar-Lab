import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const SpatialCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect reduced motion preference
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
    camera.position.set(0, 0, 7.5);

    // --- Renderer Configuration (Performance Budget) ---
    // Cap DPR to max 2 for performance on high-DPI screens
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- 3D Spatial Geometry: Center Ribbon Knot ---
    const knotGeometry = new THREE.TorusKnotGeometry(1.6, 0.38, 128, 32, 2, 3);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0x161b33,
      metalness: 0.92,
      roughness: 0.16,
      wireframe: false,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    scene.add(knotMesh);

    // Subtle outer halo ring for spatial depth
    const ringGeometry = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.22,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2.3;
    scene.add(ringMesh);

    // Secondary subtle counter-ring
    const ringGeometry2 = new THREE.TorusGeometry(3.1, 0.015, 16, 100);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.16,
    });
    const ringMesh2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ringMesh2.rotation.y = Math.PI / 3;
    scene.add(ringMesh2);

    // --- Constellation Particles ---
    const particleCount = 240;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Restrained Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const blueLight = new THREE.DirectionalLight(0x38bdf8, 3.2);
    blueLight.position.set(4, 5, 4);
    scene.add(blueLight);

    const purpleLight = new THREE.DirectionalLight(0xa855f7, 2.5);
    purpleLight.position.set(-4, -4, 3);
    scene.add(purpleLight);

    const cursorLight = new THREE.PointLight(0x60a5fa, 1.8, 8);
    scene.add(cursorLight);

    // --- Mouse & Pointer Tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // --- Visibility & Performance Throttling ---
    let isIntersecting = true;
    let isTabVisible = !document.hidden;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // --- Resize Handler ---
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    let lastTime = performance.now();
    let totalElapsedTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Pause rendering when canvas is offscreen or tab is hidden (Rule 6)
      if (!isIntersecting || !isTabVisible) {
        lastTime = performance.now();
        return;
      }

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      totalElapsedTime += delta;

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Update cursor light in world space
      cursorLight.position.set(mouse.x * 3.5, mouse.y * 2.5, 3);

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        knotMesh.rotation.x = totalElapsedTime * 0.18 + mouse.y * 0.35;
        knotMesh.rotation.y = totalElapsedTime * 0.28 + mouse.x * 0.45;

        ringMesh.rotation.z = -totalElapsedTime * 0.08;
        ringMesh2.rotation.z = totalElapsedTime * 0.06;

        particles.rotation.y = totalElapsedTime * 0.04;
      } else {
        // Subtle tilt only for reduced-motion users
        knotMesh.rotation.x = mouse.y * 0.15;
        knotMesh.rotation.y = mouse.x * 0.2;
      }

      // Gentle camera parallax
      camera.position.x = mouse.x * 0.35;
      camera.position.y = mouse.y * 0.25;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup & Disposal ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);

      knotGeometry.dispose();
      knotMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!webglSupported) {
    // Static fallback for low-power devices and environments without WebGL
    return (
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-60 bg-gradient-to-tr from-blue-950/20 via-purple-950/10 to-transparent"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-75"
      aria-hidden="true"
    />
  );
};
