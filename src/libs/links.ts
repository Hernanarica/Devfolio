// Todo link que sale del sitio se abre en otra pestaña para no perder la
// página actual. Incluye mailto: si el navegador lo resuelve con un webmail,
// en la misma pestaña navegaría fuera del sitio
export function externalLinkProps(href: string | undefined) {
  return href && /^(https?:|mailto:)/.test(href)
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
}
