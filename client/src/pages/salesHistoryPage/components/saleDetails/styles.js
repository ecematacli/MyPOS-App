import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  salesDetailsContainer: {
    // maxHeight: '500px',
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    overflowY: 'auto',
    overflowX: 'auto',
    marginTop: '-14.8px',
    paddingTop: spacing(3),
    paddingBottom: spacing(4),
    fontSize: 14,
    color: palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: ({ rowIndex }) => (rowIndex % 2 ? '#fff' : '#f8fdf8')
  },
  table: {
    marginBottom: 0,
    width: '90%',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  tableHeadCell: {
    fontSize: 14,
    width: '15%',
    '&:nth-child(2)': {
      width: '24%'
    },
    '&:nth-child(3)': {
      width: '10%'
    },
    '&:last-child': {
      width: '20%',
      textAlign: 'right'
    },
    '&:nth-child(n+4)': {
      textAlign: 'right'
    }
  },
  tableHeadRow: {
    '& > th': {
      borderBottom: '1px solid #eee',
      paddingBottom: 6,
      fontWeight: 700,
      color: palette.secondary.tableHead
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
      '&:nth-child(n+4)': {
        textAlign: 'right'
      },
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
