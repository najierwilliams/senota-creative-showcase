/**
 * 3D Earth Globe Component using Three.js
 * Features: Auto-rotation, hover-to-pause, draggable, zoom, country borders, starfield background
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

// Simplified country border data (lat/lng coordinates)
const COUNTRY_BORDERS = [
  // North America borders
  { points: [[49, -95], [49, -141], [60, -141], [60, -95]] }, // Canada outline simplified
  // Europe borders
  { points: [[36, -10], [71, -10], [71, 40], [36, 40]] }, // Europe bounding
  // Africa
  { points: [[-35, -18], [37, -18], [37, 51], [-35, 51]] }, // Africa bounding
  // Asia
  { points: [[5, 60], [75, 60], [75, 150], [5, 150]] }, // Asia bounding
  // Australia
  { points: [[-44, 113], [-10, 113], [-10, 154], [-44, 154]] }, // Australia bounding
];

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
  const zoomRef = useRef(2.5);
  const targetZoomRef = useRef(2.5);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = zoomRef.current;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create starfield background
    const createStarfield = () => {
      const starsGeometry = new THREE.BufferGeometry();
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        sizeAttenuation: true,
      });

      const starsVertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        starsVertices.push(x, y, z);
      }

      starsGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(starsVertices), 3));
      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);
    };

    createStarfield();

    // Create Earth sphere with detailed texture
    const geometry = new THREE.SphereGeometry(1, 128, 128);

    // Create high-detail Earth texture with countries and borders
    const canvas = document.createElement("canvas");
    canvas.width = 4096;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Ocean blue background
      ctx.fillStyle = "#0a1929";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create a more detailed landmass map
      ctx.fillStyle = "#1b4d2e";

      // North America
      ctx.beginPath();
      ctx.ellipse(500, 600, 300, 350, 0, 0, Math.PI * 2);
      ctx.fill();

      // South America
      ctx.beginPath();
      ctx.ellipse(700, 1000, 150, 250, 0, 0, Math.PI * 2);
      ctx.fill();

      // Europe
      ctx.beginPath();
      ctx.ellipse(1200, 500, 200, 150, 0, 0, Math.PI * 2);
      ctx.fill();

      // Africa
      ctx.beginPath();
      ctx.ellipse(1400, 900, 250, 350, 0, 0, Math.PI * 2);
      ctx.fill();

      // Middle East
      ctx.beginPath();
      ctx.ellipse(1600, 700, 150, 100, 0, 0, Math.PI * 2);
      ctx.fill();

      // Russia
      ctx.beginPath();
      ctx.ellipse(1800, 400, 400, 200, 0, 0, Math.PI * 2);
      ctx.fill();

      // Asia
      ctx.beginPath();
      ctx.ellipse(2200, 600, 400, 300, 0, 0, Math.PI * 2);
      ctx.fill();

      // India
      ctx.beginPath();
      ctx.ellipse(1900, 850, 100, 120, 0, 0, Math.PI * 2);
      ctx.fill();

      // Southeast Asia
      ctx.beginPath();
      ctx.ellipse(2100, 950, 150, 100, 0, 0, Math.PI * 2);
      ctx.fill();

      // Australia
      ctx.beginPath();
      ctx.ellipse(2400, 1200, 120, 140, 0, 0, Math.PI * 2);
      ctx.fill();

      // New Zealand
      ctx.beginPath();
      ctx.ellipse(2600, 1250, 50, 70, 0, 0, Math.PI * 2);
      ctx.fill();

      // Greenland
      ctx.beginPath();
      ctx.ellipse(800, 300, 80, 150, 0, 0, Math.PI * 2);
      ctx.fill();

      // Add country borders with thin lines
      ctx.strokeStyle = "rgba(100, 200, 100, 0.4)";
      ctx.lineWidth = 1;

      // Draw grid lines for latitude/longitude
      for (let i = 0; i <= 8; i++) {
        const x = (canvas.width / 8) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let i = 0; i <= 4; i++) {
        const y = (canvas.height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Add some state/province borders (simplified)
      ctx.strokeStyle = "rgba(80, 150, 80, 0.3)";
      ctx.lineWidth = 0.5;

      // US state borders (simplified)
      const usaBorders = [
        { x: 450, y: 550, w: 150, h: 100 }, // West
        { x: 600, y: 550, w: 100, h: 100 }, // Central
        { x: 700, y: 550, w: 100, h: 100 }, // East
      ];

      usaBorders.forEach((border) => {
        ctx.strokeRect(border.x, border.y, border.w, border.h);
      });

      // Add atmospheric glow
      const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 500, canvas.width / 2, canvas.height / 2, 1500);
      gradient.addColorStop(0, "rgba(100, 200, 255, 0.1)");
      gradient.addColorStop(1, "rgba(100, 200, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      emissive: 0x1a3a3a,
      shininess: 10,
      wireframe: false,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.05, 128, 128);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
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

      // Create marker (red dot with glow)
      const markerGeometry = new THREE.SphereGeometry(0.025, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

      markerMesh.position.set(x, y, z);
      markerMesh.userData = { markerId: marker.id, isMarker: true };
      markersGroup.add(markerMesh);

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0.4,
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

    const onMouseWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSpeed = 0.1;
      if (e.deltaY > 0) {
        targetZoomRef.current = Math.min(targetZoomRef.current + zoomSpeed, 5);
      } else {
        targetZoomRef.current = Math.max(targetZoomRef.current - zoomSpeed, 1);
      }
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("mouseleave", onMouseUp);
    renderer.domElement.addEventListener("wheel", onMouseWheel, { passive: false });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Auto-rotate when not hovered
      if (!isHovered && !isDragging) {
        targetRotationRef.current.y += 0.0003;
      }

      // Smooth rotation
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.1;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.1;

      // Smooth zoom
      zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.1;

      if (globeRef.current) {
        globeRef.current.rotation.x = rotationRef.current.x;
        globeRef.current.rotation.y = rotationRef.current.y;
      }

      if (markersGroupRef.current) {
        markersGroupRef.current.rotation.x = rotationRef.current.x;
        markersGroupRef.current.rotation.y = rotationRef.current.y;
      }

      if (cameraRef.current) {
        cameraRef.current.position.z = zoomRef.current;
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
      renderer.domElement.removeEventListener("wheel", onMouseWheel);
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
        background: "#000000",
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
          {isHovered ? "Drag to rotate • Scroll to zoom" : "Hover to interact"}
        </div>
      )}
    </div>
  );
}
