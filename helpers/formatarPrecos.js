function formatarMoedaRealSemCifrao(valor = 0){
  valor = Number(valor)
  return valor?.toLocaleString('pt-br', { minimumFractionDigits: 2 }) || '0,00'
}

function formatarMoedaRealComCifrao(valor = 0){
  valor = Number(valor)
  return valor?.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})?.replace('R$-', '-R$')  || 'R$ 0,00'
}

function enviarValorParaInputPreco(preco){
  return Number(Math.round(Number(preco) * 100))
}

function receberValorDoInputPreco(preco){
  preco = preco
  ?.toString()
  ?.replace(/\./gi, '')
  ?.replace(/,/gi, '')
  return Number((Number(preco) / 100))
}

function porcentagem (valorMaximo, valorAtual) {
  const percentual = (valorAtual * 100) / valorMaximo
  return (percentual > 100) ? 100 : percentual
}

function maiorValorDeUmaLista(lista) {
  return Math?.max?.apply(null, lista)
}

export default {
  receberValorDoInputPreco,
  enviarValorParaInputPreco,
  formatarMoedaRealComCifrao,
  formatarMoedaRealSemCifrao,
  porcentagem,
  maiorValorDeUmaLista
}
