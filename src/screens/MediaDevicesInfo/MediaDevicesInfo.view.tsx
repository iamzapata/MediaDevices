import { useTrackScreenView } from "../../hooks/useTrackScreenView"
import { ScreenNames } from "../types"

export const MediaDevicesInfoView = () => {
  useTrackScreenView(ScreenNames.MEDIA_DEVICES_INFO_VIEW)

  return <div>MediaDevicesInfoView</div>
}
