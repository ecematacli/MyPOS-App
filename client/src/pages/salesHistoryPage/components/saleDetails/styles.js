import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  salesDetailsContainer: {
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    overflow: 'auto',
    marginTop: '-14.8px',
    paddingTop: spacing(3),
    paddingBottom: spacing(4),
    fontSize: 14,
    borderTop: 'transparent',
    color: palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: ({ rowIndex }) =>
      rowIndex % 2 ? `${palette.whiteColors[0]}` : '#f8fdf8'
  },
  table: {
    marginBottom: 0,
    width: '90%',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  tableHeadRow: {
    '& > th': {
      borderBottom: `1px solid ${palette.whiteColors[0]}`,
      paddingBottom: 6,
      fontSize: 14,
      fontWeight: 700,
      color: palette.grayColors[7]
    }
  },
  tableBodyRow: {
    height: spacing(3),
    '&:last-child': {
      '& > td': {
        borderBottom: 'none'
      }
    },
    '& > td': {
      fontWeight: 545,
      fontSize: 14,
      padding: spacing(2),
      borderBottom: '0.5px solid #eee',
      color: 'inherit'
    }
  },
  detailTotal: {
    width: '90%',
    height: spacing(6),
    background: ({ rowIndex }) => (rowIndex % 2 ? '#F1F1F1' : '#efffef'),
    margin: 'auto',
    marginTop: spacing(4),
    marginBottom: spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  total: {
    width: '100%',
    paddingRight: spacing(5),
    color: 'inherit',
    fontWeight: 'bold',
    fontSize: 16
  }
}));
