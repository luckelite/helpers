function removerAcentos (content) {
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

function reconhecerQuebraLinha (texto) {
  return texto?.replace(/\r?\n/g, '<br>')
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

// objEndereco: rua, numero, complemento, bairro, cidade, estado
function formatarEndereco(objEndereco) {
  const rua = objEndereco?.rua || ''
  const numero = objEndereco?.numero || ''
  const complemento = objEndereco?.complemento || ''
  const bairro = objEndereco?.bairro || ''
  const cidade = objEndereco?.cidade || ''
  const estado = objEndereco?.estado || ''
  const cep = objEndereco?.cep || ''

  const enderecoCompleto = [rua, numero, complemento, bairro, cidade, estado, cep]
  const enderecoTratado = enderecoCompleto
    .filter(elemento => elemento !== '')
    .join(', ')

  return (enderecoTratado) ? enderecoTratado : ''
}

export default {
  removerAcentos,
  limparState,
  reconhecerQuebraLinha,
  retirarSimbolosDoWhatsapp,
  primeiroNome,
  primeiroESegundoNome,
  formatarEndereco,
}
