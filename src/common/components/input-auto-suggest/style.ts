import { Styles } from 'react-select'
import { Theme } from '@mui/material/styles'

export const selectStyles = ({
  spacing,
  palette,
}: Theme): Partial<Styles<any, boolean>> => ({
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
      backgroundColor: state.isSelected
        ? palette.grayColors[0]
        : palette.grayColors[1],
      cursor: state.isSelected ? 'auto' : 'pointer',
    },
    ':hover': {
      backgroundColor: state.isSelected
        ? palette.grayColors[0]
        : palette.grayColors[1],
    },
  }),
  indicatorsContainer: p => ({
    ...p,
    cursor: 'pointer',
  }),
})
