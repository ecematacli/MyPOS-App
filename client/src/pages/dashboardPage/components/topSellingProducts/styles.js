import { makeStyles } from '@material-ui/core/styles';

const centered = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default makeStyles(({ spacing, palette }) => ({
  topSellingPaper: {
    height: 570,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    marginRight: 10,
    position: 'relative'
  },
  divider: {
    backgroundColor: palette.secondary.light
  },
  title: {
    padding: spacing(3, 2.5),
    color: palette.grayColors[3]
  },
  noDisplayMsg: {
    color: palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 18
  },
  noDisplayCell: {
    borderBottom: 'none',
    paddingTop: 50
  },
  topSellingContent: {
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
    height: spacing(3),
    fontSize: 14,
    width: spacing(3),
    borderRadius: '50%',
    backgroundColor: palette.grayColors[1],
    color: palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableHeadRow: {
    '& > th': {
      borderBottom: `1px solid ${palette.secondary.light}`,
      width: '98px',
      '&:nth-child(2)': {
        width: '110px'
      }
    }
  },
  tableBodyRow: {
    height: 120,
    '& > td': {
      borderBottom: `1px solid ${palette.secondary.light}`,
      maxWidth: '98px',
      maxHeight: 120,
      '&:nth-child(2)': {
        maxWidth: '110px'
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
