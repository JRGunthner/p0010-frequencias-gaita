function calcular_frequencia(nota, oitava) {
    const base_frequencia = 440; // A4
    const semitons_desde_A4 = {
        "C": -9, "C#": -8, "D": -7, "D#": -6, "E": -5,
        "F": -4, "F#": -3, "G": -2, "G#": -1, "A": 0, "A#": 1, "B": 2
    };
    return base_frequencia * 2 ** ((semitons_desde_A4[nota] + 12 * (oitava - 4)) / 12);
}

function obter_nota_e_oitava(nota_completa) {
    // Extrai a parte da nota (ex: "C#", "A", etc.) e a oitava (ex: "4")
    const nota = nota_completa.slice(0, -1);  // Remove o último caractere (oitava)
    const oitava = parseInt(nota_completa.slice(-1));  // Último caractere é a oitava
    return { nota, oitava };
}

function calcular_frequencias_personalizadas(notas_array) {
    const tabela = [];

    notas_array.forEach(nota_completa => {
        const { nota, oitava } = obter_nota_e_oitava(nota_completa);
        const freq = calcular_frequencia(nota, oitava);
        tabela.push({
            nota: nota_completa,
            freq: freq.toFixed(4)
        });
    });

    return tabela;
}

function calcular_frequencias_violin(notas_array, batimento) {
    const tabela = [];

    notas_array.forEach(nota_completa => {
        const { nota, oitava } = obter_nota_e_oitava(nota_completa);
        const freq_central = calcular_frequencia(nota, oitava);

        const vibrato = batimento / 2;
        const freq_fundamental = freq_central - vibrato;
        const freq_violin = freq_central + vibrato;

        tabela.push({
            nota: nota_completa,
            freq_c_Hz: freq_central.toFixed(4),
            freq_1_Hz: freq_fundamental.toFixed(4),
            freq_2_Hz: freq_violin.toFixed(4)
        });
    });

    return tabela;
}

function gerar_tabela_todas_frequencias(inicio_oitava, fim_oitava) {
    const notas = [
        "C", "C#", "D", "D#", "E", "F",
        "F#", "G", "G#", "A", "A#", "B"
    ];
    const tabela = [];

    for (let oitava = inicio_oitava; oitava <= fim_oitava; oitava++) {
        for (const nota of notas) {
            const freq = calcular_frequencia(nota, oitava);
            tabela.push({
                nota: `${nota}${oitava}`,
                freq: freq.toFixed(4)
            });
        }
    }

    return tabela;
}

function imprimir_tabela(tabela, msg) {
    console.log(`\n${msg}`);
    console.table(tabela);
}

function imprimir_tabela_violin(tabela, msg) {
    console.log(`\n${msg}`);
    console.table(tabela);
}

//////////////////////////////////////////////////////////////////////
let msg = "Tabela de frequências de notas musicais:";
const tabela = gerar_tabela_todas_frequencias(0, 10);
//imprimir_tabela(tabela, msg);

//////////////////////////////////////////////////////////////////////
// 

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_c_f_21_8:";
const notas_ponto_c_f_21_8 = [
                      "F1", "G1", "A1", "A#1", "B1",
    "C2", "C#2", "D2", "E2", "F2", "G2", "A2",

                      "F1", "G1", "A1", "A#1",
    "C2", "D2",
                "E2",       "G2", "A2",        "B2",
    "C3", "D3", "E3", "F3", "G3", "A3", "A#3", "B3",
    "C4", "D4", "E4", "F4", "G4", "A4", "A#4", "B4",
    "C5", "D5", "E5", "F5", "G5", "A5"
];

const tabela_ponto_c_f_21_8 = calcular_frequencias_personalizadas(notas_ponto_c_f_21_8);
imprimir_tabela(tabela_ponto_c_f_21_8, msg);

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_c#_f#_21_8:";
const notas_ponto_c_sus_f_sus_21_8 = [
                              "F#1", "G#1", "A#1", "B1",
          "C#2", "D#2",
                        "F2",        "G#2", "A#2",
    "C3", "C#3", "D#3", "F3", "F#3", "G#3", "A#3", "B3",
    "C4", "C#4", "D#4", "F4", "F#4", "G#4", "A#4", "B4",
    "C5", "C#5", "D#5", "F5", "F#5", "G#5", "A#5"
];

const tabela_c_sus_f_sus_21_8 = calcular_frequencias_personalizadas(notas_ponto_c_sus_f_sus_21_8);
//imprimir_tabela(tabela_c_sus_f_sus_21_8, msg);

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_d_g_21_8:";
const notas_ponto_d_g_21_8 = [
                                           "G1", "A1", "B1",
    "C2", "C#2", "D2", "D#2", "E2", "F#2", "G2", "A2", "B2", 

                                    "G1", "A1", "B1",
    "C2",        "D2", "E2",
                             "F#2",       "A2", "B2",
          "C#3", "D3", "E3", "F#3", "G3", "A3", "B3",
    "C4", "C#4", "D4", "E4", "F#4", "G4", "A4", "B4",
    "C5", "C#5", "D5", "E5", "F#5", "G5", "A5", "B5"
];

const tabela_ponto_d_g_21_8 = calcular_frequencias_personalizadas(notas_ponto_d_g_21_8);
//imprimir_tabela(tabela_ponto_d_g_21_8, msg);

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_d#_g#_21_8:";
const notas_ponto_d_sus_g_sus_21_8 = [
                                          "G#1", "A#1",
    "C2", "C#2", "D#2",       "F2",
                                    "G2",        "A#2",
    "C3",        "D3", "D#3", "F3", "G3", "G#3", "A#3",
    "C4", "C#4", "D4", "D#4", "F4", "G4", "G#4", "A#4",
    "C5", "C#5", "D5", "D#5", "F5", "G5", "G#5", "A#5",
    "C6"
];

const tabela_d_sus_g_sus_21_8 = calcular_frequencias_personalizadas(notas_ponto_d_sus_g_sus_21_8);
//imprimir_tabela(tabela_d_sus_g_sus_21_8, msg);

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_e_a_21_8:";
const notas_ponto_e_a_21_8 = [
                                            "A1", "B1",
    "C#2", "D2",        "E2", "F#2",
                                     "G#2",       "B2",
    "C#3",       "D#3", "E3", "F#3", "G#3", "A3", "B3",
    "C#4", "D4", "D#4", "E4", "F#4", "G#4", "A4", "B4",
    "C#5", "D5", "D#5", "E5", "F#5", "G#5", "A5", "B5",
    "C#6"
];

const tabela_e_a_21_8 = calcular_frequencias_personalizadas(notas_ponto_e_a_21_8);
//imprimir_tabela(tabela_e_a_21_8, msg);

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_f_a#_21_8:";
const notas_ponto_f_a_sus_21_8 = [
                                               "A#1",
    "C2", "D2", "D#2", "F2",       "G2",
                                         "A2",
    "C3", "D3",        "E3", "F3", "G3", "A3", "A#3",
    "C4", "D4", "D#4", "E4", "F4", "G4", "A4", "A#4",
    "C5", "D5", "D#5", "E5", "F5", "G5", "A5", "A#5",
    "C6", "D6"
];

const tabela_f_a_sus_21_8 = calcular_frequencias_personalizadas(notas_ponto_f_a_sus_21_8);
//imprimir_tabela(tabela_f_a_sus_21_8, msg);

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_f#_b_21_8:";
const notas_ponto_f_sus_b_21_8 = [
                                                   "B1",
    "C#2", "D#2", "E2",       "F#2", "G#2",
                                            "A#2",
    "C#3", "D#3",       "F3", "F#3", "G#3", "A#3", "B3",
    "C#4", "D#4", "E4", "F4", "F#4", "G#4", "A#4", "B4",
    "C#5", "D#5", "E5", "F5", "F#5", "G#5", "A#5", "B5",
    "C#6", "D#6"
];

const tabela_f_sus_b_21_8 = calcular_frequencias_personalizadas(notas_ponto_f_sus_b_21_8);
//imprimir_tabela(tabela_f_sus_b_21_8, msg);

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_g_c_21_8:";
const notas_ponto_g_c_21_8 = [
    "C2", "D2", "E2", "F2", "F#2", "G2", "G#2", "A2", "B2",
    "C3", "D3", "E3",

    "C2", "D2", "E2", "F2",        "G2", "A2",
                                               "B2",
          "D3", "E3",       "F#3", "G3", "A3", "B3",
    "C4", "D4", "E4", "F4", "F#4", "G4", "A4", "B4",
    "C5", "D5", "E5", "F5", "F#5", "G5", "A5", "B5",
    "C6", "D6", "E6"
];
const tabela_ponto_g_c_21_8 = calcular_frequencias_personalizadas(notas_ponto_g_c_21_8);
//imprimir_tabela(tabela_ponto_g_c_21_8, msg);

const batimentos = 2.5;
msg = `Notas ponto_g_c_21_8 com vibrato, batimento = ${batimentos}/s`;
const tabela_ponto_g_c_21_8_violin = calcular_frequencias_violin(notas_ponto_g_c_21_8, batimentos);
//imprimir_tabela_violin(tabela_ponto_g_c_21_8_violin, msg);

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_g#_c#_21_8:";
const notas_ponto_g_sus_c_sus_21_8 = [
          "C#2", "D#2", "F2", "F#2",       "G#2", "A#2",
    "C3",        "D#3", "F3",        "G3", "G#3", "A#3",
    "C4", "C#4", "D#4", "F4", "F#4", "G4", "G#4", "A#4",
    "C5", "C#5", "D#5", "F5", "F#5", "G5", "G#5", "A#5",
    "C6", "C#6", "D#6", "F6"
];

const tabela_g_sus_c_sus_21_8 = calcular_frequencias_personalizadas(notas_ponto_g_sus_c_sus_21_8);
//imprimir_tabela(tabela_g_sus_c_sus_21_8, msg);

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_a_d_21_8:";
const notas_ponto_a_d_21_8 = [
           "D2", "E2", "F#2", "G2",        "A2", "B2",
    "C#3",       "E3", "F#3",       "G#3", "A3", "B3",
    "C#4", "D4", "E4", "F#4", "G4", "G#4", "A4", "B4",
    "C#5", "D5", "E5", "F#5", "G5", "G#5", "A5", "B5",
    "C#6", "D6", "E6", "F#6"
];

const tabela_a_d_21_8 = calcular_frequencias_personalizadas(notas_ponto_a_d_21_8);
//imprimir_tabela(tabela_a_d_21_8, msg);

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_a#_d#_21_8:";
const notas_ponto_a_sus_d_sus_21_8 = [
                "D#2", "F2", "G2", "G#2",       "A#2",
    "C3",
          "D3",        "F3", "G3",        "A3", "A#3",
    "C4", "D4", "D#4", "F4", "G4", "G#4", "A4", "A#4",
    "C5", "D5", "D#5", "F5", "G5", "G#5", "A5", "A#5",
    "C6", "D6", "D#6", "F6", "G6"
];

const tabela_a_sus_d_sus_21_8 = calcular_frequencias_personalizadas(notas_ponto_a_sus_d_sus_21_8);
//imprimir_tabela(tabela_a_sus_d_sus_21_8, msg);

//////////////////////////////////////////////////////////////////////
msg = "Notas ponto_b_e_21_8:";
const notas_ponto_b_e_21_8 = [
                  "E2", "F#2", "G#2", "A2",        "B2",
    "C#3",
           "D#3",       "F#3", "G#3", "A3",        "B3",
    "C#4", "D#4", "E4", "F#4", "G#4", "A4", "A#4", "B4",
    "C#5", "D#5", "E5", "F#5", "G#5", "A5", "A#5", "B5",
    "C#6", "D#6", "E6", "F#6", "G#6"
];

const tabela_b_e_21_8 = calcular_frequencias_personalizadas(notas_ponto_b_e_21_8);
//imprimir_tabela(tabela_b_e_21_8, msg);
