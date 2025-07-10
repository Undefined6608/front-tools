// src/components/chartColors.ts

// 固定的鲜艳调色板（前 15 个系列优先使用）
const vividColorPalette = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFD93D",
  "#1A8FE3",
  "#FF8C42",
  "#9D4EDD",
  "#06D6A0",
  "#EF476F",
  "#118AB2",
  "#8338EC",
  "#FF006E",
  "#3A86FF",
  "#FFBE0B",
  "#FB5607",
  "#00B8A9",
];

// 动态生成足够的鲜艳色（如果 series 数超过 15）
const getBrightColors = (count: number): string[] => {
  const colors = [...vividColorPalette];
  const goldenRatio = 0.61803398875;
  let hue = Math.random();

  while (colors.length < count) {
    hue += goldenRatio;
    hue %= 1;
    const h = Math.floor(360 * hue);
    colors.push(`hsl(${h}, 85%, 55%)`);
  }

  return colors.slice(0, count);
};

export default {
  vividColorPalette,
  getBrightColors,
};
