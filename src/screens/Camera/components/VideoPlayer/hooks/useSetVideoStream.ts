import { useEffect } from "react"

export const useSetVideoStream = (
  videoRef: React.RefObject<HTMLVideoElement>,
  stream: MediaStream | null
) => {
  useEffect(() => {
    if (!videoRef.current) return
    if (!stream) return

    videoRef.current.srcObject = stream
  }, [videoRef, stream])
}
