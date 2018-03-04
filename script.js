
(function (){
    
    var numeroDeBombas = 20;
    var numeroDeCampos = 100;
    var CamposRestantes = numeroDeCampos - numeroDeBombas;

    function construirOCampo(numeroDeBombas, numeroDeCampos){
       
        var tabuleiro = document.querySelector('.tabuleiro');
        var celulas = tabuleiro.children;
        var elementMina = document.createElement("span");
        elementMina.className = "mina";

        // ? cria o tabuleiro  (roda o número total de celulas)
        for (let index = 0; index < celulas.length; index++) {
            
            celulas[index].addEventListener("click", function (){

                if( jaFoiClicado(this))
                    return;
                
                if(this.innerHTML == ""){
                    abrirEspacosVazios(this, celulas);
                }else{
                    setActive(this);
                    CamposRestantes--;
                }

                if(CamposRestantes == 0){
                    ganhou();
                }

                if(!naoEhUmaMina(this)){
                    perdeu(celulas);
                }
            })
            
        }
        
        // ? Criando as minas (roda 10 vezes);
        while( numeroDeBombas !== 0 ) {

            
            var mina = Math.trunc(Math.random() * 100);

            if (celulas[mina].className.indexOf("mina") !== -1 )
                continue;

                celulas[mina].className += " mina"
                celulas[mina].innerHTML = ""
                celulas[mina].appendChild(elementMina.cloneNode(false));

            somarDicas(celulas, mina);
            numeroDeBombas --;
        }

    }

    function somarDicas(celulas, mina){
        // debugger;
        // ! somar  coluna 1
        if(mina > 9){

            if ( naoEhPrimeiraColuna(mina) && naoEhUmaMina(celulas[mina - 11]))
                somaUm(celulas[mina - 11]);

            if ( naoEhUmaMina(celulas[mina - 10]) )
                somaUm(celulas[mina - 10]);
            
            if (naoEhUltimaColuna(mina) && naoEhUmaMina(celulas[mina - 9]) ) 
                somaUm(celulas[mina - 9]);

        }

        // ! somar coluna 2
        if (naoEhUltimaColuna(mina) && naoEhUmaMina(celulas[mina + 1]) )
            somaUm(celulas[mina + 1]);
        
        // ? bomba

        if (naoEhPrimeiraColuna(mina) && naoEhUmaMina(celulas[mina - 1]) )
            somaUm(celulas[mina - 1]);

        // ! somar  coluna 3
        if(mina < 90){
            
            if (naoEhPrimeiraColuna(mina) && naoEhUmaMina(celulas[mina + 9]) )
                somaUm(celulas[mina + 9]);

            if (naoEhUmaMina(celulas[mina + 10]) )
                somaUm(celulas[mina + 10]);

            if (naoEhUltimaColuna(mina) && naoEhUmaMina(celulas[mina + 11]) )
                somaUm(celulas[mina + 11]);
        }
    }

    function abrirEspacosVazios(element,list){
        let index = 0;

        // ? Encontrando a posição do elemento clicado

        for ( ; index < list.length; index++) {
            if(list[index] === element){        
                break;
            }
        }
       
        liberarEspacos(index , list);
        
    }

    function liberarEspacos(index, list){
            setActive(list[index]);
            CamposRestantes--;

            if (list[index].innerHTML != "" )
                return;            

        if(index > 9){

            if (naoEhPrimeiraColuna(index) && !jaFoiClicado(list[index - 11])){
                liberarEspacos(index - 11, list);
            }
            
            if (!jaFoiClicado(list[index - 10]) )
            liberarEspacos(index - 10, list);
            
            if (naoEhUltimaColuna(index) && !jaFoiClicado(list[index - 9]) )
            liberarEspacos(index - 9, list);
        }

        if (naoEhPrimeiraColuna(index) && !jaFoiClicado(list[index - 1]) )
            liberarEspacos(index - 1, list);

        if (naoEhUltimaColuna(index) && !jaFoiClicado(list[index + 1]) )
            liberarEspacos(index + 1, list);

        if (index < 90) {

            if (naoEhUltimaColuna(index) && !jaFoiClicado(list[index + 11]))
                liberarEspacos(index + 11, list);

            if (!jaFoiClicado(list[index + 10]) )
                liberarEspacos(index + 10, list);
            
            if (naoEhPrimeiraColuna(index) && !jaFoiClicado(list[index + 9])){
                
                liberarEspacos(index + 9, list);
            }
        }

    }

    function somaUm(celula){
        if(celula.innerHTML == ""){
            celula.innerHTML = 1;
        }else{
            celula.innerHTML = parseInt(celula.innerHTML) + 1;
        }
    }

    function ganhou(){
        setTimeout(function(){
            alert("Parabéns, Você ganhou");
        }, 100);
    }

    function perdeu(celulas){

        for (let index = 0; index < celulas.length; index++) {
           
            setActive(celulas[index]);
        };

        setTimeout(function () {
            alert("você perdeu!")
        }, 100);
    }

    function setActive(element){
        element.className += " active";
    }



    function naoEhPrimeiraColuna(mina){
        return mina % 10 !== 0;
    }

    function naoEhUltimaColuna(mina) {
        return mina % 10 !== 9;
    }

    function jaFoiClicado(element){
        return element.className.indexOf("active") !== -1
    }

    // ! retorna verdadeiro se não for uma mina
    function naoEhUmaMina(celula){
        // var e = celula.className.indexOf("mina") === -1;
        var e = celula.children[0] === undefined;
        return e;
    }

    construirOCampo(numeroDeBombas, numeroDeCampos);

})();