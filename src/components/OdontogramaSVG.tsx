"use client";

import React, { useState } from "react";

interface ToothProps {
  id: number;
  type: "upper" | "lower";
  x: number;
  y: number;
  onSurfaceClick: (toothId: number, surface: string) => void;
  isSurfaceSelected: (surfaceId: string) => boolean;
}

const TOOTH_WIDTH = 40;
const TOOTH_HEIGHT = 90;
const TOOTH_PADDING = 10;
const RECT_DIMEN = 10;

const has5Surfaces = (id: number) => {
  const lastDigit = id % 10;
  return lastDigit >= 4;
};

const getSurfaces = (
  id: number,
  type: "upper" | "lower",
  x: number,
  y: number
) => {
  const width = RECT_DIMEN;
  const isFive = has5Surfaces(id);
  const surfaces = [];

  if (type === "upper") {
    const startX = isFive ? x + 5 : x + 10;
    const startY = y + TOOTH_HEIGHT;

    if (isFive) {
      surfaces.push({
        id: `${id}_V`,
        x: startX + width,
        y: startY,
        w: width,
        h: width,
      });

      surfaces.push({
        id: `${id}_M`,
        x: startX,
        y: startY + width,
        w: width,
        h: width,
      });
      surfaces.push({
        id: `${id}_0`,
        x: startX + width,
        y: startY + width,
        w: width,
        h: width,
      });
      surfaces.push({
        id: `${id}_D`,
        x: startX + width * 2,
        y: startY + width,
        w: width,
        h: width,
      });

      surfaces.push({
        id: `${id}_L`,
        x: startX + width,
        y: startY + width * 2,
        w: width,
        h: width,
      });
    } else {
      surfaces.push({
        id: `${id}_V`,
        x: startX + width / 2,
        y: startY,
        w: width,
        h: width,
      });

      surfaces.push({
        id: `${id}_M`,
        x: startX,
        y: startY + width,
        w: width,
        h: width,
      });
      surfaces.push({
        id: `${id}_D`,
        x: startX + width,
        y: startY + width,
        w: width,
        h: width,
      });

      surfaces.push({
        id: `${id}_L`,
        x: startX + width / 2,
        y: startY + width * 2,
        w: width,
        h: width,
      });
    }
  } else {
    const startY = y;
    const startX = isFive ? x + 5 : x + 10;

    if (isFive) {
      surfaces.push({
        id: `${id}_V`,
        x: startX + width,
        y: startY - width * 3,
        w: width,
        h: width,
      });

      surfaces.push({
        id: `${id}_M`,
        x: startX,
        y: startY - width * 2,
        w: width,
        h: width,
      });
      surfaces.push({
        id: `${id}_0`,
        x: startX + width,
        y: startY - width * 2,
        w: width,
        h: width,
      });
      surfaces.push({
        id: `${id}_D`,
        x: startX + width * 2,
        y: startY - width * 2,
        w: width,
        h: width,
      });

      surfaces.push({
        id: `${id}_L`,
        x: startX + width,
        y: startY - width,
        w: width,
        h: width,
      });
    } else {
      surfaces.push({
        id: `${id}_V`,
        x: startX + width / 2,
        y: startY - width * 3,
        w: width,
        h: width,
      });

      surfaces.push({
        id: `${id}_M`,
        x: startX,
        y: startY - width * 2,
        w: width,
        h: width,
      });
      surfaces.push({
        id: `${id}_D`,
        x: startX + width,
        y: startY - width * 2,
        w: width,
        h: width,
      });

      surfaces.push({
        id: `${id}_L`,
        x: startX + width / 2,
        y: startY - width,
        w: width,
        h: width,
      });
    }
  }

  return surfaces;
};

const ToothSVG: React.FC<ToothProps> = ({
  id,
  type,
  x,
  y,
  onSurfaceClick,
  isSurfaceSelected,
}) => {
  const surfaces = getSurfaces(id, type, x, y);
  const [hoveredSurface, setHoveredSurface] = useState<string | null>(null);

  const imageSrc =
    type === "upper"
      ? `/images/dentadura-sup-${id}.png`
      : `/images/dentadura-inf-${id}.png`;

  const labelY = type === "upper" ? y + TOOTH_HEIGHT + 45 : y - 45;

  return (
    <g>
      <image
        href={imageSrc}
        x={x}
        y={y}
        width={TOOTH_WIDTH}
        height={TOOTH_HEIGHT}
      />

      <text
        x={x + TOOTH_WIDTH / 2}
        y={labelY}
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="#333"
      >
        {id}
      </text>

      {surfaces.map((s) => {
        const isSelected = isSurfaceSelected(s.id);
        const fillColor = isSelected
          ? "#FFA500" // Orange for selected
          : hoveredSurface === s.id
          ? "#ffcccc" // Light red on hover
          : "white"; // Default

        return (
          <rect
            key={s.id}
            x={s.x}
            y={s.y}
            width={s.w}
            height={s.h}
            fill={fillColor}
            stroke="#333"
            strokeWidth="1"
            style={{ cursor: "pointer", transition: "fill 0.2s" }}
            onMouseEnter={() => setHoveredSurface(s.id)}
            onMouseLeave={() => setHoveredSurface(null)}
            onClick={() => onSurfaceClick(id, s.id)}
          >
            <title>{s.id}</title>
          </rect>
        );
      })}
    </g>
  );
};

const OdontogramaSVG = () => {
  const [view, setView] = useState<"adult" | "child" | "all">("adult");
  const [selectedSurfaces, setSelectedSurfaces] = useState<string[]>([]);

  const generateSegment = (
    rangeStart: number,
    rangeEnd: number,
    type: "upper" | "lower",
    startY: number,
    direction: "ltr" | "rtl"
  ) => {
    const segment = [];
    const width = 1000;

    let x = 0;

    const startDigit = Math.floor(rangeStart / 10);
    const isRightSide = [1, 4, 5, 8].includes(startDigit);

    if (isRightSide) {
      const count = Math.abs(rangeEnd - rangeStart) + 1;
      x = width / 2 - count * (TOOTH_WIDTH + TOOTH_PADDING);
    } else {
      x = width / 2 + TOOTH_PADDING;
    }

    if (direction === "rtl") {
      for (let i = rangeStart; i >= rangeEnd; i--) {
        segment.push({ id: i, type, x, y: startY });
        x += TOOTH_WIDTH + TOOTH_PADDING;
      }
    } else {
      for (let i = rangeStart; i <= rangeEnd; i++) {
        segment.push({ id: i, type, x, y: startY });
        x += TOOTH_WIDTH + TOOTH_PADDING;
      }
    }
    return segment;
  };

  const getTeethData = () => {
    let teeth: Omit<ToothProps, "onSurfaceClick" | "isSurfaceSelected">[] = [];

    let adultUpperY = 100;
    let adultLowerY = 320;
    let childUpperY = 100;
    let childLowerY = 320;

    if (view === "all") {
      adultUpperY = 50;
      childUpperY = 210;
      childLowerY = 420;
      adultLowerY = 600;
    }

    if (view === "adult" || view === "all") {
      teeth = [
        ...teeth,
        ...generateSegment(18, 11, "upper", adultUpperY, "rtl"),
        ...generateSegment(21, 28, "upper", adultUpperY, "ltr"),
        ...generateSegment(48, 41, "lower", adultLowerY, "rtl"),
        ...generateSegment(31, 38, "lower", adultLowerY, "ltr"),
      ];
    }

    if (view === "child" || view === "all") {
      teeth = [
        ...teeth,
        ...generateSegment(55, 51, "upper", childUpperY, "rtl"),
        ...generateSegment(61, 65, "upper", childUpperY, "ltr"),
        ...generateSegment(85, 81, "lower", childLowerY, "rtl"),
        ...generateSegment(71, 75, "lower", childLowerY, "ltr"),
      ];
    }

    return teeth;
  };

  const teeth = getTeethData();
  const svgHeight = view === "all" ? 750 : 600;

  const handleSurfaceClick = (id: number, surface: string) => {
    setSelectedSurfaces((prev) => {
      if (prev.includes(surface)) {
        return prev.filter((s) => s !== surface);
      } else {
        return [...prev, surface];
      }
    });
  };

  const isSurfaceSelected = (surfaceId: string) => {
    return selectedSurfaces.includes(surfaceId);
  };

  return (
    <div className="flex flex-col items-center p-5 bg-[#f5f5f5] rounded-lg">
      <div className="mb-5 flex gap-2.5">
        <button
          className={`px-4 py-2 border border-[#ddd] rounded cursor-pointer ${
            view === "adult"
              ? "bg-[#007bff] text-white"
              : "bg-white text-[#333] hover:bg-[#f0f0f0]"
          }`}
          onClick={() => setView("adult")}
        >
          Adult
        </button>
        <button
          className={`px-4 py-2 border border-[#ddd] rounded cursor-pointer ${
            view === "child"
              ? "bg-[#007bff] text-white"
              : "bg-white text-[#333] hover:bg-[#f0f0f0]"
          }`}
          onClick={() => setView("child")}
        >
          Child
        </button>
        <button
          className={`px-4 py-2 border border-[#ddd] rounded cursor-pointer ${
            view === "all"
              ? "bg-[#007bff] text-white"
              : "bg-white text-[#333] hover:bg-[#f0f0f0]"
          }`}
          onClick={() => setView("all")}
        >
          All
        </button>
      </div>

      <svg
        className="bg-white shadow-md rounded"
        width="1000"
        height={svgHeight}
        viewBox={`0 0 1000 ${svgHeight}`}
      >
        {teeth.map((tooth) => (
          <ToothSVG
            key={tooth.id}
            {...tooth}
            onSurfaceClick={handleSurfaceClick}
            isSurfaceSelected={isSurfaceSelected}
          />
        ))}
      </svg>

      <div className="mt-6 p-4 w-full max-w-[1000px] bg-white rounded shadow text-sm">
        <h3 className="font-bold mb-2">
          Selected Surfaces (Các răng đã chọn):
        </h3>
        {selectedSurfaces.length === 0 ? (
          <p className="text-gray-500 italic">None selected.</p>
        ) : (
          <div className="text-gray-800">{selectedSurfaces.join(", ")}</div>
        )}
      </div>
    </div>
  );
};

export default OdontogramaSVG;
