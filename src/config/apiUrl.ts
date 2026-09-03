export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? '/api' : 'https://d3ujwk09smrk9z.cloudfront.net')
}