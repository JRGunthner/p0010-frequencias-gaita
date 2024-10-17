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
        tabela.push({ nota: nota_completa, freq: freq.toFixed(4) });
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
            freq_central: freq_central.toFixed(4),
            freq_fundamental: freq_fundamental.toFixed(4),
            freq_violin: freq_violin.toFixed(4)
        });
    });

    return tabela;
}

function gerar_tabela_todas_frequencias(inicio_oitava, fim_oitava) {
    const notas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const tabela = [];

    for (let oitava = inicio_oitava; oitava <= fim_oitava; oitava++) {
        for (const nota of notas) {
            const freq = calcular_frequencia(nota, oitava);
            tabela.push({ nota: `${nota}${oitava}`, freq: freq.toFixed(4) });
        }
    }

    return tabela;
}

function imprimir_tabela(tabela, msg) {
    console.log(`\n${msg}`);
    console.log("Nota | Frequência (Hz)");
    console.log("----------------------");
    tabela.forEach(({ nota, freq }) => {
        console.log(`${nota.padEnd(4)} | ${freq.padStart(10)}`);
    });
}

function imprimir_tabela_violin(tabela, msg) {
    console.log(`\n${msg}`);
    console.log("Nota | Fc (Hz)    | F1 (Hz)    | F2 (Hz)");
    console.log("-------------------------------------------");
    tabela.forEach(({ nota, freq_central, freq_fundamental, freq_violin }) => {
        const not = nota.padEnd(4);
        const freq_c = freq_central.padStart(10);
        const freq_f = freq_fundamental.padStart(10);
        const freq_v = freq_violin.padStart(10);
        console.log(`${not} | ${freq_c} | ${freq_f} | ${freq_v}`);
    });
}

let msg = "Tabela de frequências de notas musicais:";
const tabela = gerar_tabela_todas_frequencias(0, 10);
//imprimir_tabela(tabela, msg);

msg = "Notas ponto_g_c_21_8:";
const notas_ponto_g_c_21_8 = [
                                               "B2",
          "D3", "E3",       "F#3", "G3", "A3", "B3",
    "C4", "D4", "E4", "F4", "F#4", "G4", "A4", "B4",
    "C5", "D5", "E5", "F5", "F#5", "G5", "A5", "B5",
    "C6", "D6", "E6"
];
const tabela_ponto_g_c_21_8 = calcular_frequencias_personalizadas(notas_ponto_g_c_21_8);
//imprimir_tabela(tabela_ponto_g_c_21_8, msg);

const batimentos = 1;
msg = `Notas ponto_g_c_21_8 com vibrato, batimento = ${batimentos}/s`;
const tabela_ponto_g_c_21_8_violin = calcular_frequencias_violin(notas_ponto_g_c_21_8, batimentos);
imprimir_tabela_violin(tabela_ponto_g_c_21_8_violin, msg);

