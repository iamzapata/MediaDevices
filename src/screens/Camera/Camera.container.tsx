import { useEffect } from "react"
import { CameraView } from "./Camera.view"
import { useCameraModel } from "./camera.model"
import { AnalyticsTrackerService } from "../../services/AnalyticsTracker"
import { EVENT_NAMES } from "../../services/AnalyticsTracker/eventNames"

export const CameraContainer = () => {
  const { stream, error, isLoading, getStream, stopStream } = useCameraModel()

  useEffect(() => {
    if (stream) {
      return
    }

    getStream()

    return () => {
      stopStream()
    }
  }, [getStream, stopStream])

  if (isLoading) {
    AnalyticsTrackerService.track(EVENT_NAMES.CAMERA_SCREEN_LOADING)

    return <div>Loading...</div>
  }

  if (error) {
    AnalyticsTrackerService.track(EVENT_NAMES.CAMERA_SCREEN_ERROR)

    return <div>{error.message}</div>
  }

  if (!stream) {
    AnalyticsTrackerService.track(EVENT_NAMES.CAMERA_SCREEN_NO_STREAM)

    return <div>Stream is not available</div>
  }

  return <CameraView stream={stream} />
}
