// As "chaves" de criptografia que utilizaremos são:
//A letra "e" é convertida para "enter"
//A letra "i" é convertida para "imes"
//A letra "a" é convertida para "ai"
//A letra "o" é convertida para "ober"
//A letra "u" é convertida para "ufat"


const criptografarBtn = document.getElementById("button__criptografar");
const descriptografarBtn = document.getElementById("button__descriptografar");
const copiarBtn = document.getElementById("button__copiar");
const textoInicial = document.getElementById("textoInput");
const textoFinal = document.getElementById("textoFinal");
const figura = document.getElementById("figura");
const textoInfo = document.getElementById("textoInfo");
const right = document.getElementById("right"); 

// Função para normalizar o texto: remover acentos e converter para minúsculas
const normalizarTexto = (texto) => {
    return texto
        .normalize('NFD') 
        .replace(/[\u0300-\u036f]/g, '') 
        .toLowerCase(); 
}

// Função para validar o texto
const validarTexto = (texto) => {
    const textoNormalizado = normalizarTexto(texto);
    if (texto !== textoNormalizado) {
        alert("O texto deve estar em minúsculas e sem acentos.");
        return false;
    }
    return true;
}

const trocar = (novoValor) => {
    textoFinal.value = novoValor; 
    textoFinal.classList.add("ajustar");
    right.classList.add("ajuste");
    textoInicial.value = "";
    textoInicial.style.height = "auto";
    textoInicial.placeholder = "Digite seu texto";
    figura.classList.add("ocultar");
    textoInfo.classList.add("ocultar");
    copiarBtn.classList.remove("bn_ocultar");
}

const reset = () => {
    textoInicial.value = "";
    textoInicial.style.height = "auto";
    textoFinal.value = ""; 
    right.classList.remove("ajuste");
    textoFinal.classList.remove("ajustar");
    figura.classList.remove("ocultar");
    textoFinal.placeholder = "Nenhuma mensagem encontrada";
    textoInfo.classList.remove("ocultar");
    copiarBtn.classList.add("bn_ocultar");
    textoInicial.focus();
};

const substituicoes = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"]
];

const criptografarTexto = (texto) => {
    for (let [original, substituto] of substituicoes) {
        texto = texto.replaceAll(original, substituto);
    }
    return texto;
}

const descriptografarTexto = (texto) => {
    for (let [original, substituto] of substituicoes) {
        texto = texto.replaceAll(substituto, original);
    }
    return texto;
	
}

criptografarBtn.addEventListener('click', () => {
    const texto = textoInicial.value;

    if (validarTexto(texto)) {
        const textoNormalizado = normalizarTexto(texto);
        trocar(criptografarTexto(textoNormalizado));
    } else {
        reset();
    }
});

descriptografarBtn.addEventListener('click', () => {
    const texto = textoInicial.value;

    if (validarTexto(texto)) {
        const textoNormalizado = normalizarTexto(texto);
        trocar(descriptografarTexto(textoNormalizado));
    } else {
        reset();
    }
});

const limparBtn = document.getElementById("button__limpar");
	
// Event listener para o botão de limpar
limparBtn.addEventListener("click", () => {
    // Limpa o campo de saída de texto
    textoFinal.value = "";

    // Limpa o campo de entrada de texto
    textoInicial.value = "";

    // Exibe novamente a figura (se necessário)
    figura.classList.remove("ocultar");

	 // Recarrega a página para voltar ao início
	 window.location.reload();
});

// Event listener para o botão de copiar
copiarBtn.addEventListener("click", () => {
    textoFinal.select();
    document.execCommand('copy');
	navigator.clipboard.writeText(texto.value);
    //alert("Texto Copiado");
    reset();
});

// Auto-ajuste de textarea
const ajustarAlturaTextarea = (textarea) => {
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = `${scrollHeight}px`;
};

textoInicial.addEventListener("input", () => ajustarAlturaTextarea(textoInicial));


