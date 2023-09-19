/* ---- Methods ---- */

const email = (content) => {
  const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return pattern.test(content)
}

const cep = (content) => {
  const cep = content.replace(/[^0-9]/g, '')
  const pattern = /^[0-9]{8}$/
  return pattern.test(cep)
}

const cpf = (content) => {
  const cpf = content.replace(/[^0-9]/g, '')
  const pattern = /^[0-9]{11}$/
  return pattern.test(cpf)
}

const whatsapp = (content) => {
  const whatsapp = content.replace(/[^0-9]/g, '')
  const pattern = /^[0-9]{10,11}$/
  return pattern.test(whatsapp)
}

const empty = (content) => {
  if (content === null) return true
  if (content === undefined) return true
  if (content === '') return true

  const jsonContent = JSON.stringify(content)
  if (jsonContent === '{}') return true
  if (jsonContent === '[]') return true

  return false
}

export default  {
  email,
  cep,
  cpf,
  whatsapp,
  empty
}
