import { makeStyles } from '@material-ui/core/styles';

const centered = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  topSellingPaper: {
    height: 570,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    position: 'relative'
  },
  divider: {
    backgroundColor: palette.secondary.light
  },
  title: {
    padding: spacing(3, 2.5, 3, 1.7),
    color: palette.grayColors[3]
  },
  displayMsg: {
    color: palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 18
  },
  displayMsgCell: {
    borderBottom: 'none',
    paddingTop: spacing(6.25)
  },
  topSellingContent: {
    overflow: 'auto',
    height: 480,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 420,
    maxWidth: '100%'
  },
  soldQtyDiv: {
    display: 'flex',
    justifyContent: 'center'
  },
  qtyData: {
    ...centered,
    height: spacing(3),
    fontSize: 14,
    width: spacing(3),
    borderRadius: '50%',
    backgroundColor: palette.grayColors[1],
    color: palette.secondary.main
  },
  tableHeadRow: {
    '& > th': {
      borderBottom: `1px solid ${palette.secondary.light}`,
      width: '98px',
      [breakpoints.down('md')]: {
        fontSize: 14
      },
      '&:nth-child(2)': {
        width: '110px'
      }
    }
  },
  tableBodyRow: {
    height: spacing(15),
    maxHeight: spacing(15),
    '& > td': {
      borderBottom: `1px solid ${palette.secondary.light}`,
      height: 'auto !important',
      maxHeight: spacing(15),
      [breakpoints.down('md')]: {
        fontSize: 14
      }
    },
    '&:last-child': {
      '& > td': {
        borderBottom: 'none'
      }
    }
  },
  paginationContainer: {
    ...centered,
    width: '100%',
    position: 'absolute',
    bottom: 15
  },
  arrowDiv: {
    ...centered,
    marginRight: spacing(0.8),
    marginLeft: spacing(0.8),
    cursor: 'pointer'
  },
  arrowIcon: {
    fontSize: spacing(3.8),
    color: palette.secondary.main
  }
}));
