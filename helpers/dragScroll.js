var bloqueio
var coordenadaInicialX
var rolagemX

function mouseDown(event, ref, classe) {
	const componente = ref?.querySelector(classe)
  if(!componente) return

	bloqueio = true
	coordenadaInicialX = event.pageX - componente.offsetLeft
	rolagemX = componente.scrollLeft
}

function mouseLeave(ref, classe) {
	const componente = ref?.querySelector(classe)
  if(!componente) return

	bloqueio = false
	componente.classList.remove('drag')
}

function mouseUp(ref, classe) {
	const componente = ref?.querySelector(classe)

	bloqueio = false
	componente?.classList?.remove('drag')
}

function mouseMove(event, ref, classe) {
	const componente = ref?.querySelector(classe)
  if(!componente) return

	if (!bloqueio) return
	event.preventDefault()

	const x = event.pageX - componente.offsetLeft
	const deslocamento = (x - coordenadaInicialX) * 2
	componente.scrollLeft = rolagemX - deslocamento
	componente.classList.add('drag')
}

export default {
	mouseDown,
	mouseLeave,
	mouseUp,
	mouseMove
}
