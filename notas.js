function calcular_frequencia(nota, oitava) {
    const base_frequencia = 440; // A4
    const semitons_desde_A4 = {
        "C": -9, "C#": -8, "D": -7, "D#": -6, "E": -5,
        "F": -4, "F#": -3, "G": -2, "G#": -1, "A": 0, "A#": 1, "B": 2
    };
    return base_frequencia * 2 ** ((semitons_desde_A4[nota] + 12 * (oitava - 4)) / 12);
}

function gerar_tabela(inicio_oitava, fim_oitava) {
    const notas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const tabela = [];

    for (let oitava = inicio_oitava; oitava <= fim_oitava; oitava++) {
        for (const nota of notas) {
            const freq = calcular_frequencia(nota, oitava);
            tabela.push({ nota: `${nota}${oitava}`, calcular_frequencia: freq });
        }
    }

    return tabela;
}

const tabela = gerar_tabela(0, 10);

console.log(tabela);
