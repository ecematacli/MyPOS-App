import { makeStyles, Theme } from '@material-ui/core/styles';

interface StyleProps extends Theme {
  type: string;
}
export default makeStyles(({ spacing, palette }) => ({
  tableHeadRow: {
    borderTop: ({ type }: StyleProps) =>
      type === 'batchProducts' ? '1.9px solid #e9e9e9' : 'unset',
    width: '15.3%',
    '& > th': {
      color: palette.grayColors[3],
      '&:nth-child(2)': {
        width: '27%',
      },
      '&:nth-child(3)': {
        width: '27%',
      },
    },
  },
  firstHeadCell: {
    paddingLeft: ({ type }: StyleProps) =>
      type === 'batchProducts' ? 40 : 'unset',
  },
  noDisplayCell: {
    borderBottom: 'none',
    paddingTop: 50,
  },
  noDisplayMsg: {
    display: 'flex',
    justifyContent: 'center',
    color: palette.secondary.main,
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
