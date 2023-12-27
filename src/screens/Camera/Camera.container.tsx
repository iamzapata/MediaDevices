import { CameraErrorBoundary } from "./components/CameraError"
import { CameraController } from "./Camera.controller"

export const CameraContainer = () => {
  return (
    <CameraErrorBoundary>
      <CameraController />
    </CameraErrorBoundary>
  )
}
