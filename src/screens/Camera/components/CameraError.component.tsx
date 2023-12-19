import { useTrackScreenView } from "../../../hooks/useTrackScreenView"

export const CameraError = () => {
  useTrackScreenView(CameraError.displayName)

  return <div>Camera error</div>
}

CameraError.displayName = "CameraError"
