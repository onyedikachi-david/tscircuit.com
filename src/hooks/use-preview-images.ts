import { useState } from "react"

interface UsePreviewImagesProps {
  packageName?: string
}

export function usePreviewImages({ packageName }: UsePreviewImagesProps) {
  const [imageStatus, setImageStatus] = useState<
    Record<string, "loading" | "loaded" | "error">
  >({
    "3d": "loading",
    pcb: "loading",
    schematic: "loading",
  })

  const views = [
    {
      id: "3d",
      label: "3D View",
      imageUrl: packageName
        ? `https://registry-api.tscircuit.com/snippets/images/${packageName}/3d.png`
        : undefined,
    },
    {
      id: "pcb",
      label: "PCB View",
      imageUrl: packageName
        ? `https://registry-api.tscircuit.com/snippets/images/${packageName}/pcb.png`
        : undefined,
    },
    {
      id: "schematic",
      label: "Schematic View",
      imageUrl: packageName
        ? `https://registry-api.tscircuit.com/snippets/images/${packageName}/schematic.png`
        : undefined,
    },
  ]

  const handleImageLoad = (viewId: string) => {
    setImageStatus((prev) => ({
      ...prev,
      [viewId]: "loaded",
    }))
  }

  const handleImageError = (viewId: string) => {
    setImageStatus((prev) => ({
      ...prev,
      [viewId]: "error",
    }))
  }

  const availableViews = views
    .map((view) => ({
      ...view,
      status: imageStatus[view.id],
      onLoad: () => handleImageLoad(view.id),
      onError: () => handleImageError(view.id),
    }))
    .filter((view) => view.status !== "error")

  return {
    availableViews,
  }
}
