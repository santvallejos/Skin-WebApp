export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // reemplaza espacios por guiones
        .replace(/[^\w\-]+/g, '')       // elimina caracteres especiales
        .replace(/\-\-+/g, '-');        // reemplaza múltiples guiones por uno solo
}

export function deslugify(slug: string): string {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }