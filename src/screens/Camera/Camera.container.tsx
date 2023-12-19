import { useEffect, useState } from "react"
import { CameraView } from "./Camera.view"
import { useCameraModel } from "./camera.model"
import { OverlaySpinner } from "../../components/ui/OverlaySpinner"
import { CameraScreenNotAvailable } from "./components/CameraStreamNotAvailable"
import { CameraError } from "./components/CameraError.component"

export const CameraContainer = () => {
  const [isCameraLoading, setIsCameraLoading] = useState(true)
  const { stream, error, isStreamLoading, getStream, stopStream } =
    useCameraModel()

  const isLoading = isStreamLoading || isCameraLoading
  const isNotLoading = !isLoading
  const displayError = error && isNotLoading
  const displayStreamNotAvailable = !stream && isNotLoading

  useEffect(() => {
    if (stream) {
      return
    }

    getStream()

    return () => {
      stopStream()
    }
  }, [getStream, stopStream])

  if (displayError) {
    return <CameraError />
  }

  if (displayStreamNotAvailable) {
    return <CameraScreenNotAvailable />
  }

  return (
    <OverlaySpinner isLoading={isLoading}>
      <CameraView stream={stream} setIsCameraLoading={setIsCameraLoading} />
    </OverlaySpinner>
  )
}
