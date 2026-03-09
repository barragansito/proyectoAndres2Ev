const rawBaseUrl = import.meta.env.BASE_URL ?? '/'

export const appBasePath = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`
export const routerBasePath = appBasePath === '/' ? '/' : appBasePath.slice(0, -1)

export function resolveAssetPath(assetPath) {
  const normalizedAssetPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
  return `${appBasePath}${normalizedAssetPath}`
}
