import { create } from "zustand"
import { devtools, persist, createJSONStorage } from "zustand/middleware"

import {
  createCameraScreenSlice,
  CameraScreenSlice
} from "../screens/Camera/store"

export const useGlobalStore = create<CameraScreenSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createCameraScreenSlice(...a)
      }),
      {
        name: "camera-playgrond-store",
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)
