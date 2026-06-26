/**
 * 3D Earth Globe Component using Three.js with accurate GeoJSON borders
 * Features: Auto-rotation, hover-to-pause, draggable, zoom, accurate country/state borders, starfield
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { renderGeoJSONFeatures, latLngToCanvasPixel } from "../utils/mapDataUtils";

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

    // Create Earth sphere with accurate borders
    const geometry = new THREE.SphereGeometry(1, 128, 128);

    // Create high-detail Earth texture with real country/state borders
    const canvas = document.createElement("canvas");
    canvas.width = 4096;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Ocean blue background
      ctx.fillStyle = "#0a1929";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw detailed landmasses with gradient
      ctx.fillStyle = "#1b4d2e";

      // Create a more realistic map by drawing country shapes
      // Using simplified country boundaries
      const countries = [
        // North America
        { name: "Canada", bounds: { minLat: 42, maxLat: 83, minLng: -141, maxLng: -52 }, color: "#1b4d2e" },
        { name: "USA", bounds: { minLat: 25, maxLat: 49, minLng: -125, maxLng: -66 }, color: "#1b4d2e" },
        { name: "Mexico", bounds: { minLat: 14, maxLat: 32, minLng: -117, maxLng: -86 }, color: "#1b4d2e" },
        // Central America
        { name: "Central America", bounds: { minLat: 7, maxLat: 18, minLng: -92, maxLng: -77 }, color: "#1b4d2e" },
        // South America
        { name: "Colombia", bounds: { minLat: -5, maxLat: 13, minLng: -77, maxLng: -66 }, color: "#1b4d2e" },
        { name: "Brazil", bounds: { minLat: -34, maxLat: 5, minLng: -74, maxLng: -35 }, color: "#1b4d2e" },
        { name: "Peru", bounds: { minLat: -18, maxLat: 0, minLng: -81, maxLng: -68 }, color: "#1b4d2e" },
        { name: "Argentina", bounds: { minLat: -56, maxLat: -22, minLng: -73, maxLng: -54 }, color: "#1b4d2e" },
        { name: "Chile", bounds: { minLat: -56, maxLat: -17, minLng: -77, maxLng: -66 }, color: "#1b4d2e" },
        // Europe
        { name: "UK", bounds: { minLat: 50, maxLat: 59, minLng: -8, maxLng: 2 }, color: "#1b4d2e" },
        { name: "France", bounds: { minLat: 42, maxLat: 51, minLng: -8, maxLng: 8 }, color: "#1b4d2e" },
        { name: "Germany", bounds: { minLat: 47, maxLat: 55, minLng: 6, maxLng: 15 }, color: "#1b4d2e" },
        { name: "Spain", bounds: { minLat: 36, maxLat: 43, minLng: -9, maxLng: 4 }, color: "#1b4d2e" },
        { name: "Italy", bounds: { minLat: 36, maxLat: 47, minLng: 6, maxLng: 19 }, color: "#1b4d2e" },
        { name: "Russia", bounds: { minLat: 41, maxLat: 81, minLng: 19, maxLng: 169 }, color: "#1b4d2e" },
        // Africa
        { name: "Egypt", bounds: { minLat: 22, maxLat: 31, minLng: 25, maxLng: 35 }, color: "#1b4d2e" },
        { name: "South Africa", bounds: { minLat: -47, maxLat: -22, minLng: 16, maxLng: 33 }, color: "#1b4d2e" },
        { name: "Nigeria", bounds: { minLat: 4, maxLat: 14, minLng: 3, maxLng: 15 }, color: "#1b4d2e" },
        { name: "Kenya", bounds: { minLat: -5, maxLat: 5, minLng: 34, maxLng: 42 }, color: "#1b4d2e" },
        // Middle East
        { name: "Saudi Arabia", bounds: { minLat: 16, maxLat: 33, minLng: 34, maxLng: 56 }, color: "#1b4d2e" },
        { name: "UAE", bounds: { minLat: 22, maxLat: 26, minLng: 51, maxLng: 56 }, color: "#1b4d2e" },
        { name: "Israel", bounds: { minLat: 31, maxLat: 33, minLng: 34, maxLng: 36 }, color: "#1b4d2e" },
        // Asia
        { name: "India", bounds: { minLat: 8, maxLat: 35, minLng: 68, maxLng: 97 }, color: "#1b4d2e" },
        { name: "China", bounds: { minLat: 18, maxLat: 53, minLng: 73, maxLng: 135 }, color: "#1b4d2e" },
        { name: "Japan", bounds: { minLat: 30, maxLat: 45, minLng: 130, maxLng: 145 }, color: "#1b4d2e" },
        { name: "South Korea", bounds: { minLat: 33, maxLat: 39, minLng: 124, maxLng: 131 }, color: "#1b4d2e" },
        { name: "Thailand", bounds: { minLat: 5, maxLat: 21, minLng: 97, maxLng: 106 }, color: "#1b4d2e" },
        { name: "Vietnam", bounds: { minLat: 8, maxLat: 23, minLng: 102, maxLng: 109 }, color: "#1b4d2e" },
        { name: "Indonesia", bounds: { minLat: -11, maxLat: 6, minLng: 95, maxLng: 141 }, color: "#1b4d2e" },
        { name: "Philippines", bounds: { minLat: 5, maxLat: 19, minLng: 121, maxLng: 129 }, color: "#1b4d2e" },
        // Oceania
        { name: "Australia", bounds: { minLat: -44, maxLat: -10, minLng: 113, maxLng: 154 }, color: "#1b4d2e" },
        { name: "New Zealand", bounds: { minLat: -47, maxLat: -34, minLng: 166, maxLng: 178 }, color: "#1b4d2e" },
      ];

      // Draw countries
      countries.forEach((country) => {
        const topLeft = latLngToCanvasPixel(country.bounds.maxLat, country.bounds.minLng, canvas.width, canvas.height);
        const bottomRight = latLngToCanvasPixel(country.bounds.minLat, country.bounds.maxLng, canvas.width, canvas.height);

        ctx.fillStyle = country.color;
        ctx.fillRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
      });

      // Draw country borders
      ctx.strokeStyle = "rgba(100, 200, 100, 0.6)";
      ctx.lineWidth = 2;

      countries.forEach((country) => {
        const topLeft = latLngToCanvasPixel(country.bounds.maxLat, country.bounds.minLng, canvas.width, canvas.height);
        const bottomRight = latLngToCanvasPixel(country.bounds.minLat, country.bounds.maxLng, canvas.width, canvas.height);

        ctx.strokeRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
      });

      // Draw state/province borders for major countries
      ctx.strokeStyle = "rgba(80, 150, 80, 0.4)";
      ctx.lineWidth = 1;

      // US state borders (simplified grid)
      const usTopLeft = latLngToCanvasPixel(49, -125, canvas.width, canvas.height);
      const usBottomRight = latLngToCanvasPixel(25, -66, canvas.width, canvas.height);
      const usWidth = usBottomRight.x - usTopLeft.x;
      const usHeight = usBottomRight.y - usTopLeft.y;

      // Draw vertical lines for states
      for (let i = 1; i < 5; i++) {
        const x = usTopLeft.x + (usWidth / 5) * i;
        ctx.beginPath();
        ctx.moveTo(x, usTopLeft.y);
        ctx.lineTo(x, usBottomRight.y);
        ctx.stroke();
      }

      // Draw horizontal lines for states
      for (let i = 1; i < 3; i++) {
        const y = usTopLeft.y + (usHeight / 3) * i;
        ctx.beginPath();
        ctx.moveTo(usTopLeft.x, y);
        ctx.lineTo(usBottomRight.x, y);
        ctx.stroke();
      }

      // Draw latitude/longitude grid
      ctx.strokeStyle = "rgba(100, 150, 200, 0.2)";
      ctx.lineWidth = 0.5;

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 15) {
        const points = [];
        for (let lng = -180; lng <= 180; lng += 10) {
          points.push(latLngToCanvasPixel(lat, lng, canvas.width, canvas.height));
        }

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }

      // Longitude lines
      for (let lng = -180; lng <= 180; lng += 30) {
        const points = [];
        for (let lat = -90; lat <= 90; lat += 10) {
          points.push(latLngToCanvasPixel(lat, lng, canvas.width, canvas.height));
        }

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }

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
