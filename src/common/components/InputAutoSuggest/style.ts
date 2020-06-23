import { makeStyles, Theme } from '@material-ui/core'
import { Styles } from 'react-select'

export default makeStyles(({ spacing, breakpoints, palette }) => ({
  suggestionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: spacing(8),
    width: '100%',
    color: palette.grayColors[3],
    [breakpoints.down('xl')]: {
      ' & > * ': {
        fontSize: 14,
      },
    },
    [breakpoints.down('sm')]: {
      ' & > * ': {
        fontSize: 13,
      },
    },
  },
  suggestedCommon: {
    color: palette.grayColors[3],
  },
  suggestedItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionGroup: {
    display: 'flex',
  },
}))

export const selectStyles = ({ spacing, palette }: Theme): Partial<Styles> => ({
  menu: provided => ({
    ...provided,
    zIndex: 999,
    marginTop: '.2em',
  }),

  container: provided => ({
    ...provided,
    width: '100%',
  }),
  input: provided => ({
    ...provided,
  }),
  valueContainer: base => ({
    ...base,
    minHeight: spacing(7),
  }),
  option: (base, state) => ({
    ...base,
    cursor: 'pointer',
    ':active': {
      backgroundColor: state.isSelected ? palette.grayColors[0] : palette.grayColors[1],
      cursor: state.isSelected ? 'auto' : 'pointer',
    },
    ':hover': {
      backgroundColor: state.isSelected ? palette.grayColors[0] : palette.grayColors[1],
    },
  }),
})
