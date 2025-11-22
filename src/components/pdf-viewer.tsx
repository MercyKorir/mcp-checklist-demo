import { usePdf } from '@mikecousins/react-pdf'
import { Document, DocumentProps, Image, Page, pdf } from '@react-pdf/renderer'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import print from 'print-js'
import { FC, useEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'
import { Color } from './printables/selects/select-color'
import { Button } from './ui/button'

interface PdfViewerProps {
  file?: string
  blob?: Blob | null
  scale?: number
  withCredentials?: boolean
  color?: Color
  canvasRef?: React.RefObject<HTMLCanvasElement>
}

const Viewer: FC<PdfViewerProps> = ({ file: fileProp, blob, scale = 0.4, withCredentials = true, color = Color.FULL_COLOR, canvasRef }) => {
  const [isClient, setIsClient] = useState(false)
  const [file, setFile] = useState(fileProp ?? '')
  const [page, setPage] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const canvasRefInternal = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (file) return

    if (blob) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64data = reader.result
        if (!base64data) {
          throw new Error('Unable to generate base64 from blob')
        }
        setFile(base64data.toString())
      }
      reader.readAsDataURL(blob)
    }
  }, [blob, file])

  const { pdfDocument } = usePdf({
    file,
    page,
    canvasRef: canvasRef || canvasRefInternal,
    withCredentials,
    scale,
    workerSrc: '/pdf.worker.min.mjs',
  })

  const previousDisabled = page === 1
  const nextDisabled = Boolean(page === pdfDocument?.numPages)

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative p-1" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {!pdfDocument || !isClient ? (
          <div className="flex items-center justify-center text-muted-foreground">
            <span>Generating PDF...</span>
          </div>
        ) : null}
        {isClient ? (
          <canvas
            ref={canvasRef || canvasRefInternal}
            style={{ filter: color === Color.BLACK_AND_WHITE ? 'grayscale(1)' : 'none' }}
            className="max-w-full"
          />
        ) : (
          <canvas className="max-w-full" />
        )}
        {pdfDocument && isClient ? (
          <div
            data-id="controls"
            className={cn(
              'absolute bottom-4 left-0 right-0 flex items-center justify-center transition-opacity duration-200 select-none',
              isHovered ? 'opacity-100' : 'opacity-0',
            )}
          >
            <div className="rounded-md bg-white shadow-lg border border-input flex items-center justify-center space-x-4 overflow-hidden">
              <Button
                size="icon"
                disabled={previousDisabled}
                onClick={() => setPage(page - 1)}
                className="rounded-none text-primary shadow-none bg-white hover:bg-primary hover:text-white disabled:text-primary/30"
              >
                <ChevronLeft size={20} />
              </Button>
              <span className="text-sm text-gray-600">
                {page} of {pdfDocument?.numPages || '?'}
              </span>
              <Button
                size="icon"
                disabled={nextDisabled}
                onClick={() => setPage(page + 1)}
                className="rounded-none text-primary shadow-none bg-white hover:bg-primary hover:text-white disabled:text-primary/30"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export interface PDFViewerProps {
  document: React.ReactElement<DocumentProps>
  color?: Color
  canvasRef?: React.RefObject<HTMLCanvasElement>
  scale?: number
}

export const PDFViewer: FC<PDFViewerProps> = ({ document, color = Color.FULL_COLOR, canvasRef, scale = 1 }) => {
  const [blob, setBlob] = useState<Blob | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const generateBlob = async () => {
      setIsGenerating(true)
      const newBlob = await pdf(document).toBlob()
      if (newBlob) {
        setBlob(newBlob)
      }
      setIsGenerating(false)
    }

    generateBlob()
  }, [document])

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center p-1 text-muted-foreground">
        <span>Generating PDF...</span>
      </div>
    )
  }

  return <Viewer blob={blob} scale={scale} color={color} canvasRef={canvasRef} />
}

export const printPDFDocument = async (document: React.ReactElement<DocumentProps>) => {
  const blob = await pdf(document).toBlob()
  print(URL.createObjectURL(blob))
}

export const openPDFInNewTab = async (
  canvas: HTMLCanvasElement,
  receivedDocument: React.ReactElement<DocumentProps>,
  color: Color,
  orientation: 'portrait' | 'landscape' = 'landscape',
) => {
  const SCALE_FACTOR = 3
  let doc

  if (color === Color.BLACK_AND_WHITE && orientation === 'landscape') {
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = canvas.width * SCALE_FACTOR
    tempCanvas.height = canvas.height * SCALE_FACTOR

    const ctx = tempCanvas.getContext('2d')
    if (!ctx) throw new Error('Canvas 2D context not supported')

    ctx.filter = 'grayscale(100%)'

    ctx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height)

    const imgData = tempCanvas.toDataURL('image/png', 1.0)

    doc = (
      <Document>
        <Page orientation={orientation} size="LETTER">
          <Image
            src={imgData}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Page>
      </Document>
    )
  } else {
    doc = receivedDocument
  }

  const blob = await pdf(doc).toBlob()
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
}
