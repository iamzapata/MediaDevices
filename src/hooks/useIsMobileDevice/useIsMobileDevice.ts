import { useState, useEffect } from "react"

interface UseIsMobileDeviceReturn {
  isMobileDevice: boolean
}

export const useIsMobileDevice = (): UseIsMobileDeviceReturn => {
  const mobileMediaQuery = "(pointer: coarse)"

  const [isMobileDevice, setIsMobileDevice] = useState(
    window.matchMedia(mobileMediaQuery).matches
  )

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mobileMediaQuery)

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobileDevice(event.matches)
    }

    mediaQueryList.addEventListener("change", handleMediaQueryChange)

    return () =>
      mediaQueryList.removeEventListener("change", handleMediaQueryChange)
  }, [])

  return { isMobileDevice }
}
