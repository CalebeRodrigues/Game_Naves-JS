(() => {
    const inicio = document.querySelector('#inicio');

    inicio.addEventListener('click', () => start());
    
    function start() {
        $("#inicio").hide();
        
        $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
        $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
        $("#fundoGame").append("<div id='inimigo2'></div>");
        $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
        $("#fundoGame").append("<div id='placar'></div>");
        $("#fundoGame").append("<div id='energia'></div>");


        const jogo = {}
        jogo.timer = setInterval(loop,30);
        let fimdejogo=false;

        let energiaAtual=3;

        let pontos=0;
        let salvos=0;
        let perdidos=0;

        let somDisparo=document.getElementById("somDisparo");
        let somExplosao=document.getElementById("somExplosao");
        let musica=document.getElementById("musica");
        let somGameover=document.getElementById("somGameover");
        let somPerdido=document.getElementById("somPerdido");
        let somResgate=document.getElementById("somResgate");

        let velocidade = 10;
        let posicaoY = parseInt(Math.random() * 370);

        musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
        musica.play();  

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
            placar();
            energia();
        }

        function placar() {
            $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");   
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
                somDisparo.play();
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
            let colisao2 = ($("#jogador").collision($("#inimigo2")));
            let colisao3 = ($("#disparo").collision($("#inimigo1")));
            let colisao4 = ($("#disparo").collision($("#inimigo2")));
            let colisao5 = ($("#jogador").collision($("#amigo")));
            let colisao6 = ($("#inimigo2").collision($("#amigo")));
                
            if (colisao1.length>0) {
                inimigo1X = parseInt($("#inimigo1").css("left"));
                inimigo1Y = parseInt($("#inimigo1").css("top"));
                explosao1(inimigo1X,inimigo1Y);

                energiaAtual--;

                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left",694);
                $("#inimigo1").css("top",posicaoY);
            }

            if (colisao2.length>0) {
                inimigo2X = parseInt($("#inimigo2").css("left"));
                inimigo2Y = parseInt($("#inimigo2").css("top"));
                explosao2(inimigo2X,inimigo2Y);
                        
                energiaAtual--;

                $("#inimigo2").remove();
                    
                reposicionaInimigo2();
            }

            if (colisao3.length>0) {
                pontos=pontos+100;
                inimigo1X = parseInt($("#inimigo1").css("left"));
                inimigo1Y = parseInt($("#inimigo1").css("top"));
                
                explosao1(inimigo1X,inimigo1Y);
                $("#disparo").css("left",950);
                
                velocidade += 0.1;
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left",694);
                $("#inimigo1").css("top",posicaoY);       
            }

            if (colisao4.length>0) {
                pontos=pontos+50;
                inimigo2X = parseInt($("#inimigo2").css("left"));
                inimigo2Y = parseInt($("#inimigo2").css("top"));
                $("#inimigo2").remove();
            
                explosao2(inimigo2X,inimigo2Y);
                $("#disparo").css("left",950);
                
                reposicionaInimigo2();
            }

            if (colisao5.length>0) {
                salvos++;
                somResgate.play();
                reposicionaAmigo();
                $("#amigo").remove();
            }

            if (colisao6.length>0) {
                perdidos++;
                amigoX = parseInt($("#amigo").css("left"));
                amigoY = parseInt($("#amigo").css("top"));
                explosao3(amigoX,amigoY);
                $("#amigo").remove();
                        
                reposicionaAmigo();
            }

        }

        function reposicionaAmigo() {
            let tempoAmigo=window.setInterval(reposiciona6, 6000);
            
            function reposiciona6() {
                window.clearInterval(tempoAmigo);
                tempoAmigo=null;
                
                if (fimdejogo==false) {
                
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            }   
            }   
        }

        function explosao1(inimigo1X,inimigo1Y) {
            somExplosao.play();
            $("#fundoGame").append("<div id='explosao1'></div");
            $("#explosao1").css("background-image", "url(./assets/img/explosao.png)");
            const div=$("#explosao1");
            div.css("top", inimigo1Y);
            div.css("left", inimigo1X);
            div.animate({width:200, opacity:0}, "slow");
            
            let tempoExplosao=window.setInterval(removeExplosao, 1000);
            
            function removeExplosao() {
                div.remove();
                window.clearInterval(tempoExplosao);
                tempoExplosao=null;
            }
        }

        function reposicionaInimigo2() {
	
            let tempoColisao4=window.setInterval(reposiciona4, 5000);
                
                function reposiciona4() {
                window.clearInterval(tempoColisao4);
                tempoColisao4=null;
                    
                    if (fimdejogo==false) {
                    
                    $("#fundoGame").append("<div id=inimigo2></div");
                    
                    }
                    
                }	
        }

        function explosao2(inimigo2X,inimigo2Y) {
            somExplosao.play();
            $("#fundoGame").append("<div id='explosao2'></div");
            $("#explosao2").css("background-image", "url(./assets/img/explosao.png)");
            let div2=$("#explosao2");
            div2.css("top", inimigo2Y);
            div2.css("left", inimigo2X);
            div2.animate({width:200, opacity:0}, "slow");
            
            let tempoExplosao2=window.setInterval(removeExplosao2, 1000);
            
            function removeExplosao2() {
                div2.remove();
                window.clearInterval(tempoExplosao2);
                tempoExplosao2=null;
            }
        }

        function explosao3(amigoX,amigoY) {
            somPerdido.play();
            $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
            $("#explosao3").css("top",amigoY);
            $("#explosao3").css("left",amigoX);
            
            let tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
            
            function resetaExplosao3() {
                $("#explosao3").remove();
                window.clearInterval(tempoExplosao3);
                tempoExplosao3=null;
            }
        }

        function energia() {
	
            if (energiaAtual==3) {
                $("#energia").css("background-image", "url(./assets/img/energia3.png)");
            }
        
            if (energiaAtual==2) {
                $("#energia").css("background-image", "url(./assets/img/energia2.png)");
            }
        
            if (energiaAtual==1) {
                $("#energia").css("background-image", "url(./assets/img/energia1.png)");
            }
        
            if (energiaAtual==0) {
                $("#energia").css("background-image", "url(./assets/img/energia0.png)");
            }
        }

    }
})()

