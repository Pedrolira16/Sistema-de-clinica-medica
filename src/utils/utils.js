function createReplacements(filter) {
    const replacements = {};
    for (const [key, value] of Object.entries(filter)) {
        replacements[key] = `%${value}%`;
    }
    return replacements;
}
export { createReplacements };