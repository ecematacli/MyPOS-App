import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  tableBodyRow: {
    cursor: 'pointer',
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)'
  },
  tableCell: {
    paddingTop: spacing(4),
    paddingBottom: spacing(4),
    height: spacing(14.37),
    maxHeight: spacing(14.37),
    [breakpoints.down('sm')]: {
      fontSize: 13
    },
    color: 'inherit',
    fontWeight: spacing(62.5),
    borderBottom: `1px solid ${palette.secondary.light}`,
    '&:last-child': {
      paddingRight: spacing(3)
    }
  },
  firstCellContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  firstCellItem: {
    marginLeft: '-5px'
  },
  greenRow: {
    background: palette.greenColors[2]
  },
  whiteRow: {
    background: palette.whiteColors[0]
  }
}));
