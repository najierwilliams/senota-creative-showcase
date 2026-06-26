/**
 * 3D Earth Globe Component using Three.js
 * Features: Auto-rotation, hover-to-pause, draggable, threat markers with expandable stickers
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreatMarker {
  id: number;
  lat: number;
  lng: number;
  city: string;
  content: string;
  platform: string;
  date: string;
  confidence: number;
  status: string;
}

interface ThreeDGlobeProps {
  markers: ThreatMarker[];
  onMarkerHover?: (markerId: number | null) => void;
}

export function ThreeDGlobe({ markers, onMarkerHover }: ThreeDGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedMarkerId, setExpandedMarkerId] = useState<number | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2.5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create Earth sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Create Earth texture using canvas
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Ocean blue
      ctx.fillStyle = "#1a3a52";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Land masses (simplified)
      ctx.fillStyle = "#2d5a3d";
      // North America
      ctx.fillRect(100, 300, 250, 200);
      // South America
      ctx.fillRect(200, 500, 150, 150);
      // Europe
      ctx.fillRect(600, 250, 150, 100);
      // Africa
      ctx.fillRect(700, 400, 200, 250);
      // Asia
      ctx.fillRect(900, 200, 400, 300);
      // Australia
      ctx.fillRect(1200, 550, 100, 80);

      // Add some gradient for depth
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(100, 150, 200, 0.1)");
      gradient.addColorStop(0.5, "rgba(50, 100, 150, 0)");
      gradient.addColorStop(1, "rgba(100, 150, 200, 0.1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      emissive: 0x1a1a2e,
      shininess: 5,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Create markers group
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);
    markersGroupRef.current = markersGroup;

    // Add threat markers
    markers.forEach((marker) => {
      const phi = ((90 - marker.lat) * Math.PI) / 180;
      const theta = ((marker.lng + 180) * Math.PI) / 180;

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);

      // Create marker (red dot)
      const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

      markerMesh.position.set(x, y, z);
      markerMesh.userData = { markerId: marker.id, isMarker: true };
      markersGroup.add(markerMesh);

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(0.04, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0.3,
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      glowMesh.position.copy(markerMesh.position);
      markersGroup.add(glowMesh);
    });

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      targetRotationRef.current.y += dx * 0.005;
      targetRotationRef.current.x += dy * 0.005;

      dragStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("mouseleave", onMouseUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Auto-rotate when not hovered
      if (!isHovered && !isDragging) {
        targetRotationRef.current.y += 0.0005;
      }

      // Smooth rotation
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.1;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.1;

      if (globeRef.current) {
        globeRef.current.rotation.x = rotationRef.current.x;
        globeRef.current.rotation.y = rotationRef.current.y;
      }

      if (markersGroupRef.current) {
        markersGroupRef.current.rotation.x = rotationRef.current.x;
        markersGroupRef.current.rotation.y = rotationRef.current.y;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("mouseleave", onMouseUp);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isHovered, isDragging]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        background: "linear-gradient(135deg, rgba(30,20,80,0.4), rgba(50,30,100,0.3))",
        border: "1px solid rgba(124,58,237,0.3)",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: isDragging ? "grabbing" : isHovered ? "grab" : "default",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setExpandedMarkerId(null);
      }}
    >
      {/* Threat markers overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {markers.map((marker) => {
          const isExpanded = expandedMarkerId === marker.id;

          return (
            <div
              key={marker.id}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "auto",
              }}
              onMouseEnter={() => {
                setExpandedMarkerId(marker.id);
                onMarkerHover?.(marker.id);
              }}
              onMouseLeave={() => {
                setExpandedMarkerId(null);
                onMarkerHover?.(null);
              }}
            >
              {/* Sticker */}
              <div
                style={{
                  position: "absolute",
                  left: "60px",
                  top: "-10px",
                  background: "rgba(20,10,50,0.95)",
                  border: "1px solid rgba(239,68,68,0.5)",
                  borderRadius: "8px",
                  padding: isExpanded ? "16px" : "8px 12px",
                  minWidth: isExpanded ? "280px" : "auto",
                  maxWidth: "300px",
                  backdropFilter: "blur(10px)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  zIndex: 20,
                  opacity: isExpanded ? 1 : 0.7,
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isExpanded ? "12px" : "10px",
                    fontWeight: 700,
                    color: "#EF4444",
                    margin: 0,
                    marginBottom: isExpanded ? "8px" : 0,
                  }}
                >
                  {marker.city}
                </p>

                {isExpanded && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          color: "#A78BFA",
                          margin: 0,
                          marginBottom: "2px",
                          fontWeight: 600,
                        }}
                      >
                        Content
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "10px",
                          color: "#C0C0E0",
                          margin: 0,
                        }}
                      >
                        {marker.content}
                      </p>
                    </div>

                    <div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          color: "#A78BFA",
                          margin: 0,
                          marginBottom: "2px",
                          fontWeight: 600,
                        }}
                      >
                        Platform
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "10px",
                          color: "#C0C0E0",
                          margin: 0,
                        }}
                      >
                        {marker.platform}
                      </p>
                    </div>

                    <div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          color: "#A78BFA",
                          margin: 0,
                          marginBottom: "2px",
                          fontWeight: 600,
                        }}
                      >
                        Confidence
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            height: "4px",
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "2px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${marker.confidence}%`,
                              background: "linear-gradient(90deg, #A78BFA, #10B981)",
                            }}
                          />
                        </div>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: "#A78BFA" }}>
                          {marker.confidence}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          color: "#A78BFA",
                          margin: 0,
                          marginBottom: "2px",
                          fontWeight: 600,
                        }}
                      >
                        Status
                      </p>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 8px",
                          background: "rgba(16,185,129,0.1)",
                          color: "#10B981",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "8px",
                          borderRadius: "4px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {marker.status}
                      </span>
                    </div>

                    <p
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "8px",
                        color: "#4040A0",
                        margin: 0,
                        marginTop: "4px",
                      }}
                    >
                      {marker.date}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      {!isDragging && (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            color: "#4040A0",
            pointerEvents: "none",
          }}
        >
          {isHovered ? "Click & drag to rotate" : "Hover to interact"}
        </div>
      )}
    </div>
  );
}
