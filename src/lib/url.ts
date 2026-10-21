// Builds links that work both on a custom domain and on a GitHub Pages sub-path.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Turn a site path like "/research/" into a link that includes the base path. */
export function href(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Remove the base path from a URL pathname, giving the site path. */
export function stripBase(pathname: string): string {
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
}
