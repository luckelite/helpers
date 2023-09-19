/* ---- Constants ---- */

function keyToken() {
  return 'token-sistema'
}

const token = receberToken()

/* ---- Methods ---- */

function detectarTokenOk () {
  if (!receberToken()) return false
  else if (detectarTokenExpirado()) return false
  else return true
}

function detectarTokenExpirado () {
  const expiracao = timestamp()
  const agora = Number(new Date().getTime() / 1000).toFixed(0)
  const soma = expiracao - agora
  return (soma < 0)
}

/* ---- Data From Token ---- */

function timestamp () {
  return lerToken(token)?.exp || 0
}

function dadosToken () {
  return lerToken(token)?.data || 0
}

/* ---- Local Storage ---- */

function receberToken () {
  return window.localStorage.getItem(keyToken()) || false
}

/* ---- Aux Funtions ---- */

function lerToken (token) {
  if (!token) return

  const regex = /\.([^.]+)\./
  const payload = token?.match(regex)
  if (!payload) return false

  const tokenDecriptado = decodificarBase64(payload[1])
  return JSON.parse(tokenDecriptado)
}

function decodificarBase64 (token) {
  if (!token) return

  const conteudoToken = window
    .atob(token)
    .split('')
    .map(char => {
      const charCode = char.charCodeAt(0).toString(16)
      return '%' + ('00' + charCode).slice(-2)
    })
    .join('')

  return window.decodeURIComponent(conteudoToken)
}

export default {
  keyToken,
  detectarTokenOk,
  receberToken,
  dadosToken
}
