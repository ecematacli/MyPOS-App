import { makeStyles } from '@material-ui/core/styles';

import { Props } from './index';

export default makeStyles(({ spacing, breakpoints }) => ({
  titleContainer: {
    height: 50,
    margin: spacing(7, 0, 1.2),
    marginBottom: ({ type }: Props) => (type === 'countBatches' ? -2 : 'unset'),
    [breakpoints.down('md')]: {
      marginTop: spacing(8),
    },
    position: 'relative',
    display: 'block',
  },
  titleWrapperDiv: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: '1100px',
  },
  inventoryCountActionsContainer: {
    backgroundColor: '#f1f3f5',
    position: 'relative',
    display: 'block',
    padding: spacing(3.5, 6),
  },
  actionSectionWrapper: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '1100px',
  },
}));
