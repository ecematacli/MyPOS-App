import { UseMutationResult, useMutation } from '@tanstack/react-query'

import { editProduct } from './product-service'
import { Product } from 'types/products'

export interface IEditActionArgs {
  updatedField: Product
  productId: number
}

export const useEditProductMutation = (): UseMutationResult => {
  return useMutation({
    mutationFn: ({ updatedField, productId }: IEditActionArgs) =>
      editProduct(productId, updatedField),
  })
}
