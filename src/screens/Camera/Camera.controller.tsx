import { OverlaySpinner } from "@ui/OverlaySpinner";
import { useEffect, useState } from "react";
import { useCameraModel } from "./camera.model";
import { CameraView } from "./Camera.view";


const constraints = {
  video: true,
  audio: false
}

export const CameraController = () => {
  const [paused, setPaused] = useState(false)
  const [isCameraLoading, setIsCameraLoading] = useState(true)
  const { stream, isStreamLoading, getStream, stopStream } = useCameraModel({
    constraints
  })

  const displayStream = stream || paused

  const isLoading = isStreamLoading || (!!stream && isCameraLoading)

  const handlePauseStream = () => {
    stopStream()
    setPaused(true)
  }

  const handleResumeStream = () => {
    setPaused(false)
  }

  useEffect(() => {
    if (stream || paused) {
      return
    }

    getStream()

    return () => {
      stopStream()
    }
  }, [getStream, stopStream, stream, paused])

  return (
    <OverlaySpinner isLoading={isLoading}>
      {displayStream && (
        <CameraView
          stream={stream}
          setIsCameraLoading={setIsCameraLoading}
          handlePauseStream={handlePauseStream}
          handleResumeStream={handleResumeStream}
          isPaused={paused}
        />
      )}
    </OverlaySpinner>
  )
}