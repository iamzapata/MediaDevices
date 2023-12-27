import "./App.css"
import { DesktopLayout } from "./components/layouts/Desktop"
import { MobileLayout } from "./components/layouts/Mobile"
import { Tabs } from "./components/ui/Tabs"
import { useIsMobileDevice } from "./hooks/useIsMobileDevice"
import { keyMirror } from "./lib/keyMirror"
import { ActivityTraceContainer } from "./screens/ActivityTracer"
import { CameraContainer } from "./screens/Camera"
import { MediaDevicesInfoContainer } from "./screens/MediaDevicesInfo"
import { AnalyticsTrackerService } from "./services/AnalyticsTrackerService"
import { EVENT_NAMES } from "./services/AnalyticsTrackerService/eventNames"

const TabNames = keyMirror({
  Camera: null,
  DevicesInfo: null,
  ActivityTace: null
})

function App() {
  AnalyticsTrackerService.track(EVENT_NAMES.CLIENT_STARTED)

  const { isMobileDevice } = useIsMobileDevice()

  const tabs = [
    { label: TabNames.Camera, content: CameraContainer },
    { label: TabNames.DevicesInfo, content: MediaDevicesInfoContainer },
    { label: TabNames.ActivityTace, content: ActivityTraceContainer }
  ]

  if (isMobileDevice) {
    return (
      <MobileLayout>
        <Tabs tabs={tabs} />
      </MobileLayout>
    )
  }

  return (
    <DesktopLayout>
      <Tabs tabs={tabs} />
    </DesktopLayout>
  )
}

export default App
