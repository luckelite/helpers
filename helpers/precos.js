function formatarMoedaRealSemCifrao(valor = 0){
  valor = Number(valor)
  return valor?.toLocaleString('pt-br', { minimumFractionDigits: 2 }) || '0,00'
}

function formatarMoedaRealComCifrao(valor = 0){
  valor = Number(valor)
  return valor?.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})?.replace('R$-', '-R$')  || 'R$ 0,00'
}

function porcentagem (valorMaximo, valorAtual) {
  const percentual = (valorAtual * 100) / valorMaximo
  return (percentual > 100) ? 100 : percentual
}

export default {
  formatarMoedaRealComCifrao,
  formatarMoedaRealSemCifrao,
  porcentagem
}
