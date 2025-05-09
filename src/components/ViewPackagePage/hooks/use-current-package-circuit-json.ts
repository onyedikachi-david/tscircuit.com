import { useCurrentPackageId } from "@/hooks/use-current-package-id"
import { usePackageFile } from "@/hooks/use-package-files"
import { useEffect, useState } from "react"

export function useCurrentPackageCircuitJson() {
  const { packageId } = useCurrentPackageId()

  const [circuitJson, setCircuitJson] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Try to load circuit.json from the standard location
  const { data: circuitJsonFile, isError } = usePackageFile(
    packageId
      ? {
          package_id: packageId,
          file_path: "dist/circuit.json",
        }
      : null,
    {
      cacheTime: 60_000 * 2,
      staleTime: 60_000 * 2,
    },
  )

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    if (circuitJsonFile) {
      try {
        const parsedCircuitJson = JSON.parse(circuitJsonFile.content_text!)
        setCircuitJson(parsedCircuitJson)
        setIsLoading(false)
      } catch (e) {
        setError("Invalid circuit.json format")
        setIsLoading(false)
      }
    } else if (isError) {
      setError("Circuit JSON not found in package")
      setIsLoading(false)
    }
  }, [circuitJsonFile, isError])

  return { circuitJson, isLoading, error }
}
