import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  tableBodyRow: {
    cursor: 'pointer',
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    '& > td': {
      paddingTop: spacing(4),
      paddingBottom: spacing(4),
      height: spacing(12.5),
      maxHeight: spacing(12.5),
      [breakpoints.down('sm')]: {
        fontSize: 13,
      },
      color: 'inherit',
      fontWeight: spacing(62.5),
      borderBottom: `1px solid ${palette.secondary.light}`,
      '&:last-child': {
        paddingRight: spacing(3),
      },
    },
  },
  greenRow: {
    background: palette.greenColors[2],
  },
  whiteRow: {
    background: palette.whiteColors[0],
  },
  blueChip: {
    color: '#4c92d3',
    borderColor: '#4c92d3',
  },
  redChip: {
    color: '#d84545',
    borderColor: '#d84545',
  },
  greenChip: {
    color: '#4caf50',
    borderColor: '#4caf50',
  },
}))
