import { CameraController } from "./Camera.controller"
import { CameraErrorBoundary } from "./components/CameraError"

export const CameraContainer = () => {
  return (
    <CameraErrorBoundary>
      <CameraController />
    </CameraErrorBoundary>
  )
}
