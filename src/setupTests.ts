import '@testing-library/jest-dom/extend-expect';

document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  //@ts-ignore
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
});
