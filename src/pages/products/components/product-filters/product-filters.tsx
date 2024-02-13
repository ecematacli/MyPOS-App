import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'

import { useProductsFilters } from 'pages/products/use-product-filters'
import { useCategoriesQuery } from 'api/categories/use-categories-query'
import { useBrandsQuery } from 'api/brands/use-brands-query'

interface IProductsFilters {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  selectedCategoryId: number | null
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | null>>
}
export const ProductsFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategoryId,
  setSelectedCategoryId,
}: IProductsFilters) => {
  const { data: categories } = useCategoriesQuery()
  const { data: brands } = useBrandsQuery()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleInputReset = () => {
    setSearchQuery('')
  }

  const handleCategoryChange = (event: SelectChangeEvent<any>) => {
    setSelectedCategoryId(Number(event.target.value))
  }

  return (
    <Box display='flex' alignItems='center'>
      <OutlinedInput
        sx={{ width: '353px' }}
        name='name'
        placeholder='Ürün adı, sku veya barkod ile arama yap'
        value={searchQuery}
        onChange={handleInputChange}
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          searchQuery && (
            <InputAdornment position='end' onClick={handleInputReset}>
              <IconButton sx={{ padding: 0 }}>
                <CancelIcon />
              </IconButton>
            </InputAdornment>
          )
        }
      />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='category'>Kategori</InputLabel>
        <Select
          value={selectedCategoryId}
          label='Kategori'
          labelId='category'
          onChange={handleCategoryChange}>
          {categories?.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Marka</InputLabel>
        <Select
          value={selectedCategoryId}
          label='Marka'
          onChange={handleCategoryChange}>
          {categories?.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
