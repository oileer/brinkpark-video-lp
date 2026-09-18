/* ==========================================================================
   Dados compartilhados das 3 versões da LP de Camas Elásticas + Infláveis.
   Preços das camas: site oficial (16/07/2026) — "Nacional" = Modelo Tradicional.
   Infláveis: linha nova, sem tabela fechada — CTA "Consulte no WhatsApp".
   ========================================================================== */

var WHATS_NUMERO = '5549998282916'; // confirmado com o cliente em 16/07/2026

var CAMAS = [
    {
        nome: 'Cama Elástica 2,44M', linha: 'Modelo Europa', grupo: 'europa',
        img: '../assets/camas/244-europa.png',
        de: 'R$ 1.697,00', pix: 'R$ 1.397,00', parcela: 'R$ 133,00',
        desconto: '-18%', ultimas: true,
        specs: ['2,44 m', 'Rede de proteção', 'Escada de acesso'],
        resumo: 'Ideal para ter em casa, com segurança para os pequenos.'
    },
    {
        nome: 'Cama Elástica 3,05M', linha: 'Modelo Europa', grupo: 'europa',
        img: '../assets/camas/305-europa.png',
        de: 'R$ 2.197,00', pix: 'R$ 1.797,00', parcela: 'R$ 170,00',
        desconto: '-18%',
        specs: ['3,05 m', 'Rede de proteção', 'Escada de acesso'],
        resumo: 'O tamanho mais pedido para quintal e área de lazer.'
    },
    {
        nome: 'Cama Elástica 2,44M', linha: 'Modelo Tradicional', grupo: 'tradicional',
        img: '../assets/camas/244-nacional.png',
        de: 'R$ 2.147,00', pix: 'R$ 1.597,00', parcela: 'R$ 153,00',
        desconto: '-26%',
        specs: ['2,44 m', 'Rede naval reforçada', 'Uso intenso'],
        resumo: 'Reforçada, feita para aguentar o ritmo da locação.'
    },
    {
        nome: 'Cama Elástica 3,05M', linha: 'Modelo Tradicional', grupo: 'tradicional',
        img: '../assets/camas/305-nacional.png',
        de: 'R$ 2.397,00', pix: 'R$ 1.997,00', parcela: 'R$ 190,00',
        desconto: '-17%', ultimas: true,
        specs: ['3,05 m', 'Rede naval reforçada', 'Uso intenso'],
        resumo: 'Equilíbrio entre tamanho e retorno para quem aluga.'
    },
    {
        nome: 'Cama Elástica 4,27M', linha: 'Modelo Tradicional', grupo: 'tradicional',
        img: '../assets/camas/427-nacional.png',
        de: 'R$ 3.597,00', pix: 'R$ 2.997,00', parcela: 'R$ 287,00',
        desconto: '-17%',
        specs: ['4,27 m', 'Rede naval reforçada', 'Alta capacidade'],
        resumo: 'Cabe muita criança de uma vez — favorita das festas.'
    },
    {
        nome: 'Cama Elástica 4,90M', linha: 'Modelo Tradicional', grupo: 'tradicional',
        img: '../assets/camas/490-nacional.png',
        de: 'R$ 4.297,00', pix: 'R$ 3.597,00', parcela: 'R$ 343,00',
        desconto: '-16%',
        specs: ['4,90 m', 'Rede naval reforçada', 'Alta capacidade'],
        resumo: 'A maior da linha, para eventos e locação profissional.'
    }
];

var INFLAVEIS = [
    {
        nome: 'Piscina de Bolinhas', img: '../assets/inflaveis/piscina-bolinhas.jpg',
        specs: ['2 x 2 m', '800 bolinhas', 'Rede de proteção'],
        resumo: 'Casinha inflável com rede em toda a volta',
        desc: 'Casinha de bolinhas inflável coloridíssima, com 800 bolinhas e rede de proteção em toda a volta. As crianças passam horas se divertindo em segurança. Fica ligada no motor durante a festa, então precisa de um ponto de energia por perto.'
    },
    {
        nome: 'Tobogã Inflável 2 em 1', img: '../assets/inflaveis/tobogan.jpg',
        specs: ['5 x 2,8 m', 'Altura 4,2 m', 'Seco + água'],
        resumo: 'Escorregador seco que vira toboágua',
        emBreve: true,
        desc: 'Escorregador seco e, montado na beira da piscina, vira um super escorregador aquático. Diverte a criançada e também os adultos, ideal a partir dos 2 anos — a atração mais radical da festa.'
    },
    {
        nome: 'Futebol de Sabão', img: '../assets/inflaveis/futebol-sabao.jpg',
        specs: ['8 x 4 m', 'Campo com gols', 'Chão de sabão'],
        resumo: 'Campo inflável com chão escorregadio',
        emBreve: true,
        desc: 'Campo inflável com o chão escorregadio — todo mundo desliza tentando fazer o gol. Um sucesso com a criançada maior, os adolescentes e até os adultos da festa.'
    },
    {
        nome: 'Kit Área Kids', img: '../assets/inflaveis/mini-piscina-gangorra.jpg',
        specs: ['4 brinquedos', 'Tatame 20 peças', 'Para os pequenos'],
        resumo: 'Escorregador, gangorra, mini piscina e tatame',
        desc: 'Um cantinho de diversão completo para os pequenos: escorregador, gangorra, mini piscina de bolinhas com 100 bolinhas e tatame de 20 peças — tudo pensado para as crianças menores brincarem com conforto e segurança.'
    },
    {
        nome: 'Torta na Cara', img: '../assets/inflaveis/torta-na-cara.jpg',
        specs: ['Passa ou Repassa', 'Botões, luz e som', 'Todas as idades'],
        resumo: 'O jogo que anima a festa inteira',
        emBreve: true,
        desc: 'A máquina Passa ou Repassa tem botões, luz e som de verdade para animar as disputas — e quem erra ou demora leva a famosa torta na cara. Risada garantida para crianças e adultos.'
    },
    {
        nome: 'Máquina de Bolhas', img: '../assets/inflaveis/maquina-bolhas.jpg',
        specs: ['Muitas bolhas', 'Fácil de usar', 'Combina com tudo'],
        resumo: 'O toque de magia que encanta a criançada',
        desc: 'Enche a festa de bolhas de sabão, criando um ambiente alegre e divertido. Perfeita para animar qualquer evento, turbinar a diversão dos outros brinquedos e render ótimas fotos. Precisa de um ponto de energia por perto.'
    }
];

function abrirWhats(item) {
    var msg = item && item !== 'geral'
        ? 'Olá! Vi o catálogo no site e quero saber mais sobre: ' + item + '.'
        : 'Olá! Vi o catálogo de camas elásticas e infláveis e quero tirar uma dúvida.';
    if (window.dataLayer) {
        window.dataLayer.push({ event: 'catalogo_whatsapp_click', item: item });
    }
    window.open('https://wa.me/' + WHATS_NUMERO + '?text=' + encodeURIComponent(msg), '_blank');
}
