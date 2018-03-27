# aframe-teleport-extras

Teleport component Add-On


Add-On component to fernandojsg's aframe-teleport-controls empowering desktop &amp; cardboard


### Usage

#### Browser Installation

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.8.0/aframe.min.js"></script>
  <script src="https://rawgit.com/fernandojsg/aframe-teleport-controls/master/dist/aframe-teleport-controls.min.js"></script>
  <script src="https://rawgit.com/rdub80/aframe-teleport-extras/master/dist/aframe-teleport-extras.min.js"></script>
</head>

<body>
  <a-scene>
    <!-- interact with an object -->    
    <a-box class="selectable" position="-1 0.75 -3" rotation="45 45 0" color="pink" shadow></a-box>

    <a-entity id="cameraRig" position="0 1.6 0" >
      <!-- camera -->    
      <a-entity id="head" position="0 0 0" camera="userHeight:1.6" look-controls="pointerLockEnabled:true">
      	<!-- gaze controls -->
        <a-entity id="teleporter-mobile" position=".2 -.1 0"
          raycaster=
                  "objects: .selectable; far: 2"
          teleport-extras
          teleport-controls=
                  "cameraRig: #cameraRig;
                   teleportOrigin: #head;
                   startEvents:starttouch;
                   endEvents:endtouch;
                   curveShootingSpeed:15;
                   hitCylinderRadius:1;"
          >
        </a-entity>
      	<!-- optional cursor controls to interact with .selectable objects -->        
        <a-cursor toggle-on-event="raycasterObject: #teleporter-mobile" visible="false" position="0 0 -.05" scale="1 1 1" color="green"></a-cursor>
      </a-entity>

    </a-entity>    

    <a-plane id="floor" rotation="-90 0 0" width="50" height="50" color="white" segments-height="10" segments-width="10" shadow ></a-plane>
  </a-scene>
</body>
```