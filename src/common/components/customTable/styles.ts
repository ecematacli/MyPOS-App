import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  tableContainer: {
    width: '100%',
    marginTop: spacing(3),
    overflowX: 'auto',
    color: palette.secondary.main,
  },
  table: {
    width: '90%',
    maxWidth: '90%',
    margin: 'auto',
    borderCollapse: 'separate',
    borderSpacing: '0 15px',
  },
  tableHeadRow: {
    '& > th': {
      borderBottom: 'none',
      paddingBottom: 6,
      color: palette.grayColors[7],
      fontSize: 14,
      fontWeight: 600,
      [breakpoints.down('sm')]: {
        fontSize: 13,
      },
    },
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: spacing(2),
  },
  icon: {
    fontSize: spacing(3),
    color: palette.primary.dark,
  },
  paginationContainer: {
    marginTop: spacing(2),
    fontSize: spacing(2),
    width: '93%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  smallPagination: {
    [breakpoints.down('sm')]: {
      fontSize: 13,
    },
  },
  noDisplayCell: {
    borderBottom: 'none',
    paddingTop: 50,
  },
  noDisplayMsg: {
    display: 'flex',
    justifyContent: 'center',
    color: palette.grayColors[3],
    fontSize: spacing(2.25),
  },
}));
