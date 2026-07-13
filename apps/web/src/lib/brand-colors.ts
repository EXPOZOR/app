/**
 * Canonical literal colours for renderers that cannot resolve CSS custom
 * properties, including generated images and transactional email.
 */
export const BRAND_COLORS = {
  background: "#09090B",
  mint: "#3DDC97",
  lilac: "#A78BFA",
  text: "#F4F4F5",
  textMuted: "#A1A1AA",
  textTertiary: "#8C8C96",
} as const;

export const BRAND_EFFECTS = {
  gradient: `linear-gradient(135deg, ${BRAND_COLORS.mint} 0%, ${BRAND_COLORS.lilac} 100%)`,
  mintBorder: "rgba(61,220,151,0.3)",
  mintGlow: "rgba(61,220,151,0.12)",
  mintSurface: "rgba(61,220,151,0.08)",
  lilacGlow: "rgba(167,139,250,0.06)",
} as const;

export const SEMANTIC_COLORS = {
  positive: "#34D399",
  info: "#60A5FA",
  warning: "#FBBF24",
  danger: "#F87171",
} as const;
