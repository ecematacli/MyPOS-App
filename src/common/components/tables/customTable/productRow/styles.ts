import { makeStyles } from '@mui/styles'

interface StyleProps {
  type: boolean
}

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  tableBodyRow: {
    cursor: ({ type }: StyleProps) => (!type ? 'pointer' : 'unset'),
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
  },
  tableCell: {
    padding: spacing(4, 1),
    minHeight: spacing(14.37),
    fontSize: 14,
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
  firstCellContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  firstCellItem: {
    marginLeft: '-5px',
  },
  greenRow: {
    background: palette.greenColors[2],
  },
  whiteRow: {
    background: palette.whiteColors[0],
  },
}))
