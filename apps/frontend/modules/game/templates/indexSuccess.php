<html>
  <head>
    <title>Sectorball</title>
    <script src="/res/js/jquery.min.js"></script>
    <script src="/res/js/Point2D.js"></script>
    <script src="/res/js/Engine.js"></script>
    <script src="/res/js/Intersections.js"></script>
    <script>
      $(function() {
        Engine();
      });
      function send(){
      }
    </script>
  </head>
  <body>
    <canvas id="canvasOne" width="1050" height="1300" style="background-color: black;"></canvas>
    <div style="width: 210px; position: fixed; left: 1060px; top:8px; height: 450px; overflow-x: hidden; overflow-y: auto;">
      <fieldset>
        <label>p1.x: <input type="text" id="p1x" value="" /></label>
      </fieldset>
      <fieldset>
        <label>p1.y: <input type="text" id="p1y" value="" /></label>
      </fieldset>
      <fieldset>
        <label>b1.x: <input type="text" id="b1x" value="" /></label>
      </fieldset>
      <fieldset>
        <label>b1.y: <input type="text" id="b1y" value="" /></label>
      </fieldset>
      <fieldset>
        <label>b2.x: <input type="text" id="b2x" value="" /></label>
      </fieldset>
      <fieldset>
        <label>b2.y: <input type="text" id="b2y" value="" /></label>
      </fieldset>
      
      <fieldset>
        <label>c1.x: <input type="text" id="c1x" value="" /></label>
      </fieldset>
      <fieldset>
        <label>c1.y: <input type="text" id="c1y" value="" /></label>
      </fieldset>
      <fieldset>
        <label>c2.x: <input type="text" id="c2x" value="" /></label>
      </fieldset>
      <fieldset>
        <label>c2.y: <input type="text" id="c2y" value="" /></label>
      </fieldset>
      <fieldset>
        <label>d1.x: <input type="text" id="d1x" value="" /></label>
      </fieldset>
      <fieldset>
        <label>d1.y: <input type="text" id="d1y" value="" /></label>
      </fieldset>
      <fieldset>
        <label>d2.x: <input type="text" id="d2x" value="" /></label>
      </fieldset>
      <fieldset>
        <label>d2.y: <input type="text" id="d2y" value="" /></label>
      </fieldset>
      <fieldset>
        <label>ball mass: <input type="text" id="mass" value="" /></label>
      </fieldset>
      <fieldset>
        <label>test: <input type="text" id="test" value="" /></label>
      </fieldset>
      <fieldset>
        <label>Cursor: <input type="text" id="mouse" value="" /></label>
      </fieldset>
      <fieldset>
        <label>Running? <input type="text" id="running" value="" /></label>
      </fieldset>
      <fieldset>
        <label>Turn: <input type="text" id="turn" value="" /></label>
      </fieldset>
      <fieldset>
        <label>Current player: <input type="text" id="current_player" value="" /></label>
      </fieldset>
      <fieldset>
        <label>Current player first collision: <input type="text" id="first_collision" value="" /></label>
      </fieldset>
      <fieldset>
        <label>Ball last collision: <input type="text" id="last_collision" value="" /></label>
      </fieldset>
      
      <div id="log"></div>
      <input id="msg" type="textbox" onkeypress="onkey (event);" />
      <button onclick="send ();">Send</button>
      <button onclick="quit ();">Quit</button>

    </div>

    <div style="display: none" />
    <img src="/res/img/model.png" id="model" alt="test" />
    <img src="/res/img/SPO/1/02.png" id="a1" alt="test" />
    <img src="/res/img/SPO/1/03.png" id="a2" alt="test" />
    <img src="/res/img/SPO/1/04.png" id="a3" alt="test" />
    <img src="/res/img/SPO/1/05.png" id="a4" alt="test" />
    <img src="/res/img/SPO/1/06.png" id="a5" alt="test" />
    <img src="/res/img/SPO/1/07.png" id="a6" alt="test" />
    <img src="/res/img/SPO/1/08.png" id="a7" alt="test" />
    <img src="/res/img/SPO/1/09.png" id="a8" alt="test" />
    <img src="/res/img/SPO/1/10.png" id="a9" alt="test" />
    <img src="/res/img/SPO/1/11.png" id="a10" alt="test" />
    <img src="/res/img/SPO/2/02.png" id="b1" alt="test" />
    <img src="/res/img/SPO/2/03.png" id="b2" alt="test" />
    <img src="/res/img/SPO/2/04.png" id="b3" alt="test" />
    <img src="/res/img/SPO/2/05.png" id="b4" alt="test" />
    <img src="/res/img/SPO/2/06.png" id="b5" alt="test" />
    <img src="/res/img/SPO/2/07.png" id="b6" alt="test" />
    <img src="/res/img/SPO/2/08.png" id="b7" alt="test" />
    <img src="/res/img/SPO/2/09.png" id="b8" alt="test" />
    <img src="/res/img/SPO/2/10.png" id="b9" alt="test" />
    <img src="/res/img/SPO/2/11.png" id="b10" alt="test" />
    </div>

    
  </body>
</html>