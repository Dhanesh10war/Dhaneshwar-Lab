import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const PrismCanvas: React.FC = () => {
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

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.5);

    // Performance budget: cap DPR to max 2
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Dark crystalline octahedron
    const geom = new THREE.OctahedronGeometry(1.4, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x111625,
      metalness: 0.92,
      roughness: 0.16,
    });
    const prismMesh = new THREE.Mesh(geom, mat);
    group.add(prismMesh);

    // Glowing wireframe cage
    const wireGeom = new THREE.OctahedronGeometry(1.65, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const wireMesh = new THREE.Mesh(wireGeom, wireMat);
    group.add(wireMesh);

    // Ambient & Directional Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambient);

    const light1 = new THREE.DirectionalLight(0x38bdf8, 3.2);
    light1.position.set(4, 4, 3);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xc084fc, 2.4);
    light2.position.set(-4, -4, 2);
    scene.add(light2);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

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

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

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
        group.rotation.y = totalElapsedTime * 0.25 + mouse.x * 0.4;
        group.rotation.x = totalElapsedTime * 0.15 + mouse.y * 0.3;
        wireMesh.rotation.y = -totalElapsedTime * 0.2;
        group.position.y = Math.sin(totalElapsedTime * 1.5) * 0.12;
      } else {
        group.rotation.y = mouse.x * 0.2;
        group.rotation.x = mouse.y * 0.15;
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

      geom.dispose();
      mat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!webglSupported) {
    return (
      <div
        className="w-full h-[320px] relative pointer-events-none overflow-hidden opacity-60 my-4 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent rounded-2xl border border-white/[0.05]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] relative pointer-events-none overflow-hidden opacity-80 my-4"
      aria-hidden="true"
    />
  );
};
