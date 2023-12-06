/* ---- Methods ---- */

function myIP () {
  const url = 'https://api.ipify.org/?format=json'

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(json => resolve(json?.ip))
      .catch(error => reject(error))
  })
}

export default { myIP }
