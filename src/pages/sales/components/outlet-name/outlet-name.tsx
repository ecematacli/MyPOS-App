import React, { useContext, useState } from 'react'
import {
  StyledOutletName,
  StyledStoreIcon,
  OutletNameContainer,
} from './styles'
import { IconButton } from '@mui/material'
import { AuthContext } from '../../../../contexts/AuthContext'
import { useCatalogInfo } from '../../../../contexts/CatalogInfoContext'

export const OutletName = () => {
  const { user } = useContext(AuthContext)
  const { outlets } = useCatalogInfo()

  const [selectedOutletId, setSelectedOutletId] = useState(user.role?.outletId)

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setSelectedOutletId(parseInt(event.target.value))

    // todo make the API request when admin changes the outlet
  }

  const outlet = outlets.find(outlet => outlet.id === user.role.outletId)

  return (
    <React.Fragment>
      {/* {isAdmin && (
        <TextField
          id='standard-select-currency'
          select
          label='Şube Seç'
          value={selectedOutletId}
          onChange={handleChange}
          InputProps={{ classes: { root: classes.dropdownInput } }}
          InputLabelProps={{
            classes: {
              root: classes.label,
              formControl: classes.formControl,
            },
          }}>
          {outlets.map(outlet => (
            <MenuItem key={outlet.id} value={outlet.id}>
              {outlet.name}
            </MenuItem>
          ))}
        </TextField>
      )} */}
      <OutletNameContainer>
        <StyledStoreIcon />
        <IconButton disableFocusRipple disableRipple>
          <StyledOutletName>{outlet?.name}</StyledOutletName>
        </IconButton>
      </OutletNameContainer>
    </React.Fragment>
  )
}
