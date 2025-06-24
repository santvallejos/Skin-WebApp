export function slugify(text: string): string {
    return text
        .toString()
        // 1) Normaliza acentos (é → e, ü → u, etc.)
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        // 2) A minúsculas y recorta espacios en los extremos
        .toLowerCase()
        .trim()
        // 3) Espacios y saltos → guión
        .replace(/\s+/g, '-')
        // 4) Quita todo lo que no sea letra, número o guión
        .replace(/[^\w-]+/g, '')
        // 5) Colapsa 2+ guiones en uno solo
        .replace(/-+/g, '-')
        // 6) Quita guiones al inicio/final
        .replace(/^-+|-+$/g, '');
}