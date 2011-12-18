    <script src="/res/js/jquery.min.js"></script>
    <script type="text/javascript">
      var socket;
      var engine;
      function init() {
        var host = "ws://<?php echo $socket->getHost()?>:<?php echo $socket->getPort()?>";
        try {
          // Firefox accept only MozWebSocket
          socket = ("MozWebSocket" in window ? new MozWebSocket (host) : new WebSocket(host));
          log('Socket - status ' + socket.readyState);          
          
          socket.onopen = function (msg) {
            log("Bem-vindo - estado " + this.readyState); 
            /*           
            try {
              socket.send('hello<->1');
              log('hello<->1');
            }
            catch(ex) {
              log(ex);
            }
            */
          }
          
          socket.onmessage = function(msg) {
            var str = new String(msg.data);
            var parts = str.split('<->');
            if(parts.length > 0){
              console.log(">>>"+parts[0]);
              if(parts[0]=="want2play"){
                if(confirm("Você está sendo desafiado. Quer jogar?")){
                  $('#msg').val('yeswant2play<->'+parts[1]);
                  send();
                }
              }
              else if(parts[0]=="startgame"){
                $('#game_id').val(parts[1]);
                engine = new Engine();
              }
              else if(parts[0]=="gamemove"){
                engine.playerMove(parts[2],parts[3],parts[4]);
              }
            }
            log("Recebido: " + msg.data);
          }

          socket.onclose = function (msg) {
            log("Desconectado - estado " + this.readyState); 
          }
        }
        catch(ex) {
          log(ex);
        }
        //$("msg").focus ();
      }
      
      function send () {
        var txt, msg;
        msg = $("#msg").val();
        if(!msg) {
          alert("Mensagem não pode ser vazia");
          return;
        }
        $("#msg").val("");
        //$("#msg").focus();
        try {
          socket.send(msg);
          log('Enviado: ' + msg);
        }
        catch(ex) {
          log(ex);
        }
      }
      
      function quit() {
        log("Tchau!");
        socket.close();
        socket = null;
      }

      // Utilities
      function log(msg) {
        var a = $("#log").html();
        $("#log").html(a + "<br>" + msg);
      }

      function onkey(event) {
        if(event.keyCode == 13) {
          send();
        }
      }

      function whoisonline(){
        $('#msg').val("admin<->whoisonline");
        $('#msg').focus();
        //send();
      }

      function shutdown(){
        $('#msg').val("admin<->shutdown");
        $('#msg').focus();
        //send();
      }

      function kick(){
        $('#msg').val("admin<->kick");
        $('#msg').focus();
        //send();
      }

      init();
    </script>
    <style type="text/css">
      html , body {
        font: normal 0.9em arial , helvetica;
      }
      
      #log {
        width: 440px;
        height: 200px;
        border: 1px solid #7F9DB9;
        overflow: auto;
      }
      #players {
        width: 180px;
        height: 200px;
        border: 1px solid #7F9DB9;
        overflow: auto;
      }
      
      #msg {
        width: 330px;
      }
    </style>
    <div>
      <h3>Elastball: Futebol de botão online - Sala de chat</h3>
      <div style="float: left;">
        <div id="log"></div>
        <input id="msg" type="textbox" onkeypress="onkey(event);" />
        <button onclick="send();">Enviar</button>
        <button onclick="whoisonline();">Quem está online?</button>
        <button onclick="kick();">Chutar usuário!</button>
        <button onclick="shutdown();">Desligar!</button>
        <button onclick="quit();">Sair</button>
      </div>
      <div style="float: left; margin-left: 10px;">
        <ul id="players"style="margin-top: 0;"></ul>
      </div>
      <div style="margin-top: 15px;"></div>
    </div>
