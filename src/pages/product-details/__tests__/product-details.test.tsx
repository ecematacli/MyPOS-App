import React from 'react'
import { fireEvent } from '@testing-library/react'

import { render } from 'testUtils/render'
import { ProductDetailsPage } from 'pages/product-details/product-details'
import { ENKA_OUTLET_ID, KOZA_OUTLET_ID } from 'constants/outlets'

const product = {
  id: 3406,
  sku: 'NER30052NS',
  barcode: '887791165213',
  name: 'Nike Intensity Speed Rope Atlama İpi',
  price: 649.9,
  discountPrice: 649.9,
  inventoryLevels: [
    {
      outletId: 1,
      qty: 0,
    },
    {
      outletId: 2,
      qty: 0,
    },
  ],
  variation: 'US9,5',
  taxRate: 18,
  brand: {
    id: 4,
    name: 'Nike',
  },
  category: {
    id: 5,
    name: 'Atlama İpi',
  },
  deleted: false,
}

const mockMutate = jest.fn(updatedFields => updatedFields)

const setSelectedProductId = jest.fn()

const editCompleteButton = 'edit-complete-button'

jest.mock('api/categories/use-categories-query', () => ({
  useCategoriesQuery: jest.fn(() => ({
    data: [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
    ],
  })),
}))

jest.mock('api/brands/use-brands-query', () => ({
  useBrandsQuery: jest.fn(() => ({
    data: [
      { id: '1', name: 'Brand 1' },
      { id: '2', name: 'Brand 2' },
    ],
  })),
}))

jest.mock('api/product/use-product-query', () => ({
  useProductQuery: jest.fn(() => ({
    data: product,
  })),
}))

jest.mock('api/product/use-product-mutation', () => ({
  useEditProductMutation: () => ({
    mutate: mockMutate,
  }),
}))

const renderComponent = ({
  selectedProductId,
}: {
  selectedProductId?: number
} = {}) => {
  return render(
    <ProductDetailsPage
      selectedProductId={selectedProductId}
      setSelectedProductId={setSelectedProductId}
    />
  )
}
describe('ProductDetailsPage', () => {
  it('renders the page without crashing', () => {
    const { getByTestId } = renderComponent()

    expect(getByTestId('product-details')).toBeInTheDocument()
  })

  it('switches to the edit mode when the edit icon button is clicked', async () => {
    const { getByTestId, getAllByRole } = render(<ProductDetailsPage />)

    fireEvent.click(getByTestId('edit-icon-button'))

    expect(getAllByRole('textbox').length).toBe(8)
    expect(getAllByRole('spinbutton').length).toBe(2) // inventoryLevels number inputs
  })

  it('switches from edit mode to the display mode when the edit is done', async () => {
    const { getByTestId, queryAllByRole } = render(<ProductDetailsPage />)

    // Click on edit icon to switch to edit mode
    fireEvent.click(getByTestId('edit-icon-button'))
    expect(queryAllByRole('textbox').length).toBeGreaterThan(0)
    expect(queryAllByRole('spinbutton').length).toBeGreaterThan(0)

    // Click on complete button to switch to display mode and hide inputs
    fireEvent.click(getByTestId(editCompleteButton))
    expect(queryAllByRole('textbox').length).toBe(0)
    expect(queryAllByRole('spinbutton').length).toBe(0)
  })

  it('updates the product name input correctly', async () => {
    const { getByTestId, container } = render(
      <ProductDetailsPage selectedProductId={product.id} />
    )

    // Click on the product name to switch to edit mode
    fireEvent.click(getByTestId('product-name'))

    const nameInput = container.querySelector(
      `input[name="name"]`
    ) as HTMLInputElement

    expect(nameInput).toBeInTheDocument()

    // Change the product name input
    fireEvent.change(nameInput, { target: { value: 'New Product Name!!' } })

    expect(nameInput.value).toBe('New Product Name!!')

    // Click on complete button
    fireEvent.click(getByTestId(editCompleteButton))

    expect(mockMutate).toHaveBeenCalledWith({
      updatedField: {
        ...product,
        taxRate: String(product.taxRate),
        name: 'New Product Name!!',
      },
      productId: product.id,
    })
  })

  it('updates Enka inventory levels correctly', async () => {
    const { getByTestId, container } = render(
      <ProductDetailsPage selectedProductId={product.id} />
    )

    // Click on the enka quantity field to switch to edit mode
    fireEvent.click(getByTestId('enka-inventory-level'))

    const inventoryLevelInput = container.querySelector(
      `input[name="inventoryLevels"]`
    ) as HTMLInputElement

    expect(inventoryLevelInput).toBeInTheDocument()

    // Change the enka quantity input
    fireEvent.change(inventoryLevelInput, { target: { value: 55 } })

    expect(inventoryLevelInput.value).toBe('55')

    // Click on complete button
    fireEvent.click(getByTestId(editCompleteButton))

    expect(mockMutate).toHaveBeenCalledWith({
      updatedField: {
        ...product,
        taxRate: String(product.taxRate),
        inventoryLevels: product.inventoryLevels.map(item =>
          item.outletId === ENKA_OUTLET_ID ? { ...item, qty: 55 } : item
        ),
      },
      productId: product.id,
    })
  })

  it('updates Koza inventory levels correctly', async () => {
    const { getByTestId, container } = render(
      <ProductDetailsPage selectedProductId={product.id} />
    )

    // Click on the koza quantity field to switch to edit mode
    fireEvent.click(getByTestId('koza-inventory-level'))

    const inventoryLevelInput = container.querySelector(
      `input[name="inventoryLevels"]`
    ) as HTMLInputElement

    expect(inventoryLevelInput).toBeInTheDocument()

    // Change the koza quantity input
    fireEvent.change(inventoryLevelInput, { target: { value: 99.9 } })

    expect(inventoryLevelInput.value).toBe('99.9')

    // Click on complete button
    fireEvent.click(getByTestId(editCompleteButton))

    expect(mockMutate).toHaveBeenCalledWith({
      updatedField: {
        ...product,
        taxRate: String(product.taxRate),
        inventoryLevels: product.inventoryLevels.map(item =>
          item.outletId === KOZA_OUTLET_ID ? { ...item, qty: 99.9 } : item
        ),
      },
      productId: product.id,
    })
  })

  it('updates the barcode input correctly', async () => {
    const nonValidBarcode = 'ABCDYUIEYIQ00098BE'
    const validBarcode = '99999'

    const { getByTestId, container } = render(
      <ProductDetailsPage selectedProductId={product.id} />
    )

    // Click on the product name to switch to edit mode
    fireEvent.click(getByTestId('barcode'))

    const barcodeInput = container.querySelector(
      `input[name="barcode"]`
    ) as HTMLInputElement

    expect(barcodeInput).toBeInTheDocument()

    // Change the product barcode input
    fireEvent.change(barcodeInput, { target: { value: nonValidBarcode } })

    // Barcode can only contain numbers
    expect(barcodeInput.value).toBe(product.barcode)
    expect(barcodeInput.value).not.toBe(nonValidBarcode)

    // This time around, change the product name input to a valid barcode
    fireEvent.change(barcodeInput, { target: { value: validBarcode } })

    expect(barcodeInput.value).toBe(validBarcode)

    // Click on complete button
    fireEvent.click(getByTestId(editCompleteButton))

    expect(mockMutate).toHaveBeenCalledWith({
      updatedField: {
        ...product,
        taxRate: String(product.taxRate),
        barcode: validBarcode,
      },
      productId: product.id,
    })
  })

  it('updates the variation input correctly', async () => {
    const { getByTestId, container } = render(
      <ProductDetailsPage selectedProductId={product.id} />
    )

    // Click on the product variation to switch to edit mode
    fireEvent.click(getByTestId('variation'))

    const variationInput = container.querySelector(
      `input[name="variation"]`
    ) as HTMLInputElement

    expect(variationInput).toBeInTheDocument()

    // Change the product variation input
    fireEvent.change(variationInput, { target: { value: 'US9,9' } })

    expect(variationInput.value).toBe('US9,9')

    // Click on complete button
    fireEvent.click(getByTestId(editCompleteButton))

    expect(mockMutate).toHaveBeenCalledWith({
      updatedField: {
        ...product,
        taxRate: String(product.taxRate),
        variation: 'US9,9',
      },
      productId: product.id,
    })
  })

  it('updates the price input correctly', async () => {
    const { getByTestId, container } = render(
      <ProductDetailsPage selectedProductId={product.id} />
    )

    // Click on the product price to switch to edit mode
    fireEvent.click(getByTestId('price'))

    const priceInput = container.querySelector(
      `input[name="price"]`
    ) as HTMLInputElement

    expect(priceInput).toBeInTheDocument()

    // Change the product price input
    fireEvent.change(priceInput, { target: { value: '5x' } })
    // Check for invalid price input
    expect(priceInput.value).toBe(product.price.toString())

    fireEvent.change(priceInput, { target: { value: '5.000' } })
    expect(priceInput.value).toBe('5.000')

    // Click on complete button
    fireEvent.click(getByTestId(editCompleteButton))

    expect(mockMutate).toHaveBeenCalledWith({
      updatedField: {
        ...product,
        taxRate: String(product.taxRate),
        price: '5.000',
      },
      productId: product.id,
    })
  })

  it('updates the discount price input correctly', async () => {
    const { getByTestId, container } = render(
      <ProductDetailsPage selectedProductId={product.id} />
    )

    // Click on the product discount price to switch to edit mode
    fireEvent.click(getByTestId('discount-price'))

    const discountPriceInput = container.querySelector(
      `input[name="discountPrice"]`
    ) as HTMLInputElement

    expect(discountPriceInput).toBeInTheDocument()

    // Change the product discount price input
    fireEvent.change(discountPriceInput, { target: { value: '7,3' } })
    // Check for invalid discount price input
    expect(discountPriceInput.value).toBe(product.discountPrice.toString())

    fireEvent.change(discountPriceInput, { target: { value: '7.854' } })
    expect(discountPriceInput.value).toBe('7.854')

    // Click on complete button
    fireEvent.click(getByTestId(editCompleteButton))

    expect(mockMutate).toHaveBeenCalledWith({
      updatedField: {
        ...product,
        taxRate: String(product.taxRate),
        discountPrice: '7.854',
      },
      productId: product.id,
    })
  })

  it('updates the sku input correctly', async () => {
    const { getByTestId, container } = render(
      <ProductDetailsPage selectedProductId={product.id} />
    )

    // Click on the product sku to switch to edit mode
    fireEvent.click(getByTestId('sku'))

    const skuInput = container.querySelector(
      `input[name="sku"]`
    ) as HTMLInputElement

    expect(skuInput).toBeInTheDocument()

    // Change the product sku input
    fireEvent.change(skuInput, { target: { value: 'ABCDE921' } })
    expect(skuInput.value).toBe('ABCDE921')

    // Click on complete button
    fireEvent.click(getByTestId(editCompleteButton))

    expect(mockMutate).toHaveBeenCalledWith({
      updatedField: {
        ...product,
        taxRate: String(product.taxRate),
        sku: 'ABCDE921',
      },
      productId: product.id,
    })
  })

  it('updates the brand name input correctly', async () => {
    const { getByTestId, container } = render(
      <ProductDetailsPage selectedProductId={product.id} />
    )

    // Click on the product brand name to switch to edit mode
    fireEvent.click(getByTestId('brand'))

    const brandNameInput = container.querySelector(
      `input[name="brand"]`
    ) as HTMLInputElement

    expect(brandNameInput).toBeInTheDocument()

    // Change the product brand name input
    fireEvent.change(brandNameInput, { target: { value: 'Nikey nikey' } })
    expect(brandNameInput.value).toBe('Nikey nikey')

    // Click on complete button
    fireEvent.click(getByTestId(editCompleteButton))

    expect(mockMutate).toHaveBeenCalledWith({
      updatedField: {
        ...product,
        taxRate: String(product.taxRate),
        brand: {
          ...product.brand,
          name: 'Nikey nikey',
        },
      },
      productId: product.id,
    })
  })

  it('updates the category name input correctly', async () => {
    const { getByTestId, container } = render(
      <ProductDetailsPage selectedProductId={product.id} />
    )

    // Click on the product category name to switch to edit mode
    fireEvent.click(getByTestId('category'))

    const categoryNameInput = container.querySelector(
      `input[name="category"]`
    ) as HTMLInputElement

    expect(categoryNameInput).toBeInTheDocument()

    // Change the product category name input
    fireEvent.change(categoryNameInput, { target: { value: 'Raket' } })
    expect(categoryNameInput.value).toBe('Raket')

    // Click on complete button
    fireEvent.click(getByTestId(editCompleteButton))

    expect(mockMutate).toHaveBeenCalledWith({
      updatedField: {
        ...product,
        taxRate: String(product.taxRate),
        category: {
          ...product.category,
          name: 'Raket',
        },
      },
      productId: product.id,
    })
  })

  it('updates miscellaneous product input fields at once', async () => {
    const { getByTestId, container } = render(
      <ProductDetailsPage selectedProductId={product.id} />
    )

    // Click on the product category name to switch to edit mode
    fireEvent.click(getByTestId('category'))
    fireEvent.click(getByTestId('product-name'))
    fireEvent.click(getByTestId('koza-inventory-level'))
    fireEvent.click(getByTestId('barcode'))

    const barcodeInput = container.querySelector(
      `input[name="barcode"]`
    ) as HTMLInputElement
    const inventoryLevelInput = container.querySelector(
      `input[name="inventoryLevels"]`
    ) as HTMLInputElement

    const nameInput = container.querySelector(
      `input[name="name"]`
    ) as HTMLInputElement

    const categoryNameInput = container.querySelector(
      `input[name="category"]`
    ) as HTMLInputElement

    // Change inputs
    fireEvent.change(barcodeInput, { target: { value: '98765' } })
    fireEvent.change(inventoryLevelInput, { target: { value: '3' } })
    fireEvent.change(nameInput, { target: { value: 'newbie' } })
    fireEvent.change(categoryNameInput, { target: { value: 'Kordaj' } })

    expect(barcodeInput.value).toBe('98765')
    expect(inventoryLevelInput.value).toBe('3')
    expect(nameInput.value).toBe('newbie')
    expect(categoryNameInput.value).toBe('Kordaj')

    // Click on complete button
    fireEvent.click(getByTestId(editCompleteButton))

    expect(mockMutate).toHaveBeenCalledWith({
      productId: product.id,
      updatedField: {
        ...product,
        taxRate: String(product.taxRate),
        barcode: '98765',
        name: 'newbie',
        category: {
          ...product.category,
          name: 'Kordaj',
        },
        inventoryLevels: product.inventoryLevels.map(item =>
          item.outletId === KOZA_OUTLET_ID ? { ...item, qty: 3 } : item
        ),
      },
    })
  })
})
