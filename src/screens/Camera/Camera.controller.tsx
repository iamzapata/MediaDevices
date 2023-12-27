import { useEffect, useState } from "react"
import { CameraView } from "./Camera.view"
import { useCameraModel } from "./camera.model"
import { OverlaySpinner } from "../../components/ui/OverlaySpinner"

const constraints = {
  video: true,
  audio: false
}

export const CameraController = () => {
  const [isCameraLoading, setIsCameraLoading] = useState(true)
  const { stream, isStreamLoading, getStream, stopStream } = useCameraModel({
    constraints
  })

  const isLoading = isStreamLoading || (!!stream && isCameraLoading)

  useEffect(() => {
    if (stream) {
      return
    }

    getStream()

    return () => {
      stopStream()
    }
  }, [getStream, stopStream, stream])

  return (
    <OverlaySpinner isLoading={isLoading}>
      {stream && (
        <CameraView stream={stream} setIsCameraLoading={setIsCameraLoading} />
      )}
    </OverlaySpinner>
  )
}
