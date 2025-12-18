"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Engine } from "@/lib/odontograma/engine";

const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const StyledCanvas = styled.canvas`
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const OdontogramaCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      const engine = new Engine();
      engine.setCanvas(canvasRef.current);
      engine.init();
      engine.loadPatientData(
        "My Office",
        "John Doe",
        "123",
        "001",
        "2023-10-27",
        "Dr. Dentist",
        "No obs",
        "No specs"
      );
      engine.start();

      const canvas = canvasRef.current;
      const onMouseDown = (e: MouseEvent) => engine.onMouseClick(e);
      const onMouseMove = (e: MouseEvent) => engine.onMouseMove(e);

      canvas.addEventListener("mousedown", onMouseDown);
      canvas.addEventListener("mousemove", onMouseMove);

      // Prevent context menu on right click
      const onContextMenu = (e: MouseEvent) => e.preventDefault();
      canvas.addEventListener("contextmenu", onContextMenu);

      engineRef.current = engine;

      return () => {
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("contextmenu", onContextMenu);
      };
    }
  }, []);

  return (
    <CanvasContainer>
      <StyledCanvas ref={canvasRef} width={1000} height={1200} />
    </CanvasContainer>
  );
};

export default OdontogramaCanvas;
