/* ---- Imports ---- */

import html2canvas from 'html2canvas'
import jspdf from 'jspdf'

/* ---- Constants ---- */

const WIDTH = 700
const HEIGHT = 988
const PADDING = 30
const QUALITY = 4

/* ---- Methods ---- */

async function criarPdf (seletorDiv, nomeArquivo) {
  if(!seletorDiv) return

  const pdf = new jspdf('p', 'mm', 'a4')
  pdf.setProperties({ title: nomeArquivo })

  let ultimaPagina = false
  let pagina = 1

  const divModal = document.querySelector(seletorDiv)
  let divClonada

  while (!ultimaPagina) {

    divClonada = clonarDiv(divModal)
    const topPaginacao = HEIGHT * (pagina - 1)

    removerElementosProximasPaginas(divClonada, topPaginacao)
    removerElementosPaginasAnteriores(divClonada, topPaginacao)

    const dataUrl = await gerarCanva(divClonada)
    const img = new Image()
    img.src = dataUrl
    img.onload = () => {
      pdf.addImage(dataUrl, 'PNG', 0, 0, 211, 298, '', 'FAST')
      const ultimosElementos = detectarUltimosElementos(divClonada, divModal)
      if (ultimosElementos) ultimaPagina = true
      else pdf.addPage()

      removerDivClonada(divClonada)
      pagina++
    }
  }

  const blob = pdf.output('blob')
  gerarLink(blob, nomeArquivo)
}

/* ---- ---- */

function removerElementosProximasPaginas (div, topPaginacao) {
  for (const elemento of div.querySelectorAll(':scope > div')) {
    const topElemento = elemento.offsetTop
    const heightElemento = elemento.clientHeight
    const alturaElemento = topElemento + heightElemento

    if (alturaElemento > (topPaginacao + HEIGHT)) div.removeChild(elemento)
  }
}

function removerElementosPaginasAnteriores (div, topPaginacao) {
  let somatoriaAlturaElementosRemovidos = 0
  for (const elemento of div.querySelectorAll(':scope > div')) {

    const topElemento = elemento.offsetTop
    const heightElemento = elemento.clientHeight
    const alturaElemento = topElemento + heightElemento

    if ((alturaElemento + somatoriaAlturaElementosRemovidos) >= topPaginacao) return

    somatoriaAlturaElementosRemovidos += heightElemento
    div.removeChild(elemento)
  }
}

function detectarUltimosElementos (div1, div2) {
  const divs1 = div1.querySelectorAll(':scope > div')
  const divs2 = div2.querySelectorAll(':scope > div')

  if (!divs1.length || !divs2.length) return false

  const ultimoElemento1 = divs1[divs1.length -1]
  const ultimoElemento2 = divs2[divs2.length -1]

  if (ultimoElemento1.innerHTML === ultimoElemento2.innerHTML) return true
  else return false
}

/* ---- ---- */

function gerarCanva (div) {
  const options = {
    letterRendering: 1,
    allowTaint : true,
    useCORS: true,
    scale: QUALITY
  }
  return html2canvas(div, options)
    .then(canvas => canvas.toDataURL('image/png') )
}

function removerDivClonada (div) {
  document.body.removeChild(div)
}

function clonarDiv (div) {
  const clone = div.cloneNode(true)

  clone.style.position = 'absolute'
  clone.style.top = '-16000px'
  clone.style.padding = `${PADDING}px`

  clone.style.height = `${HEIGHT}px`
  clone.style.minHeight = `${HEIGHT}px`
  clone.style.maxHeight = `${HEIGHT}px`

  clone.style.width = `${WIDTH}px`
  clone.style.minWidth = `${WIDTH}px`
  clone.style.maxWidth = `${WIDTH}px`

  document.body.appendChild(clone)
  return clone
}

// function downloadPDF(pdf, nomeArquivo) {
//   if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//     const blob = pdf.output('blob')
//     gerarLink(blob, nomeArquivo)
//   }
//   else pdf.output('dataurlnewwindow')
// }

function gerarLink (blob, nomeArquivo) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${nomeArquivo}.pdf`
  link.click()
}

export default { criarPdf }
