import '@testing-library/jest-dom/extend-expect'

jest.mock('./constants/vite', () => ({
  VITE_API_URL: 'http://localhost:333',
}))

document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  //@ts-ignore
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})
