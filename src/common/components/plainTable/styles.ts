import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
    width: '60%',
    '& *': {
      color: palette.grayColors[3],
    },
  },
  tableHeadRow: {
    borderBottom: `1px solid ${palette.secondary.light}`,
    width: '15.3%',
    '& > th': {
      '&:nth-child(2)': {
        width: '27%',
      },
      '&:nth-child(3)': {
        width: '27%',
      },
    },
  },
  firstHeadCell: {
    paddingLeft: spacing(2),
  },
  paginationDiv: {
    marginTop: spacing(2),
    marginBottom: spacing(5),
    fontSize: spacing(2),
    width: '63%',
  },
}));
