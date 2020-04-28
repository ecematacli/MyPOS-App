import { makeStyles, Theme } from '@material-ui/core/styles';

interface StyleProps extends Theme {
  type: string;
}
export default makeStyles(({ spacing, palette }) => ({
  table: {
    '& *': {
      color: palette.grayColors[16],
    },
  },
  tableHeadRow: {
    borderTop: ({ type }: StyleProps) =>
      type === 'batchProducts' ? '1.9px solid #e9e9e9' : 'unset',
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
  paginationDiv: {
    marginTop: spacing(2),
    marginBottom: spacing(5),
    fontSize: spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
