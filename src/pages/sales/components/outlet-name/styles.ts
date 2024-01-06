import MuiStoreIcon from '@mui/icons-material/StoreOutlined'

import { Box, IconButton, styled } from '@mui/material'

import { Typography } from '@mui/material'

export const StyledStoreIcon = styled(MuiStoreIcon)({
  borderRadius: 0,
  cursor: 'auto',

  '&:hover': {
    backgroundColor: 'unset',
  },
})

export const StyledIconButton = styled(IconButton)({
  '&.MuiIconButton-root': {
    borderRadius: 0,
    cursor: 'auto',

    '&:hover': {
      backgroundColor: 'unset',
    },
  },
})

export const OutletNameContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'auto',
})

export const StyledOutletName = styled(Typography)({
  fontWeight: 'bold',
  fontSize: 18,
  textDecoration: 'underline',
})

// export default makeStyles(({ spacing }) => ({
//   dropdownInput: {
//     width: 200,
//     height: 35,
//     margin: spacing(1),
//     '&:focus': {
//       backgroundColor: 'transparent !important',
//     },
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: -5,
//   },
//   outletWrapper: {
//     display: 'flex',
//     alignItems: 'center',
//     cursor: 'auto',
//   },
//   outletName: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     textDecoration: 'underline',
//   },
//   formControl: {
//     left: 6,
//     display: 'none',
//   },
// }))
