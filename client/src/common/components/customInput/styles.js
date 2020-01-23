import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette }) => {
  return {
    input: {
      width: ({ inputType }) => (inputType === 'quickAddInput' ? 380 : 246),
      height: ({ inputType }) => (inputType === 'quickAddInput' ? 50 : 35),
      color: palette.textColor,
      borderColor: palette.secondary.dark,
      marginBottom: ({ inputType }) =>
        inputType === 'quickAddInput' ? 15 : null
    },
    formControlRoot: {
      width: ({ inputType }) => (inputType === 'quickAddInput' ? 380 : 246),
      height: ({ inputType }) => (inputType === 'quickAddInput' ? 50 : 'unset'),
      marginBottom: ({ inputType }) =>
        inputType === 'quickAddInput' ? 15 : 'unset'
    },
    selectInput: {
      height: ({ inputType }) => (inputType === 'editInput' ? 35 : 50)
    }
  };
});
