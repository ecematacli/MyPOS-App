export interface UploadSuccess {
  id: number
  date: string
  created: any[]
  updated: {
    id: number
    barcode: string
    name: string
    ordered: number
    prevQty: number
    variation: string
  }[]
}

export interface UploadError {
  message: string
  validationErrors: {
    rows: number[]
    errorType: string
  }[]
}
