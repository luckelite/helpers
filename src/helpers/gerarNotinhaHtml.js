/* ---- Imports ---- */

import html2canvas from 'html2canvas'
import jspdf from 'jspdf'

/* ---- Constants ---- */

const WIDTH = 400
const PADDING = 20
const QUALITY = 4

/* ---- Methods ---- */

async function criarPdf (seletorDiv, nomeArquivo) {
  if(!seletorDiv) return

  const divModal = document.querySelector(seletorDiv)
  const height = divModal.clientHeight

  const alturaNotinha = height * 0.20

  const pdf = new jspdf('p', 'mm', [80, alturaNotinha])
  pdf.setProperties({ title: nomeArquivo })

  const divClonada = clonarDiv(divModal, height)

  const dataUrl = await gerarCanva(divClonada)
  const img = new Image()
  img.src = dataUrl
  img.onload = () => {
    pdf.addImage(dataUrl, 'PNG', 0, 0, 80, alturaNotinha, '', 'FAST')
    removerDivClonada(divClonada)

    const blob = pdf.output('blob')
    gerarLink(blob, nomeArquivo)
  }

}

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

function clonarDiv (div, height) {
  const clone = div.cloneNode(true)

  clone.style.position = 'absolute'
  clone.style.top = '-16000px'
  clone.style.padding = `${PADDING}px`

  clone.style.height = `${height}px`
  clone.style.minHeight = `${height}px`
  clone.style.maxHeight = `${height}px`

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
