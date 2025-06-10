function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // reemplaza espacios por guiones
        .replace(/[^\w\-]+/g, '')       // elimina caracteres especiales
        .replace(/\-\-+/g, '-');        // reemplaza múltiples guiones por uno solo
}

export default slugify;