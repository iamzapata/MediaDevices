import { useTrackScreenView } from "../../../hooks/useTrackScreenView"

export const CameraScreenNotAvailable = () => {
  useTrackScreenView(CameraScreenNotAvailable.displayName)
  return <div>Stream is not available</div>
}

CameraScreenNotAvailable.displayName = "CameraScreenNotAvailable"
