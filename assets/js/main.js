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

        $(document).keydown(function(e){
            jogo.pressionou[e.which] = true;
            });
        
        $(document).keyup(function(e){
            jogo.pressionou[e.which] = false;
        });

        function loop() {
        
            moveFundo();
            moveJogador();
            moveinimigo1();
        
        }

        function moveFundo() {
            esquerda = parseInt($("#fundoGame").css("background-position"));
            $("#fundoGame").css("background-position",esquerda-15);   
        }

        function moveJogador() {
	
            if (jogo.pressionou[TECLA.W]) {
                var topo = parseInt($("#jogador").css("top"));
                if (topo>=10) $("#jogador").css("top",topo-5);
            }
            
            if (jogo.pressionou[TECLA.S]) {
                var topo = parseInt($("#jogador").css("top"));
                if (topo<=435) $("#jogador").css("top",topo+5); 
            }
            
            if (jogo.pressionou[TECLA.D]) {
                //Chama função Disparo	
            }
        
        }

        function moveinimigo1() {

            posicaoX = parseInt($("#inimigo1").css("left"));
            $("#inimigo1").css("left",posicaoX-velocidade);
            $("#inimigo1").css("top",posicaoY);
                
                if (posicaoX<=-10) {
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left",696);
                $("#inimigo1").css("top",posicaoY);
                    
                }
        }

    }
})()

