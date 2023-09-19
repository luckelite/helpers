/* ---- Imports ---- */

import moment from 'moment'

/* ---- Constants ---- */

const MESES_NOME = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const SEMANA_NOME = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
const SEMANA_NOME_COMPLETO = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

/* ---- Methods ---- */

//
// Funcoes Gerais
//

function diferencaDeDiasEntreDatas (dataAtual, dataFutura) {
  if(!dataAtual || !dataFutura) return

  const diferenca = moment(dataFutura, "DD/MM/YYYY HH:mm:ss").diff(moment(dataAtual, "DD/MM/YYYY HH:mm:ss"))
  const diasRestantes = Math.round(moment.duration(diferenca).asDays())
  return (diasRestantes < 0) ? 0 : diasRestantes

}

function dataHoje () {
  const novaData = new Date()
  const ano = novaData.getFullYear()
  const mes = novaData.getMonth() + 1
  const dia = novaData.getDate()
  return { ano, mes, dia }
}

function converterMesParaNome (numero) {
  /* meses de 1 a 12 */
  if (numero > MESES_NOME.length || numero < 1) return
  return MESES_NOME[numero-1]
}

// MOSTRAR DIAS DA SEMANA
function diasDaSemana(ano, mes, dia){
  const date = new Date(ano, mes, dia)
  return SEMANA_NOME[date.getDay(dia)]
}

function diasDaSemanaCompleto(ano, mes, dia){
  const date = new Date(ano, mes, dia)
  return SEMANA_NOME_COMPLETO[date.getDay(dia)]
}

// MOSTRAR DIAS DA SEMANA
function numeroDiaDaSemana(ano, mes, dia){
  const date = new Date(ano, mes, dia)
  return date.getDay(dia)
}

function contarDiasDoMes (ano, mes) {
  const data = new Date(ano, mes, 0)
  return data.getDate()
}

//
// Funcoes Componente Voltar & Avancar Mes
//

function avancarMes (ano, mes) {
  if (mes < 12) {
    mes++
    return { mes, ano }
  }

  mes = 1
  ano++
  return { mes, ano }
}

function voltarMes (ano, mes) {
  if (mes > 1) {
    mes--
    return { mes, ano }
  }

  mes = 12
  ano--
  return { mes, ano }
}

function voltarMesLimitado (ano, mes) {
  if (mes > 1) {
    mes--
    return { mes, ano }
  }
}

function avancarMesLimitado (ano, mes) {
  if (mes < 12) {
    mes++
    return { mes, ano }
  }
}

//
// Funcoes do Componente Voltar & Avancar Dia
//

function avancarDia (ano, mes, dia) {
  const ultimoDiaDoMes = contarDiasDoMes(ano, mes)
  if (dia < ultimoDiaDoMes) {
    dia++
    return { dia, mes, ano }
  }

  dia = 1
  const mesPosterior = avancarMes(ano, mes)
  return { dia, ...mesPosterior }
}

function voltarDia (ano, mes, dia) {
  if (dia > 1) {
    dia--
    return { dia, mes, ano }
  }

  const mesAnterior = voltarMes(ano, mes)
  dia = contarDiasDoMes(mesAnterior.ano, mesAnterior.mes)
  return { dia, ...mesAnterior }
}

//
// Funcoes Input Date
//

function enviarInputDateParaServidor (date) {
  if(!date) return
  return addHoras(moment(date).toDate(), 12)
}

function exibirDataServidorNoInputDate (date) {
  const data = moment(date).toDate()
  return printDateUSA(data)
}

function receberDataDoServidor (date) {
  if(!date) return
  return addHoras(moment(date).toDate(), -12)
}


//
// Moment JS
//

function agora () {
  return moment().toDate()
}

function now () {
  return agora()
}

function identificarDataFutura(data) {
  const agora = new Date(now().getFullYear(), now().getMonth(), now().getDate(), 12, 0, 0, 0)
  return (data > agora) ? true : false
}

function identificarDataPassada(data) {
  return (data < now()) ? true : false
}

//
// Add
//

function addHoras (data, horas) {
  return moment(data).add(horas, 'hours').toDate()
}

function addDias (data, dias) {
  return moment(data).add(dias, 'days').toDate()
}

function addMeses (data, meses) {
  return moment(data).add(meses, 'months').toDate()
}

function addAnos (data, anos) {
  return moment(data).add(anos, 'years').toDate()
}

//
// Remove
//

function removeDias (data, dias) {
  return moment(data).subtract(dias, 'days').toDate()
}

//
// Print
//

function formatarData (data) {
  if(!data) return
  const formato = 'DD/MM/YYYY'
  return moment(data).format(formato)
}

function formatarDataComHora (data) {
  if(!data) return
  const formato = "DD/MM/YYYY [às] HH:mm[h]"
  return moment(data).format(formato)
}

function printDateUSA (data) {
  if(!data) return
  const formato = 'YYYY-MM-DD'
  return moment(data).format(formato)
}

function formatarDataReduzida (data) {
  if(!data) return
  const formato = 'DD/MM'
  return moment(data).format(formato)
}

//
// String
//

function dataStringBRtoDate (dataStringBR) {
  return moment(dataStringBR, "DD/MM/YYYY").toDate()
}

function dataStringUSAtoDate (dataStringBR) {
  return moment(dataStringBR, "YYYY-MM-DD").toDate()
}

//
// Object
//

function dataObjtoDate (ano, mes, dia = 1) {
  const stringDataBR = `${dia}-${mes}-${ano}`
  return dataStringBRtoDate(stringDataBR)
}

//
// Timezone
//

function receberFusoHorario () {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export default {
  diferencaDeDiasEntreDatas,
  dataHoje,
  converterMesParaNome,
  diasDaSemana,
  diasDaSemanaCompleto,
  numeroDiaDaSemana,
  contarDiasDoMes,
  avancarMes,
  voltarMes,
  avancarDia,
  voltarDia,
  avancarMesLimitado,
  voltarMesLimitado,
  exibirDataServidorNoInputDate,
  enviarInputDateParaServidor,
  receberDataDoServidor,

  agora,
  now,
  identificarDataFutura,
  identificarDataPassada,

  addHoras,
  addDias,
  addMeses,
  addAnos,

  removeDias,

  formatarData,
  formatarDataComHora,
  printDateUSA,
  formatarDataReduzida,

  dataStringBRtoDate,
  dataStringUSAtoDate,
  dataObjtoDate,

  receberFusoHorario
}
