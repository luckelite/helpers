function limparAcentos (content) {
  return content?.toString()?.toLowerCase()
    .replace(/[À|Á|Â|Ä|Ã]/ig, 'a')
    .replace(/[È|É|Ê|Ë|Ẽ]/ig, 'e')
    .replace(/[Ì|Í|Î|Ï|Ĩ]/ig, 'i')
    .replace(/[Ò|Ó|Ô|Ö|Õ]/ig, 'o')
    .replace(/[Ù|Ú|Û|Ü|Ũ]/ig, 'u')
    .replace(/[Ç]/ig, 'c')
    .replace(/[Ñ]/ig, 'n')
    .replace(/[\n]/ig, ' ')
}

function removerCaracteresEspeciais (content) {
  return content?.toString()?.replace(/[*|_]/ig, '')
}

function retirarSimbolosDoWhatsapp (content) {
  return content?.toString()?.replace(/[(|)' ']/ig, '')?.replace('-', '')
}

function primeiroNome(nome) {
  if(!nome) return ''
  return nome?.split(' ')[0]
}

function primeiroESegundoNome(nomeCompleto) {
  if (!nomeCompleto) return ''
  const nomes = nomeCompleto.split(' ')
  return `${nomes[0]} ${nomes[1] || ''}`
}

function permitirSomenteNumeros(input) {
  input.value = input.value.replace(/[^0-9]/g, '')
}

function permitirSomenteLetrasNumeros(input) {
  input.value = input.value.replace(/[^A-Za-z0-9]/g, '')
}

function limparState(state) {
  for (const index in state) {
    const valor = state[index]
    if (Array.isArray(valor)) state[index] = []
    else if (typeof valor === 'object') limparState(valor)
    else if (typeof valor === 'boolean') state[index] = false
    else if (typeof valor === 'number') state[index] = 0
    else state[index] = ''
  }
}

export default {
  limparAcentos,
  limparState,
  removerCaracteresEspeciais,
  retirarSimbolosDoWhatsapp,
  primeiroNome,
  primeiroESegundoNome,
  permitirSomenteNumeros,
  permitirSomenteLetrasNumeros
}
