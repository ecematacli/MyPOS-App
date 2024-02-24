import React from 'react'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import ClearIcon from '@mui/icons-material/Clear'

import { useCategoriesQuery } from 'api/categories/use-categories-query'
import { useBrandsQuery } from 'api/brands/use-brands-query'

interface IProductsFilters {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  selectedCategoryId: string
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>
  selectedBrandId: string
  setSelectedBrandId: React.Dispatch<React.SetStateAction<string>>
}
export const ProductsTableFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedBrandId,
  setSelectedBrandId,
}: IProductsFilters) => {
  const { data: categories } = useCategoriesQuery()
  const { data: brands } = useBrandsQuery()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleInputReset = () => {
    setSearchQuery('')
  }

  const handleCategoryIdReset = () => {
    setSelectedCategoryId('')
  }

  const handleBrandIdReset = () => {
    setSelectedBrandId('')
  }

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategoryId(event.target.value)
  }

  const handleBrandChange = (event: SelectChangeEvent<string>) => {
    setSelectedBrandId(event.target.value)
  }

  return (
    <Box display='flex' alignItems='center'>
      <OutlinedInput
        sx={{ width: '353px' }}
        name='name'
        placeholder='Ürün adı, sku veya barkod ile arama yap'
        data-testid='product-search-input'
        value={searchQuery}
        autoComplete='off'
        onChange={handleInputChange}
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          searchQuery && (
            <InputAdornment position='end'>
              <IconButton
                data-testid='cancel-icon-button'
                onClick={handleInputReset}
                sx={{ padding: 0 }}>
                <CancelIcon />
              </IconButton>
            </InputAdornment>
          )
        }
      />
      <FormControl sx={{ m: 1, width: 120 }}>
        <InputLabel id='category'>Kategori</InputLabel>
        <Select
          value={selectedCategoryId}
          label='Kategori'
          labelId='category'
          onChange={handleCategoryChange}>
          <MenuItem value='' onClick={handleCategoryIdReset}>
            <ClearIcon />
          </MenuItem>
          {categories?.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: 120 }}>
        <InputLabel id='brand'>Marka</InputLabel>
        <Select
          value={selectedBrandId}
          label='Marka'
          labelId='brand'
          onChange={handleBrandChange}>
          <MenuItem value='' onClick={handleBrandIdReset}>
            <ClearIcon />
          </MenuItem>
          {brands?.map(brand => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
