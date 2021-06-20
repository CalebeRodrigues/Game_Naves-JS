(() => {
    const inicio = document.querySelector('#inicio');

    inicio.addEventListener('click', () => start());
    
    function start() {
        $("#inicio").hide();
        
        $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
        $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
        $("#fundoGame").append("<div id='inimigo2'></div>");
        $("#fundoGame").append("<div id='amigo' class='anima3'></div>");



        const jogo = {}
        jogo.timer = setInterval(loop,30);
        
        const velocidade = 10;
        let posicaoY = parseInt(Math.random() * 370);

        const TECLA = {
            W: 87,
            S: 83,
            D: 68
        }
        
        jogo.pressionou = [];

        let podeAtirar=true;

        $(document).keydown(function(e){
            jogo.pressionou[e.which] = true;
            });
        
        $(document).keyup(function(e){
            jogo.pressionou[e.which] = false;
        });

        function loop() {
        
            moveFundo();
            moveJogador();
            moveInimigo1();
            moveInimigo2();
            moveAmigo();
            colisao();
        }

        function moveFundo () {
            esquerda = parseInt($("#fundoGame").css("background-position"));
            $("#fundoGame").css("background-position",esquerda-15);   
        }

        function moveJogador () {
	
            if (jogo.pressionou[TECLA.W]) {
                var topo = parseInt($("#jogador").css("top"));
                if (topo>=10) $("#jogador").css("top",topo-10);
            }
            
            if (jogo.pressionou[TECLA.S]) {
                var topo = parseInt($("#jogador").css("top"));
                if (topo<=435) $("#jogador").css("top",topo+10); 
            }
            
            if (jogo.pressionou[TECLA.D]) {
                disparo();
            }
        
        }

        function disparo() {
            let tempoDisparo;
            if (podeAtirar==true) {
                podeAtirar=false;
                
                topo = parseInt($("#jogador").css("top"))
                posicaoX= parseInt($("#jogador").css("left"))
                tiroX = posicaoX + 190;
                topoTiro=topo+37;
                $("#fundoGame").append("<div id='disparo'></div");
                $("#disparo").css("top",topoTiro);
                $("#disparo").css("left",tiroX);
                
                tempoDisparo = window.setInterval(executaDisparo, 30);
            } 
            function executaDisparo() {
                posicaoX = parseInt($("#disparo").css("left"));
                $("#disparo").css("left",posicaoX+30); 

                if (posicaoX>900) {
                    window.clearInterval(tempoDisparo);
                    tempoDisparo=null;
                    $("#disparo").remove();
                    podeAtirar=true;
                }
            } 
        }

        function moveInimigo1 () {

            posicaoX = parseInt($("#inimigo1").css("left"));
            $("#inimigo1").css("left",posicaoX-velocidade);
            $("#inimigo1").css("top",posicaoY);
                
                if (posicaoX<=-10) {
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left",696);
                $("#inimigo1").css("top",posicaoY);
                    
                }
        }

        function moveInimigo2 () {
            posicaoX = parseInt($("#inimigo2").css("left"));
            $("#inimigo2").css("left",posicaoX-5);
                    
            if (posicaoX<=0) {
                
            $("#inimigo2").css("left",775);
                        
            }
        }

        function moveAmigo() {
            posicaoX = parseInt($("#amigo").css("left"));
            $("#amigo").css("left",posicaoX+1.5);
                        
            if (posicaoX>906) {                
                $("#amigo").css("left",0);           
            }        
        }

        function colisao() {
            let colisao1 = ($("#jogador").collision($("#inimigo1")));
            // jogador com o inimigo1
           console.log(colisao1);
        }

    }
})()

