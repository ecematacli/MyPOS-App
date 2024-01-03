import { makeStyles } from '@mui/styles'

export default makeStyles(({ spacing, palette }) => ({
  tableBodyRow: {
    height: spacing(10),
    maxHeight: spacing(10),
    '& *': {
      color: palette.grayColors[3],
    },
    '& > td': {
      borderBottom: '1px solid #e9e9e9',
      height: 'auto',
      maxHeight: spacing(10),
      '&:last-child': {
        '& > td': {
          borderBottom: 'none',
        },
      },
    },
  },
  batchNameCell: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}))
