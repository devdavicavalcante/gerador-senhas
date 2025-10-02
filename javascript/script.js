/* ==============================
   Função principal: gera a senha
   ============================== */
function generatePassword() {
    // Pega o tamanho da senha do input
    const length = document.getElementById("length").value;

    // Conjuntos de caracteres
    const lowercase = "abcdefghijklmnopqrstuvwxyz";    // letras minúsculas
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";    // letras maiúsculas
    const numbers = "0123456789";                       // números
    const symbols = "!@#$%&*";                          // símbolos especiais

    let charset = ""; // string que irá armazenar os caracteres possíveis

    // Adiciona os caracteres conforme as opções selecionadas
    if (document.getElementById("lowercase").checked) charset += lowercase;
    if (document.getElementById("uppercase").checked) charset += uppercase;
    if (document.getElementById("numbers").checked) charset += numbers;
    if (document.getElementById("symbols").checked) charset += symbols;

    // Se nenhum conjunto for selecionado, exibe alerta e sai da função
    if (charset === "") {
        alert("Selecione pelo menos uma opção!");
        return;
    }

    // Gera a senha aleatória
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Mostra a senha no HTML
    document.getElementById("result").textContent = password;

    // Mostra a força da senha
    document.getElementById("strength").textContent = checkStrength(password);
}

/* ==============================
   Função para copiar a senha
   ============================== */
function copyPassword() {
    const password = document.getElementById("result").textContent;

    // Verifica se existe senha para copiar
    if (password === "") {
        alert("Nenhuma senha para copiar!");
        return;
    }

    // Copia para a área de transferência
    navigator.clipboard.writeText(password).then(() => {
        const msg = document.getElementById("message");
        msg.style.display = "inline"; // mostra mensagem "Copiada!"
        setTimeout(() => { msg.style.display = "none"; }, 2000); // esconde após 2s
    });
}

/* ==============================
   Função que calcula a força da senha
   ============================== */
function checkStrength(password) {
    // Calcula o tamanho do conjunto de caracteres selecionados
    const charsetSize = (() => {
        let size = 0;
        if (document.getElementById("lowercase").checked) size += 26;
        if (document.getElementById("uppercase").checked) size += 26;
        if (document.getElementById("numbers").checked) size += 10;
        if (document.getElementById("symbols").checked) size += 8;
        return size;
    })();

    // Se nenhum conjunto foi selecionado, retorna vazio
    if (charsetSize === 0) return "";

    // Calcula a entropia (medida de segurança da senha)
    const entropy = password.length * Math.log2(charsetSize);

    // Classifica a força da senha
    if (entropy < 28) return "Muito fraca";
    if (entropy < 36) return "Fraca";
    if (entropy < 60) return "Média";
    if (entropy < 128) return "Forte";
    return "Muito forte";
}
