<link rel="stylesheet"  href="/js/jquery.mobile/jquery.mobile-1.0b2.min.css" /> 
<link rel="stylesheet" href="/css/webapp.css" /> 
<script src="/js/webapp.js"></script> 
<script src="/js/jquery.mobile/jquery.mobile-1.0b2.min.js"></script>

<div data-role="page" id="jqm-home" class="type-home">

  <div data-role="content">
     
    <div class="content-secondary">
      <div id="jqm-homeheader">
        <h1 id="jqm-logo" style="margin-top: 15px;"><img src="/res/img/logo.png" alt="ElastBall" /></h1> 
        <p>Um resumo apurado de tudo que rola no mundo do Futebol em tempo real</p> 
        <p id="jqm-version">Beta Release</p> 
      </div> 

      <p class="intro"><strong>Futebol Clube</strong> permite acesso rápido e fácil a informações dos principais campeonatos de futebol do planeta.</p>

      <ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b" id="_login"> 
        <li data-role="list-divider">Entrar usando...</li>
        <li><a href="<?php echo url_for('@default?module=login&action=login&service=google&type=openid') ?>" rel="external"><img src="../images/google.png" alt="Google" class="ui-li-icon">Google</a></li> 
        <li><a href="<?php echo url_for('@default?module=login&action=login&service=twitter&type=oauth') ?>" rel="external"><img src="../images/twitter.png" alt="Twitter" class="ui-li-icon">Twitter</a></li> 
        <li><a href="<?php echo url_for('@default?module=login&action=login&service=facebook&type=oauth') ?>" rel="external"><img src="../images/facebook.png" alt="Facebook" class="ui-li-icon">Facebook</a></li>
        <li><a href="<?php echo url_for('@default?module=login&action=login&service=yahoo&type=openid') ?>" rel="external"><img src="../images/yahoo.png" alt="Yahoo!" class="ui-li-icon">Yahoo!</a></li> 
      </ul> 

    </div><!--/content-primary--> 
    
    <div class="content-primary"> 
      <nav> 
        <ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b"> 
          <li data-role="list-divider">Acompanhe campeonatos tradicionais como...</li> 
          <li>Campeonato Alemão</li>
          <li>Campeonato Argentino</li>
          <li>Campeonato Brasileiro Series A, B, C e D</li>
          <li>Campeonato Espanhol</li>
          <li>Campeonato Francês</li>
          <li>Campeonato Inglês</li>
          <li>Campeonato Italiano</li>
          <li>Campeonato Japonês</li>
          <li>Campeonato Português</li>
          <li>Campeonato Russo</li>
          <li>Campeonato Turco</li>

          <li data-role="list-divider">Copas, Ligas, Mundiais, Eliminatorias...</li> 
          <li>Copa Sul-Americana</li>
          <li>Eliminatórias da Eurocopa</li>
          <li>Liga Europa</li>
          <li>Mundial Sub-20</li>
          <li>Recopa Sul-Americana</li>
          <li>Supercopa da Espanha</li>
          <?php /*
          <li data-role="list-divider">São mais de 1800 times de futebol incluindo os nacionais...</li> 
          <li>América-MG</li>
          <li>Atlético-GO</li>
          <li>Atlético-MG</li>
          <li>Atlético-PR</li>
          <li>Avaí</li>
          <li>Bahia</li>
          <li>Botafogo</li>
          <li>Ceará</li>
          <li>Corinthians</li>
          <li>Coritiba</li>
          <li>Cruzeiro</li>
          <li>Figueirense</li>
          <li>Flamengo</li>
          <li>Fluminense</li>
          <li>Grêmio</li>
          <li>Internacional</li>
          <li>Palmeiras</li>
          <li>Santos</li>
          <li>São Paulo</li>
          <li>Vasco</li>

          <li data-role="list-divider">... e internacionais</li> 
          <li>Real Madrid</li>
          <li>Barcelona</li>
          <li>Milan</li>
          <li>Juventus</li>
          <li>Bayern Munchen</li>
          <li>Manchester United</li>
          <li>Peñarol</li>
          <li>Boca Juniors</li>
          <li>Liverpool</li>
          <li>Ajax</li>
          <li>Inter de Milão</li>
          <li>Porto</li>
          <li>Benfica</li>
          <li>River Plate</li>
          <li>Glasgow Rangers</li>
          <li>Independiente</li>
          <li>São Paulo</li>
          <li>Nacional</li>
          <li>Santos</li>
          <li>Linfield</li>
          <li>Celtic</li>
          <li>Flamengo</li>
          <li>Internacional</li>
          <li>Olimpia</li>
          <li>Arsenal</li>
          <li>Athletic Bilbao</li>
          <li>Sparta Praha</li>
          <li>Olympiakos</li>
          <li>PSV Eindhoven</li>
          <li>Sporting</li>
          <li>Feyenoord</li>
          <li>Estrela Vermelha</li>
          <li>Atlético de Madrid</li>
          <li>Anderlecht</li>
          <li>Rapid Viena</li>
          <li>Zamalek</li>
          <li>Ferencváros TC</li>
          <li>Austria Viena</li>
          <li>Dínamo Kiev</li>
          <li>Colo Colo</li>
          <li>CSKA Sofia</li>
          <li>Valência</li>
          <li>Éverton</li>
          <li>Aston Villa</li>
          <li>Grasshopper</li>
          <li>Glentoran</li>
          <li>Borussia Dortmund</li>
          <li>Copenhague</li>
          */ ?>
        </ul>
      </nav> 
    </div>

  </div> 
  
  <?php /*
  <div data-role="footer" class="nav-glyphish-example"> 
    <div data-role="navbar" data-grid="d" data-theme="e" class="nav-glyphish-example"> 
      <ul> 
        <li><a href="#" id="chat" data-icon="custom" data-theme="b">Chat</a></li> 
        <li><a href="#" id="email" data-icon="custom" data-theme="b">Email</a></li> 
        <li><a href="#" id="skull" data-icon="custom" data-theme="b">Danger</a></li> 
        <li><a href="#" id="beer" data-icon="custom" data-theme="b">Beer</a></li> 
        <li><a href="#" id="coffee" data-icon="custom" data-theme="b">Coffee</a></li> 
      </ul> 
    </div> 
  </div>
  */ ?>

  <?php include_partial('global/footer') ?>

</div> 
</body> 
</html> 