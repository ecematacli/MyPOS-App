import { useState } from 'react'

export const useToggleState = (initialVal: boolean): [boolean, () => void] => {
  const [state, setState] = useState(initialVal)

  const toggleState = () => {
    setState(!state)
  }

  return [state, toggleState]
}
