const datas = require('./helpers/datas');
const formatarPrecos = require('./helpers/formatarPrecos');
const mobile = require('./helpers/mobile');
const validacoes = require('./helpers/validacoes');
const formatarTextos = require('./helpers/formatarTextos');

module.exports = {
    helperPreco: formatarPrecos,
    helperData: datas,
    helperMobile: mobile,
    helperValidar: validacoes,
    helperTexto: formatarTextos
}

