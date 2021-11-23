const celulas = document.querySelectorAll(".celula")
let fimDeJogo = false; 

const JOGADOR_X = "X";
const JOGADOR_O = "O"

const COMBINACOES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

document.addEventListener("click", (event)=>{
    if(event.target.matches(".celula")) {
    jogar(event.target.id,JOGADOR_X);
    setTimeout(()=> bot(),500) ;
    }
});
function bot() {
    const posicoesDisponíveis = [];
    for (index in celulas){
        if(!isNaN(index)){
            if(
                !celulas[index].classList.contains("X")&&
                !celulas[index].classList.contains("O")
            
            ){
                posicoesDisponíveis.push(index);
            }

        }
        
    }
    const posicaoAleatoria = Math.floor(
        Math.random() * posicoesDisponíveis.length
    );
    if (!fimDeJogo){
        jogar(posicoesDisponíveis [posicaoAleatoria],JOGADOR_O);
    }    
    
}

function jogar(id,turno){
    const celula = document.getElementById(id);
    celula.textContent = turno;
    celula.classList.add(turno);
    checarVencedor(turno);
   
 

}
function checarVencedor(turno){
    const vencedor = COMBINACOES.some((comb)=>{
        return comb.every((index)=>{
            return celulas[index].classList.contains(turno); 

        })
    })
    if(vencedor){
        encerrarJogo(turno)
        
    }else if(checarEmpate()){
        encerrarJogo();
    }
}
function checarEmpate(){
    let x = 0;
    let o = 0;

    for  (index in celulas) {
        if(!isNaN (index)){
            if(celulas[index].classList.contains(JOGADOR_X)){
                x++;
            }
            if(celulas[index].classList.contains(JOGADOR_O)){
                x++
            }
        }
        
        
    }
    return x + o === 9 ? true : false;
}

function encerrarJogo(vencedor = null){
    fimDeJogo = true;
    const telaEscura = document.getElementById("tela-escura");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let mensagem = null; 
    
    telaEscura.style.display = "Block";
    telaEscura.appendChild(h2);
    telaEscura.appendChild(h3)

    if (vencedor){
        h2.innerHTML = `O player ${vencedor} venceu`;
    }else{
        h2.innerHTML = "Empatou"
    }
    let contador = 3;
    setInterval(()=>{
        h3.innerHTML = `reiniciando em ${contador--}`;

    },1000);

    setTimeout(()=>location.reload(), 4000);
}