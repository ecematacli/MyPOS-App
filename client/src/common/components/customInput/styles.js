import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => {
  return {
    input: {
      width: ({ inputType }) => (inputType === 'quickAddInput' ? 380 : 200),
      height: ({ inputType }) => (inputType === 'quickAddInput' ? 50 : 35),
      color: palette.textColor,
      borderColor: palette.secondary.dark,
      marginBottom: ({ inputType }) =>
        inputType === 'quickAddInput' ? 15 : null
    },
    formControlRoot: {
      width: ({ inputType }) => (inputType === 'quickAddInput' ? 380 : 200),
      height: ({ inputType }) => (inputType === 'quickAddInput' ? 50 : 35),
      marginBottom: ({ inputType }) =>
        inputType === 'quickAddInput' ? 15 : null
    }
  };
});
