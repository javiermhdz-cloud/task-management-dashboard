import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export function ApiErrorAlert({ message }: { message: string }) {
  const [title, ...rest] = message.split('\n')
  const detail = rest.join('\n').trim()

  return (
    <Alert severity="error" sx={{ alignItems: 'flex-start' }}>
      <AlertTitle>{title || 'Error'}</AlertTitle>
      {detail ? (
        <pre
          style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 12,
            lineHeight: 1.45,
          }}
        >
          {detail}
        </pre>
      ) : null}
    </Alert>
  )
}
