/**
 * Mapeo de colores hex a nombres descriptivos
 */
const COLOR_MAP: Record<string, string> = {
  '#ea899a': 'Rosa',
  '#ae807d': 'Rosa Viejo',
  '#8b0000': 'Rojo',
  '#6f0202': 'Cherry',
  '#e3e4e5': 'Plateado',
  '#e3e4a5': 'Dorado',
  '#8d1f81': 'Fucsia',
  '#000000': 'Negro',
  '#572364': 'Morado',
  '#474b4e': 'Gris Oscuro',
  '#afb810': 'Verde Lima',
  '#afd4c0': 'Verde',
};

/**
 * Convierte un color hex a su nombre descriptivo
 * 
 * @param hexColor Color en formato hex (ej: #FF0000)
 * @returns Nombre descriptivo del color o el hex original si no se encuentra
 */
export const getColorName = (hexColor: string | null): string => {
  if (!hexColor) return 'Sin color';
  
  // Normalizar el formato del color (asegurar que tenga #)
  const normalizedHex = hexColor.startsWith('#') ? hexColor : `#${hexColor}`;
  
  // Buscar el color en el mapa (insensible a mayúsculas/minúsculas)
  const colorName = COLOR_MAP[normalizedHex.toLowerCase()];
  
  return colorName || normalizedHex; // Si no se encuentra, devolver el hex original
};

/**
 * Obtiene información completa del color
 * 
 * @param hexColor Color en formato hex
 * @returns Objeto con hex y nombre del color
 */
export const getColorInfo = (hexColor: string | null) => {
  return {
    hex: hexColor,
    name: getColorName(hexColor)
  };
};

/**
 * Verifica si un color hex tiene un nombre definido
 * 
 * @param hexColor Color en formato hex
 * @returns true si el color tiene un nombre definido
 */
export const hasColorName = (hexColor: string | null): boolean => {
  if (!hexColor) return false;
  const normalizedHex = hexColor.startsWith('#') ? hexColor : `#${hexColor}`;
  return normalizedHex.toLowerCase() in COLOR_MAP;
};