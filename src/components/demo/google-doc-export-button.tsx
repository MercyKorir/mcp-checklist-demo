import { DocumentProps, pdf } from '@react-pdf/renderer'
import { Loader2 } from 'lucide-react'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Color } from '../printables/selects/select-color'
import { Button } from '../ui/button'

const SCOPES = 'https://www.googleapis.com/auth/drive.file'
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'

interface GoogleDocExportButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  document: ReactElement<DocumentProps>
  color: Color
  sectionName: string
  googleClientId: string
}

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string
            scope: string
            callback: (response: { access_token: string; expires_in: number }) => void
          }) => {
            requestAccessToken: () => void
          }
        }
      }
    }
    gapi?: {
      load: (api: string, callback: () => void) => void
      client: {
        init: (config: { apiKey?: string; discoveryDocs: string[] }) => Promise<void>
        drive: {
          files: {
            create: (params: {
              resource: { name: string; mimeType: string }
              fields: string
            }) => Promise<{ result: { id: string; webViewLink: string } }>
          }
        }
      }
    }
  }
}

async function extractAllPagesAsImages(
  document: ReactElement<DocumentProps>,
  _canvasRef: React.RefObject<HTMLCanvasElement>,
  scale: number = 2,
  color: Color = Color.FULL_COLOR,
): Promise<string[]> {
  try {
    const blob = await pdf(document).toBlob()
    const url = URL.createObjectURL(blob)

    const pdfjsLib = (window as Window & { pdfjsLib?: typeof import('pdfjs-dist') }).pdfjsLib
    if (!pdfjsLib) {
      throw new Error('PDF.js library not loaded')
    }

    const loadingTask = pdfjsLib.getDocument(url)
    const pdfDoc = await loadingTask.promise

    const images: string[] = []

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum)
      const viewport = page.getViewport({ scale })

      const canvas = window.document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (!context) {
        throw new Error('Failed to get canvas context')
      }

      canvas.width = viewport.width
      canvas.height = viewport.height

      await page.render({
        canvasContext: context,
        viewport: viewport,
        canvas: canvas,
      }).promise

      if (color === Color.BLACK_AND_WHITE) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
          data[i] = gray
          data[i + 1] = gray
          data[i + 2] = gray
        }

        context.putImageData(imageData, 0, 0)
      }

      const dataUrl = canvas.toDataURL('image/png')
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '')

      images.push(base64Data)
    }

    URL.revokeObjectURL(url)

    return images
  } catch (error) {
    console.error('Error extracting pages as images:', error)
    throw error
  }
}

export function GoogleDocExportButton({
  canvasRef,
  document: pdfDocument,
  color,
  sectionName,
  googleClientId,
}: GoogleDocExportButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [gapiInited, setGapiInited] = useState(false)
  const [gisInited, setGisInited] = useState(false)
  const [tokenClient, setTokenClient] = useState<{ requestAccessToken: () => void } | null>(null)

  const handleExport = useCallback(
    async (accessToken: string) => {
      try {
        // Extract all pages as images
        await extractAllPagesAsImages(pdfDocument, canvasRef, 2, color)

        // Create a new Google Doc
        const response = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,webViewLink', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `Checklist - ${sectionName}`,
            mimeType: 'application/vnd.google-apps.document',
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to create Google Doc')
        }

        const docData = await response.json()

        // Upload images to the document
        // Note: This is a simplified version. In production, you'd need to:
        // 1. Upload images to Google Drive
        // 2. Insert content and tables into the document using Google Docs API
        // 3. Apply the checklist styles and features to the document
        // For this demo, we'll just create the doc and show the link

        if (docData.webViewLink) {
          window.open(docData.webViewLink, '_blank')
          toast.success('Google Doc created successfully!')
        } else {
          toast.error('Failed to get document link')
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Error creating Google Doc:', error)
        toast.error('Failed to create Google Doc')
        setIsLoading(false)
      }
    },
    [pdfDocument, canvasRef, color, sectionName],
  )

  useEffect(() => {
    // Load Google API script
    const script1 = window.document.createElement('script')
    script1.src = 'https://apis.google.com/js/api.js'
    script1.async = true
    script1.defer = true
    script1.onload = () => {
      if (window.gapi) {
        window.gapi.load('client', async () => {
          try {
            await window.gapi!.client.init({
              discoveryDocs: [DISCOVERY_DOC],
            })
            setGapiInited(true)
          } catch (error) {
            console.error('Error initializing GAPI client:', error)
          }
        })
      }
    }
    window.document.body.appendChild(script1)

    // Load Google Identity Services script
    const script2 = window.document.createElement('script')
    script2.src = 'https://accounts.google.com/gsi/client'
    script2.async = true
    script2.defer = true
    script2.onload = () => {
      if (window.google) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: SCOPES,
          callback: async (response) => {
            if (response.access_token) {
              localStorage.setItem('google_access_token', response.access_token)
              localStorage.setItem('google_token_expiry', String(Date.now() + response.expires_in * 1000))
              await handleExport(response.access_token)
            }
          },
        })
        setTokenClient(client)
        setGisInited(true)
      }
    }
    window.document.body.appendChild(script2)

    return () => {
      window.document.body.removeChild(script1)
      window.document.body.removeChild(script2)
    }
  }, [googleClientId, handleExport])

  const handleClick = () => {
    // Check if we have a valid token in localStorage
    const token = localStorage.getItem('google_access_token')
    const expiry = localStorage.getItem('google_token_expiry')

    if (token && expiry && Date.now() < Number(expiry)) {
      // Token is still valid, use it directly
      setIsLoading(true)
      handleExport(token)
    } else {
      // Need to authenticate
      if (!gapiInited || !gisInited || !tokenClient) {
        toast.info('Google APIs are unavailable. Please check VITE_GOOGLE_CLIENT_ID in your .env file.')
        return
      }

      setIsLoading(true)
      tokenClient.requestAccessToken()
    }
  }

  return (
    <Button variant="teal" onClick={handleClick} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Exporting...
        </>
      ) : (
        'Export to Google Docs'
      )}
    </Button>
  )
}
