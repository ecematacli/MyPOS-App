import { makeStyles } from '@material-ui/core/styles';

import { Props } from './index';

export default makeStyles(({ palette, spacing, breakpoints }) => ({
  titleContainer: {
    display: 'block',
    position: 'relative',
    padding: ({ type }: Props) =>
      type === 'countBatches' ? spacing(0.8, 6, 0) : spacing(0.8, 6, 2),
    marginTop: spacing(5),
    [breakpoints.down('md')]: {
      marginTop: spacing(8.5),
    },
  },
  titleWrapperDiv: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: spacing(137.5),
  },
  inventoryCountActionsContainer: {
    backgroundColor: palette.grayColors[18],
    display: 'block',
    padding: spacing(3.5, 6),
    position: 'sticky',
    top: 0,
    zIndex: 99,
  },
  actionSectionWrapper: {
    display: 'block',
    margin: '0 auto',
    maxWidth: spacing(137.5),
  },
}));
