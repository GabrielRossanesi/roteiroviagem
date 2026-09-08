/**
 * js/data.js - Dados Imutáveis da Viagem Guarujá-SP ➔ Jaguaribe-CE
 * Guia de Mudança no Volkswagen Fox 1.6 (2017)
 */

export const TRIP_METRICS = {
  totalDistanceKm: 3080,
  estimatedDuration: '2 dias e meio',
  vehicle: 'Volkswagen Fox 1.6 (2017)',
  tankCapacityLiters: 50,
  safeTankReserveLiters: 12.5, // 1/4 do tanque mantido como reserva de segurança
  usableTankLiters: 37.5,
  departureTime: '22:00',
  overnightStops: 'Formosa (GO) & Bom Jesus (PI)'
};

export const CHECKPOINTS_DATA = [
  // --- DIA 1: GUARUJÁ ➔ FORMOSA (~1.165 km) ---
  {
    id: 'chk_1',
    day: 'Dia 1',
    dayKey: 'dia1',
    time: '22:00',
    km: 0,
    title: 'Saída de Guarujá (SP)',
    desc: 'Partida noturna, tanque cheio e pneus calibrados (35 psi + estepe 36 psi).'
  },
  {
    id: 'chk_2',
    day: 'Dia 1',
    dayKey: 'dia1',
    time: '23:15',
    km: 85,
    title: 'Subida da Imigrantes / Rodoanel',
    desc: 'Acesso à Rodovia dos Bandeirantes ou Anhanguera. Pista iluminada e livre.'
  },
  {
    id: 'chk_3',
    day: 'Dia 1',
    dayKey: 'dia1',
    time: '01:00',
    km: 190,
    title: 'Interior Paulista (Bandeirantes/Anhanguera)',
    desc: 'Pista de alto padrão e tráfego leve de caminhões na madrugada.'
  },
  {
    id: 'chk_4',
    day: 'Dia 1',
    dayKey: 'dia1',
    time: '02:30',
    km: 380,
    title: 'Ribeirão Preto - SP (~380 km)',
    desc: 'Parada estratégica de conveniência (Rede Graal) para café e esticar as pernas.'
  },
  {
    id: 'chk_5',
    day: 'Dia 1',
    dayKey: 'dia1',
    time: '06:00',
    km: 590,
    title: 'Uberaba - MG (Amanhecer ~590 km)',
    desc: 'Entrada no Triângulo Mineiro. Café reforçado (Rede Décio) e troca de motorista sob luz natural.'
  },
  {
    id: 'chk_6',
    day: 'Dia 1',
    dayKey: 'dia1',
    time: '07:30',
    km: 700,
    title: 'Uberlândia - MG',
    desc: 'Seguindo pela rodovia BR-050 duplicada com excelente pavimento.'
  },
  {
    id: 'chk_7',
    day: 'Dia 1',
    dayKey: 'dia1',
    time: '09:30',
    km: 810,
    title: 'Catalão - GO',
    desc: 'Entrada oficial no estado de Goiás pela BR-050.'
  },
  {
    id: 'chk_8',
    day: 'Dia 1',
    dayKey: 'dia1',
    time: '12:00',
    km: 980,
    title: 'Cristalina - GO (~980 km)',
    desc: 'Parada para almoço e abastecimento de gasolina antes do contorno de Brasília.'
  },
  {
    id: 'chk_9',
    day: 'Dia 1',
    dayKey: 'dia1',
    time: '15:00',
    km: 1165,
    title: 'Formosa - GO (Pernoite 1)',
    desc: 'Chegada no primeiro pernoite após 1.165 km rodados! Banho, descanso e pernoite tranquilo.'
  },

  // --- DIA 2: FORMOSA ➔ BOM JESUS (~1.000 km) ---
  {
    id: 'chk_10',
    day: 'Dia 2',
    dayKey: 'dia2',
    time: '06:00',
    km: 1165,
    title: 'Saída de Formosa (BR-020)',
    desc: 'Início do Dia 2 bem cedo com tanque cheio, rumo ao nordeste goiano e Bahia.'
  },
  {
    id: 'chk_11',
    day: 'Dia 2',
    dayKey: 'dia2',
    time: '09:30',
    km: 1430,
    title: 'Posse - GO',
    desc: 'Última cidade goiana estruturada antes da fronteira baiana.'
  },
  {
    id: 'chk_12',
    day: 'Dia 2',
    dayKey: 'dia2',
    time: '12:00',
    km: 1585,
    title: 'Luís Eduardo Magalhães - BA',
    desc: 'Entrada na capital do agronegócio baiano. Rodovia ampla e reta.'
  },
  {
    id: 'chk_13',
    day: 'Dia 2',
    dayKey: 'dia2',
    time: '13:00',
    km: 1675,
    title: 'Barreiras - BA (~510 km no dia)',
    desc: 'Almoço reforçado e abastecimento com gasolina de confiança (Shell/BR). Checar calibragem.'
  },
  {
    id: 'chk_14',
    day: 'Dia 2',
    dayKey: 'dia2',
    time: '15:00',
    km: 1765,
    title: 'Entrada na BR-135',
    desc: 'Atenção máxima: rodovia com tráfego pesado de bitrens e desníveis no acostamento.'
  },
  {
    id: 'chk_15',
    day: 'Dia 2',
    dayKey: 'dia2',
    time: '17:00',
    km: 2025,
    title: 'Corrente - PI (~860 km)',
    desc: 'Entrada no Piauí. Ponto de decisão para pernoite caso haja fadiga excessiva.'
  },
  {
    id: 'chk_16',
    day: 'Dia 2',
    dayKey: 'dia2',
    time: '19:00',
    km: 2165,
    title: 'Bom Jesus - PI (Pernoite 2)',
    desc: 'Chegada no hotel em Bom Jesus antes da noite fechada. Jantar e repouso.'
  },

  // --- DIA 3: BOM JESUS ➔ JAGUARIBE (~915 km) ---
  {
    id: 'chk_17',
    day: 'Dia 3',
    dayKey: 'dia3',
    time: '06:00',
    km: 2165,
    title: 'Saída de Bom Jesus (BR-135)',
    desc: 'Início do último dia de viagem pela BR-135 sentido norte.'
  },
  {
    id: 'chk_18',
    day: 'Dia 3',
    dayKey: 'dia3',
    time: '09:00',
    km: 2465,
    title: 'Floriano - PI',
    desc: 'Cruzando as margens do Rio Parnaíba rumo ao entroncamento de Picos.'
  },
  {
    id: 'chk_19',
    day: 'Dia 3',
    dayKey: 'dia3',
    time: '12:00',
    km: 2655,
    title: 'Picos - PI (Almoço Dia 3)',
    desc: 'Parada para almoço e último abastecimento no polo regional antes do Ceará.'
  },
  {
    id: 'chk_20',
    day: 'Dia 3',
    dayKey: 'dia3',
    time: '15:30',
    km: 2920,
    title: 'Fronteiras / Icó (Entrada no CE)',
    desc: 'Descida da Chapada do Araripe e conexão com a BR-116 em solo cearense.'
  },
  {
    id: 'chk_21',
    day: 'Dia 3',
    dayKey: 'dia3',
    time: '18:30',
    km: 3080,
    title: 'Jaguaribe - CE (Chegada Final!)',
    desc: 'Destino alcançado! Mudança concluída com vitória e segurança.'
  }
];

export const PRE_VIAGEM_DATA = [
  {
    category: 'Mecânica do Fox 1.6',
    icon: 'wrench',
    items: [
      { id: 'pv_1', text: 'Óleo do motor (VW 502 00 5w40) e filtro conferidos/trocados' },
      { id: 'pv_2', text: 'Nível do fluido de arrefecimento (aditivo rosa G12/G13)' },
      { id: 'pv_3', text: 'Pastilhas de freio e discos inspecionados' },
      { id: 'pv_4', text: '4 pneus calibrados para carga máxima (32 a 35 psi)' },
      { id: 'pv_5', text: 'Estepe com pressão extra calibrada em 35-36 psi' },
      { id: 'pv_6', text: 'Macaco, chave de roda e triângulo testados na garagem' },
      { id: 'pv_7', text: 'Palhetas de limpador e reservatório do para-brisa cheios' },
      { id: 'pv_8', text: 'Lâmpadas de farol alto/baixo, setas, ré e freio testadas' }
    ]
  },
  {
    category: 'Documentos & Finanças',
    icon: 'file-text',
    items: [
      { id: 'pv_9', text: 'CRLV digital baixado no celular para acesso offline no app CDT' },
      { id: 'pv_10', text: 'CNH dos motoristas válida' },
      { id: 'pv_11', text: 'Chave reserva do Fox guardada com o passageiro' },
      { id: 'pv_12', text: 'Tag de pedágio (Sem Parar/ConectCar/Veloe) com saldo' },
      { id: 'pv_13', text: 'R$ 150 a R$ 200 em dinheiro vivo para postos sem sinal' }
    ]
  },
  {
    category: 'Mudança & Conforto',
    icon: 'package-check',
    items: [
      { id: 'pv_14', text: 'Caixas mais pesadas acomodadas no chão do carro' },
      { id: 'pv_15', text: 'Visibilidade do retrovisor central preservada' },
      { id: 'pv_16', text: 'Pelo menos 5L de água potável e lanches de fácil alcance' },
      { id: 'pv_17', text: 'Cabo auxiliar de bateria (chupeta) no porta-malas' },
      { id: 'pv_18', text: 'Carregador veicular 12V duplo + 2 cabos de celular' }
    ]
  }
];

export const GPS_ROUTES = {
  dia1: {
    title: 'Dia 1: Guarujá (SP) ➔ Formosa (GO)',
    distanceKm: 1165,
    estimatedHours: '~15h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=Guarujá,+SP&destination=Formosa,+GO&waypoints=Ribeirão+Preto,+SP|Uberaba,+MG|Cristalina,+GO',
    waze: 'https://waze.com/ul?q=Formosa,+GO&navigate=yes'
  },
  dia2: {
    title: 'Dia 2: Formosa (GO) ➔ Bom Jesus (PI)',
    distanceKm: 1000,
    estimatedHours: '~13h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=Formosa,+GO&destination=Bom+Jesus,+PI&waypoints=Luís+Eduardo+Magalhães,+BA|Barreiras,+BA|Corrente,+PI',
    waze: 'https://waze.com/ul?q=Bom+Jesus,+PI&navigate=yes'
  },
  dia3: {
    title: 'Dia 3: Bom Jesus (PI) ➔ Jaguaribe (CE)',
    distanceKm: 915,
    estimatedHours: '~12h',
    googleMaps: 'https://www.google.com/maps/dir/?api=1&origin=Bom+Jesus,+PI&destination=Jaguaribe,+CE&waypoints=Floriano,+PI|Picos,+PI|Icó,+CE',
    waze: 'https://waze.com/ul?q=Jaguaribe,+CE&navigate=yes'
  }
};

export const EMERGENCY_CONTACTS = [
  {
    name: 'PRF',
    number: '191',
    tel: 'tel:191',
    description: 'Polícia Rodoviária Federal (Emergências e acidentes em rodovias federais)',
    primary: true
  },
  {
    name: 'SAMU',
    number: '192',
    tel: 'tel:192',
    description: 'Socorro Médico de Urgência',
    primary: true
  },
  {
    name: 'Bombeiros',
    number: '193',
    tel: 'tel:193',
    description: 'Resgate, primeiros socorros e combate a incêndio',
    primary: true
  },
  {
    name: 'Ecovias (SP)',
    number: '0800 019 7878',
    tel: 'tel:08000197878',
    description: 'Sistema Anchieta-Imigrantes (Subida da Serra do Mar)'
  },
  {
    name: 'CCR AutoBAn (SP)',
    number: '0800 055 5550',
    tel: 'tel:08000555550',
    description: 'Rodovias Bandeirantes e Anhanguera'
  },
  {
    name: 'Eco050 (MG/GO)',
    number: '0800 940 0700',
    tel: 'tel:08009400700',
    description: 'Concessionária da BR-050 (Delta-MG até Cristalina-GO)'
  },
  {
    name: 'Triunfo Concebra',
    number: '0800 060 0050',
    tel: 'tel:08000600050',
    description: 'BR-040 / BR-153 / BR-262 (Entorno de Brasília)'
  }
];

export const FUEL_STOPS = [
  {
    id: 1,
    city: 'Ribeirão Preto / Cravinhos (SP)',
    km: '~380 km',
    place: 'Rede Graal ou Frango Assado (Rodovia Anhanguera)',
    tag: 'Combustível SP',
    tip: 'Último abastecimento com preço e qualidade garantidos do interior paulista.'
  },
  {
    id: 2,
    city: 'Uberlândia / Catalão (BR-050)',
    km: '~700-800 km',
    place: 'Postos Rede Décio (BR-050)',
    tag: 'Triângulo Mineiro',
    tip: 'Excelente infraestrutura para almoço, descanso e abastecimento confiável.'
  },
  {
    id: 3,
    city: 'Formosa (GO) - Pernoite 1',
    km: '~1.165 km',
    place: 'Postos no perímetro urbano ou saída para BR-020',
    tag: 'Fim do Dia 1',
    tip: 'Encher o tanque na chegada para sair às 06h sem perder tempo na manhã seguinte.'
  },
  {
    id: 4,
    city: 'Barreiras (BA) - Dia 2',
    km: '~1.675 km',
    place: 'Postos Shell ou Petrobras na entrada de Barreiras',
    tag: 'Oeste Baiano',
    tip: 'Mandatório completar antes de entrar no trecho isolado da BR-135.'
  },
  {
    id: 5,
    city: 'Bom Jesus (PI) - Pernoite 2',
    km: '~2.165 km',
    place: 'Postos centrais de Bom Jesus',
    tag: 'Fim do Dia 2',
    tip: 'Reabastecer e conferir calibragem dos pneus na saída do sul piauiense.'
  },
  {
    id: 6,
    city: 'Picos (PI) - Dia 3',
    km: '~2.655 km',
    place: 'Grandes postos no entroncamento de Picos',
    tag: 'Reta Final',
    tip: 'Último polo estruturado antes de subir a Chapada rumo ao Ceará.'
  }
];

export const HOTELS_DATA = [
  {
    city: 'Formosa (GO)',
    step: 'Primeiro Pernoite (Fim do Dia 1)',
    badge: 'Fim do Dia 1',
    hotels: [
      {
        name: 'Hotel Serras Altas',
        tag: 'BR-020',
        desc: 'Fácil acesso na saída da rodovia, estacionamento seguro para carro com mudança e café matinal cedo.',
        mapsQuery: 'Hotel+Serras+Altas+Formosa+GO'
      },
      {
        name: 'Premier Hotel',
        tag: 'Centro',
        desc: 'Quartos confortáveis com ar-condicionado e bom isolamento acústico para descansar bem da madrugada.',
        mapsQuery: 'Premier+Hotel+Formosa+GO'
      },
      {
        name: 'Alfa Plaza Hotel',
        tag: 'Central',
        desc: 'Ótimo custo-benefício, atendimento ágil e estrutura prática para chegada rápida e descanso.',
        mapsQuery: 'Alfa+Plaza+Hotel+Formosa+GO'
      }
    ]
  },
  {
    city: 'Bom Jesus ou Corrente (PI)',
    step: 'Segundo Pernoite (Fim do Dia 2)',
    badge: 'Fim do Dia 2',
    hotels: [
      {
        name: 'Gurguéia Park Hotel',
        tag: 'Bom Jesus',
        desc: 'A melhor referência para viajantes na BR-135. Estacionamento amplo, restaurante no local e piscina.',
        mapsQuery: 'Hotel+Gurgueia+Park+Bom+Jesus+PI'
      },
      {
        name: 'Real Hotel',
        tag: 'Bom Jesus',
        desc: 'Quartos práticos, ótima climatização (essencial para o calor do sul piauiense) e saída ágil.',
        mapsQuery: 'Real+Hotel+Bom+Jesus+PI'
      },
      {
        name: 'Gran Valle Hotel',
        tag: 'Corrente (Opção)',
        desc: 'Opção antecipada caso prefiram parar ~1h30 antes de Bom Jesus e evitar dirigir à noite na BR-135.',
        mapsQuery: 'Gran+Valle+Hotel+Corrente+PI'
      }
    ]
  }
];
