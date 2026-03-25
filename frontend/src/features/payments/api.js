export function pay(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        reference: `PG-${Date.now()}`
      })
    }, 1200)
  })
}
