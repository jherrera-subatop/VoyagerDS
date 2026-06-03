import { create } from "zustand";

export type GeometryType =
  | "vmcarrows" | "arrowpulse" | "arrowsignal" | "arroworbit" | "arrowbreathe"
  | "meshgradient" | "lightsweep" | "halftone" | "glassgrid"
  | "ribbons" | "aurora" | "vortex" | "starfield" | "plasma" | "constellation" | "hexgrid";

export interface BgParams {
  geometry:           GeometryType;
  speed:              number;  /* 0–2 */
  density:            number;  /* 2–30 — entidades/grid */
  curlFrequency:      number;  /* 0.001–0.015 */
  displacementAmount: number;  /* 0–200 */
  patternOpacity:     number;  /* 0.02–0.30 — opacidad del patrón */
  accentOpacity:      number;  /* 0–0.25   — acento naranja */
  strokeWeight:       number;  /* 0.5–5 */
  glowAmount:         number;  /* 0–3 — intensidad del glow */
  scaleX:             number;  /* 0.5–12 */
  scaleY:             number;  /* 0.5–8 */
  twistAmount:        number;  /* 0–5 */
  lightZ:             number;  /* 200–2000 */
  ambientLight:       number;  /* 0–1 */
  lightIntensity:     number;  /* 0–1.5 */
}

export const DEFAULTS: BgParams = {
  geometry:           "arrowpulse",
  speed:              0.25,
  density:            8,
  curlFrequency:      0.004,
  displacementAmount: 80,
  patternOpacity:     0.12,
  accentOpacity:      0.08,
  strokeWeight:       1.5,
  glowAmount:         1.2,
  scaleX:             7.0,
  scaleY:             5.0,
  twistAmount:        2.5,
  lightZ:             700,
  ambientLight:       0.30,
  lightIntensity:     0.70,
};

export interface SavedPreset {
  name: string;
  params: BgParams;
  savedAt: string;
}

interface BgStore extends BgParams {
  setParam:      (key: keyof BgParams, value: number | GeometryType) => void;
  reset:         () => void;
  randomize:     () => void;
  savePreset:    (name: string) => void;
  loadPreset:    (preset: SavedPreset) => void;
  listPresets:   () => SavedPreset[];
  deletePreset:  (name: string) => void;
}

export const useBgStore = create<BgStore>(function init(set) {
  return {
    ...DEFAULTS,
    setParam: function setParam(key, value) {
      set(function upd(s) { return { ...s, [key]: value }; });
    },
    reset: function reset() {
      set(function r() { return { ...DEFAULTS }; });
    },

    savePreset: function savePreset(name: string) {
      const state = useBgStore.getState();
      const preset: SavedPreset = {
        name,
        savedAt: new Date().toISOString(),
        params: {
          geometry: state.geometry, speed: state.speed, density: state.density,
          curlFrequency: state.curlFrequency, displacementAmount: state.displacementAmount,
          patternOpacity: state.patternOpacity, accentOpacity: state.accentOpacity,
          strokeWeight: state.strokeWeight, scaleX: state.scaleX, scaleY: state.scaleY,
          twistAmount: state.twistAmount, lightZ: state.lightZ,
          ambientLight: state.ambientLight, lightIntensity: state.lightIntensity,
        },
      };
      const stored = JSON.parse(localStorage.getItem("vmc-bg-presets") || "[]") as SavedPreset[];
      const filtered = stored.filter(function byName(p) { return p.name !== name; });
      filtered.unshift(preset);
      localStorage.setItem("vmc-bg-presets", JSON.stringify(filtered.slice(0, 20)));
    },

    loadPreset: function loadPreset(preset: SavedPreset) {
      set(preset.params);
    },

    listPresets: function listPresets() {
      try {
        return JSON.parse(localStorage.getItem("vmc-bg-presets") || "[]") as SavedPreset[];
      } catch {
        return [];
      }
    },

    deletePreset: function deletePreset(name: string) {
      const stored = JSON.parse(localStorage.getItem("vmc-bg-presets") || "[]") as SavedPreset[];
      localStorage.setItem("vmc-bg-presets", JSON.stringify(
        stored.filter(function byName(p) { return p.name !== name; })
      ));
    },

    randomize: function randomize() {
      const geos: GeometryType[] = ["arrowpulse","arrowsignal","arroworbit","arrowbreathe","vmcarrows","meshgradient","lightsweep","halftone","ribbons","aurora","vortex","starfield","plasma","constellation","hexgrid"];
      const geo = geos[Math.floor(Math.random() * geos.length)];
      set({
        geometry:           geo,
        speed:              0.10 + Math.random() * 0.50,
        density:            Math.round(4 + Math.random() * 18),
        curlFrequency:      0.001 + Math.random() * 0.011,
        displacementAmount: 20   + Math.random() * 160,
        patternOpacity:     0.04 + Math.random() * 0.14,
        accentOpacity:      Math.random() * 0.08,
        strokeWeight:       0.4  + Math.random() * 2.4,
        twistAmount:        Math.random() * 4.5,
        scaleX:             2.5  + Math.random() * 9,
        scaleY:             2    + Math.random() * 6,
        lightZ:             250  + Math.random() * 1500,
        ambientLight:       0.15 + Math.random() * 0.55,
        lightIntensity:     0.20 + Math.random() * 0.90,
      });
    },
  };
});
