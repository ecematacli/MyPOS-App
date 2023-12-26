import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@material-ui/core'
import { Align } from '../../../common/components/Align'
import { InputAutoSuggest } from '../../../common/components/InputAutoSuggest'
import { Page } from '../../../common/components/page'
import { useNewTransferState } from './useNewTransferState'
import styles from './styles'
import PlainTable from '../../../common/components/tables/plainTable'
import Alert from '@material-ui/lab/Alert'
import { Space } from '../../../common/components/Space'
import NewTransferProductRow from './NewStockTransferProductRow'

export const NewTransfer = () => {
  const history = useHistory()
  const classes = styles()
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
    <Align justify='space-between' align='center' width={10}>
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
    </Align>
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
      <Align vertical>
        <Align vertical width={25}>
          <InputLabel color='secondary' id='From'>
            From
          </InputLabel>
          <FormControl variant='outlined' className={classes.dropdownRoot}>
            <Select
              color='secondary'
              name='origin'
              labelId='From'
              onChange={changeOutlet}
              value={selectedOrigin}
              input={
                <OutlinedInput
                  classes={{
                    root: classes.dropdownInnerInput,
                    input: classes.dropdownInput,
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
          <FormControl variant='outlined' className={classes.dropdownRoot}>
            <Select
              color='secondary'
              name='destination'
              labelId='To'
              onChange={changeOutlet}
              value={selectedDestination}
              input={
                <OutlinedInput
                  classes={{
                    root: classes.dropdownInnerInput,
                    input: classes.dropdownInput,
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
        </Align>
        <Align justify='space-between' align='center' padding={[1]} width={25}>
          <Align align='center'>
            <Typography>Number of products: </Typography>
            <Typography>{products.length}</Typography>
          </Align>
          <Align align='center'>
            <Typography>Total quantity: </Typography>
            <Typography>
              {products.reduce((sum, p) => sum + p.qtyToTransfer, 0)}
            </Typography>
          </Align>
        </Align>
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
      </Align>
    </Page>
  )
}
