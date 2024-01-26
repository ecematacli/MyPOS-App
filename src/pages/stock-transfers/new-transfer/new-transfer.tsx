import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material'
import Alert from '@mui/material/Alert'

import { Page } from '../page/page'
import { InputAutoSuggest } from '../../../common/components/input-auto-suggest/input-auto-suggest'
import { useNewTransferState } from './use-new-transfer-state'
import { PlainTable } from '../../../common/components/tables/plain-table/plain-table'
import { Space } from '../../../common/components/Space'
import { NewTransferProductRow } from './new-stock-transfer-product-row'

export const NewTransfer = () => {
  const history = useHistory()
  const {
    products,
    addProduct,
    searchProducts,
    submit,
    outlets,
    getOutletsError,
    selectedDestination,
    selectedOrigin,
    changeOutlet,
    changeQtyToTransfer,
  } = useNewTransferState()

  const Actions = (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      width={'10em'}>
      <Button
        onClick={() => history.push('/inventory/stock-transfers')}
        variant='contained'
        style={{ marginRight: 8, color: 'white', background: 'red' }}>
        Back
      </Button>
      <Button
        onClick={submit}
        variant='contained'
        color='primary'
        style={{ color: 'white' }}>
        Submit
      </Button>
    </Box>
  )

  return (
    <Page
      title='New Stock Transfer'
      description='Transfer products between stores'
      loading={false}
      actions={Actions}>
      {getOutletsError && (
        <Alert elevation={6} variant='filled' severity='error'>
          {`Error while fetching outlets: ${getOutletsError.message}`}
        </Alert>
      )}
      <Box display='flex' flexDirection='column'>
        <Box display='flex' flexDirection='column' width={'25em'}>
          <InputLabel color='secondary' id='From'>
            From
          </InputLabel>
          <FormControl variant='outlined' sx={{ width: '246px' }}>
            <Select
              color='secondary'
              name='origin'
              labelId='From'
              onChange={changeOutlet}
              value={selectedOrigin}
              input={
                <OutlinedInput
                  sx={{
                    root: { height: '35px', backgroundColor: 'none' },
                    input: { width: '246px' },
                  }}
                />
              }>
              <MenuItem hidden value={0}>
                Please select
              </MenuItem>
              {outlets.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Space half />
          <InputLabel color='secondary' id='To'>
            To
          </InputLabel>
          <FormControl variant='outlined' sx={{ width: '246px' }}>
            <Select
              color='secondary'
              name='destination'
              labelId='To'
              onChange={changeOutlet}
              value={selectedDestination}
              input={
                <OutlinedInput
                  sx={{
                    root: { height: '35px', backgroundColor: 'none' },
                    input: { width: '246px' },
                  }}
                />
              }>
              <MenuItem hidden value={0}>
                Please select
              </MenuItem>
              {outlets.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          padding={'1em'}
          width={'25em'}>
          <Box display='flex' alignItems='center'>
            <Typography>Number of products: </Typography>
            <Typography>{products.length}</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Typography>Total quantity: </Typography>
            <Typography>
              {products.reduce((sum, p) => sum + p.qtyToTransfer, 0)}
            </Typography>
          </Box>
        </Box>
        <InputAutoSuggest
          loadOptions={searchProducts}
          selectOption={addProduct}
          isQuickScanMode
        />
        <PlainTable
          tableHeads={[
            { name: 'Barcode' },
            { name: 'SKU' },
            { name: 'Name / variation' },
            { name: 'Quantity at hand' },
            { name: 'Quantity to transfer' },
          ]}
          hasDataToShow={products.length > 0}
          rows={products.map(p => (
            <NewTransferProductRow
              key={p.id}
              row={p}
              changeQty={changeQtyToTransfer(p.id)}
            />
          ))}
          tableFor='StockTransferProducts'
        />
      </Box>
    </Page>
  )
}
