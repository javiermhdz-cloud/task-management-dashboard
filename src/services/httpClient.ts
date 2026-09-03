import axios from 'axios'
import { getApiBaseUrl } from '../config/apiUrl'
import { TOKEN_KEY } from '../types'

export const httpClient = axios.create({
  headers: { 'Content-Type': 'application/json' },
})

httpClient.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl()
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function extractServerBody(data: unknown): string | null {
  if (data == null || data === '') return null
  if (typeof data === 'string') return data
  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>
    const parts: string[] = []
    if (typeof obj.message === 'string') parts.push(obj.message)
    if (typeof obj.error === 'string' && obj.error !== obj.message) parts.push(obj.error)
    if (typeof obj.detail === 'string') parts.push(obj.detail)
    if (typeof obj.title === 'string') parts.push(obj.title)
    if (Array.isArray(obj.errors)) {
      parts.push(obj.errors.map((item) => JSON.stringify(item)).join('; '))
    }
    if (parts.length > 0) return parts.join(' — ')
    try {
      return JSON.stringify(data, null, 2)
    } catch {
      return String(data)
    }
  }
  return String(data)
}

function requestLine(err: { config?: { method?: string; baseURL?: string; url?: string } }): string {
  const method = (err.config?.method ?? '?').toUpperCase()
  const base = err.config?.baseURL ?? ''
  const path = err.config?.url ?? ''
  const joined = `${base}${path}` || '(URL desconocida)'
  return `${method} ${joined}`
}

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const lines: string[] = []
    const status = err.response?.status
    const statusText = err.response?.statusText
    const serverBody = extractServerBody(err.response?.data)

    if (!err.response) {
      lines.push('No hubo respuesta del servidor.')
      lines.push('Causas típicas: API caída, DNS, red, o CORS bloqueando la petición.')
      if (err.code) lines.push(`Código Axios: ${err.code}`)
      lines.push(`Petición: ${requestLine(err)}`)
      if (err.message) lines.push(`Axios: ${err.message}`)
      return lines.join('\n')
    }

    if (status === 401) {
      lines.push('401 No autorizado: usuario/contraseña incorrectos, o el token JWT faltó / expiró / no es válido.')
    } else if (status === 403) {
      lines.push('403 Prohibido: el token no tiene permiso para este recurso.')
    } else if (status === 404) {
      lines.push('404 No encontrado: la ruta o el recurso no existe en la API.')
    } else if (status === 400) {
      lines.push('400 Petición inválida: el cuerpo o los parámetros no coinciden con lo que espera la API.')
    } else if (status === 409) {
      lines.push('409 Conflicto: el recurso ya existe o el estado no permite esta operación.')
    } else if (status && status >= 500) {
      lines.push(`${status} Error interno del servidor.`)
    } else {
      lines.push(`La API respondió con error HTTP ${status}${statusText ? ` ${statusText}` : ''}.`)
    }

    lines.push(`Petición: ${requestLine(err)}`)
    lines.push(`HTTP: ${status}${statusText ? ` ${statusText}` : ''}`)
    if (serverBody) lines.push(`Respuesta de la API:\n${serverBody}`)
    if (err.message) lines.push(`Axios: ${err.message}`)
    return lines.join('\n')
  }

  if (err instanceof Error) {
    return `${err.name}: ${err.message}`
  }

  return `Error desconocido: ${String(err)}`
}
