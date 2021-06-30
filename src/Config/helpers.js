export const generateSearchParams = (state) => {
  const params = new URLSearchParams()

  for (let [key, value] of Object.entries(state)) {
    if (value) params.append(key, value)
  }

  return params
}
