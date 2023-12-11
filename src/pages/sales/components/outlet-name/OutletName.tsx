import React, { useContext, useState } from 'react'
import StoreIcon from '@material-ui/icons/StoreOutlined'
import styles from './styles'
import {
  Typography,
  makeStyles,
  TextField,
  MenuItem,
  IconButton,
  Box,
} from '@material-ui/core'
import { AuthContext } from '../../../../contexts/AuthContext'

const outlets = [
  {
    id: 0,
    name: 'Enka',
  },
  {
    id: 1,
    name: 'Koza',
  },
]

export const OutletName = () => {
  const classes = styles()
  const { user } = useContext(AuthContext)

  const [selectedOutlet, setSelectedOutlet] = useState(user.outlet.name)
  console.log(user.outlet.name)
  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log({ value: event.target.value })
    setSelectedOutlet(event.target.value as string)
  }

  return (
    <React.Fragment>
      {user.role === 'admin' && (
        <TextField
          id='standard-select-currency'
          select
          label='Şube Seç'
          value={selectedOutlet}
          onChange={handleChange}
          InputProps={{ classes: { root: classes.dropdownInput } }}
          InputLabelProps={{
            classes: {
              root: classes.label,
              formControl: classes.formControl,
            },
          }}>
          {outlets.map(outlet => (
            <MenuItem key={outlet.id} value={outlet.name}>
              {outlet.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      <Box className={classes.outletWrapper}>
        <StoreIcon className={classes.iconBtn} />
        <IconButton
          classes={{ root: classes.iconBtn }}
          disableFocusRipple
          disableRipple>
          <Typography className={classes.outletName}>
            {user.outlet.name.toLocaleUpperCase('tr-TR')}
          </Typography>
        </IconButton>
      </Box>
    </React.Fragment>
  )
}
