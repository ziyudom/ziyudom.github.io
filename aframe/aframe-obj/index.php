<html>
  <head>
    <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
        <a-assets>
              <a-asset-item id="crate-obj" src="kinoko.obj"></a-asset-item>
              <a-asset-item id="crate-mtl" src="kinoko.mtl"></a-asset-item>
        </a-assets>
      <a-obj-model position="0 0.5 -5" src="#crate-obj" mtl="#crate-mtl"></a-obj-model>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </body>
</html>
