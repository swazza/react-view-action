export const increment = (state, props) => {
  return {
    count: state.count + 1
  }
}

export const decrement = (state, props) => {
  return {
    count: state.count - 1
  }
}
