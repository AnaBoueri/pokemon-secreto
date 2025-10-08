let listaNumerosSorteados = [];
let limiteSorteioLista = 150;
let numeroSecreto = gerarNumeroAleatorio();
let imgPokemon = '<img src="./img/' + numeroSecreto+'.png" class="container__imgpokemon">';
let tentativas = 0;

//Cria uma função para exibir texto na tela dinamicamente
function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

// Chama as funções pra exibir textos no HTML mas para não ficar repetitivo, vamos criar uma função
function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Pokémon Secreto!');
    exibirTextoNaTela('p','Escolha um número entre 1 e 150!');
}

exibirMensagemInicial();

function gerarNumeroAleatorio(){
    let numeroSorteado = parseInt(Math.random()*limiteSorteioLista + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if (quantidadeElementosLista == limiteSorteioLista) {
        listaNumerosSorteados = []; // Reseta a lista se já houver 10 números sorteados
    }

    if (listaNumerosSorteados.includes(numeroSorteado)) {
        //console.log('Número repetido: ' + numeroSorteado);
        return gerarNumeroAleatorio(); // Gera um novo número se já foi sorteado
        
    }else{
        listaNumerosSorteados.push(numeroSorteado); // Adiciona o número sorteado na lista
        console.log(listaNumerosSorteados); // Exibe a lista de números sorteados no console
        console.log(numeroSorteado);
        return numeroSorteado;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    tentativas++;
    console.log(chute == numeroSecreto);
    console.log(numeroSecreto);
    if (chute == numeroSecreto){
        // condições se acerta o numero 
        exibirTextoNaTela('h1','Acertou!');
        document.getElementById('pokemon-escondido').innerHTML = imgPokemon;
        let mensagemTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p','O número do Pokémon secreto é '+numeroSecreto +'. Você acertou em '+tentativas+' '+ mensagemTentativas +'.');
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        // condições se erra o numero
        limpaCampo()
        exibirTextoNaTela('h1','Errou!');
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','O número do Pokémon secreto é menor que '+chute);
        }else{
            exibirTextoNaTela('p','O número do Pokémon secreto é maior que '+chute);
        }
        
    }
}

// Limpa o campo de input e posiciona o cursor nele
function limpaCampo(){
    chute = document.querySelector('input');
    chute.value = '';
    chute.focus();
}

function reinicarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limpaCampo();
    tentativas = 0;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    document.getElementById('pokemon-escondido').innerHTML = "<img src='./img/ponto-de-interrogacao.png'alt='Pokemons primeira Gen' class='container__imgpokemon'>";
    imgPokemon = '<img src="./img/' + numeroSecreto+'.png">';
}
