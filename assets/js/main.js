(() => {
    const inicio = document.querySelector('#inicio');

    inicio.addEventListener('click', () => start());
    
    function start() {
        $("#inicio").hide();
        
        $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
        $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
        $("#fundoGame").append("<div id='inimigo2'></div>");
        $("#fundoGame").append("<div id='amigo' class='anima3'></div>");


        let jogo = {}
        jogo.timer = setInterval(loop,30);
        
        function loop() {
        
            movefundo();
        
        } // Fim da função loop()

        function movefundo() {
            esquerda = parseInt($("#fundoGame").css("background-position"));
            $("#fundoGame").css("background-position",esquerda-20);   
        }

    }
})()

