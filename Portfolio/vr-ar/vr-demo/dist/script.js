// Declaration of Variable Independence
var width = window.innerWidth;
var height = window.innerHeight;
var boo = 0;
var scene, camera, renderer, controls;
var directionalLight
var skyGeo, skyMat, sky, skyTex,skyOpa;
var wall_back,wall_left,wall_right,wall_floor,wall_top,
    wall_front,wall_material,
    wall_geometry;
var title,titleGeo,titleMat,myString;
var titleBoo = 1;
var gridHelper_back,gridHelper_left,gridHelper_right,
    gridHelper_floor,gridHelper_top,gridHelper_front, gridColor;
var storyFrame = 0;
var advanceable = 1;

var titleGeo, titleMat, title;
var cubeGeo,cubeMat,cube, cube2,cube3,cube3Mat;
var cube2opa = 1;
var hNew=0.13,sNew=0.89,lNew=0.50;
var skyze=1; // sky + size = skyze

var mouseX = 0,
    mouseY = 0;
var wall_width = 800,
    wall_height = 1000;
var grid_size = wall_width,grid_step = wall_width/10;
wall_width = 800;
// main
skyOpa = 1;
console.log("begin")
init();
animate();

// functions
function init() {
  // create scene, camera, renderer,
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5100);
  camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2600);
  camera2.position.z = 400;
  renderer = new THREE.WebGLRenderer({alpha:true});
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  skyGeo = new THREE.SphereGeometry(5000,10,10);
  THREE.ImageUtils.crossOrigin = "";
  skyTex =  THREE.ImageUtils.loadTexture('http://brainsandspace.com/chrome_experiments/universe_equi.png');
  //'http://brainsandspace.com/version_A/chrome_experiments/heli_background.jpg'); 
  skyMat = new THREE.MeshBasicMaterial({
    map: skyTex,
    //color:0x16a085
  })
  sky = new THREE.Mesh(skyGeo,skyMat);
  scene.add(sky);
  sky.material.side = THREE.DoubleSide;

  cubeGeo = new THREE.BoxGeometry(10,10,5)
  cubeMat = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    shading: THREE.FlatShading
  })
  cube = new THREE.Mesh(cubeGeo,cubeMat);
  scene.add(cube);
  cube.position.z = -50;  

  makeGrids();
  makeWalls();

  Reticulum.init(camera, {
    proximity: false,
    reticle: {
      visible: true,
      far: 1000, //Defines the reticle's resting point when no object has been targeted
      color: 0x000000,
      innerRadius: 0.0001,
      outerRadius: 0.006,
      ignoreInvisible: true,
      hover: {
        color: 0x000000,
        innerRadius: 0.02,
        outerRadius: 0.024,
        speed: 3,
        vibrate: 50 //Set to 0 or [] to disable
      }
    },
    fuse: {
      visible: true,
      duration: 2.5,
      color: 0x0,
      innerRadius: 0.045,
      outerRadius: 0.06,
      vibrate: 100 //Set to 0 or [] to disable
    }
  });

  Reticulum.addCollider( cube );
  cube.ongazeover = function(){
    // have the object react when user looks at it
    this.material = new THREE.MeshPhongMaterial({color: 0xffcc00});
  }

  cube.ongazeout = function(){// have the object react when user looks away from it
    this.material = new THREE.MeshPhongMaterial({color:  0xcc0000 }); 
  }
  cube.ongazelong = function(){
    // have the object react when user looks at it for a specific time
    this.material = new THREE.MeshPhongMaterial({color:  0x00cc,transparent:true, opacity:cube2opa  });
    advanceScene();
  }

  scene.add(camera);
  lightsOn();
  checkMobile();
}




function animate() {
  //camera.rotation.y +=0.01;
  Reticulum.update()
  requestAnimationFrame(animate);
  moveThings();
  if (boo)  {
    controls.update();
  }
  if (!boo) {
    camera.position.x += (mouseX - camera.position.x) * 0.01;
    camera.position.y += (- mouseY - camera.position.y) * 0.05;
  }
  if (boo) {
    renderer.autoClear = false;
    renderer.setViewport(width/2,0,width/2,height);
    renderer.render(scene, camera);   renderer.setViewport(0,0,width/2,height);
  }
  renderer.render(scene, camera);

}


//////////////////////////////////////////////
//more FUNctions below
/////////////////////////////////////////////
function moveThings() {
  if (!advanceable){
    cube.rotation.y += 0.1;
  }
  if (storyFrame == 1)
  {
    var posStep = 10;
    var opaStep = 0.001;
    wall_material.opacity -= opaStep;
    wall_back.position.z -= posStep;
    wall_left.position.x -= posStep;
    wall_right.position.x += posStep;
    wall_front.position.z += posStep;
    wall_top.position.y += posStep;
    wall_floor.position.y -= posStep;
    gridHelper_back.position.z -= posStep;
    gridHelper_left.position.x -= posStep;
    gridHelper_right.position.x += posStep;
    gridHelper_front.position.z += posStep;
    gridHelper_top.position.y += posStep;
    gridHelper_floor.position.y -= posStep;
    /*
    Won't let me change opacity of grids, so this is a hack.
    wall color HSL:0.47	0.76	0.36
    grid color HSL: 0.13	0.89	0.50*/
    var hStep = (0.47 - 0.13)/100;
    var sStep = (0.76 - 0.89)/100;
    var lStep = (0.36 - 0.50)/100;
    hNew += hStep;
    sNew += sStep;
    lNew += lStep;
    gridColor.setHSL(hNew,sNew,lNew);
    gridHelper_back.setColors(gridColor,gridColor);
    gridHelper_left.setColors(gridColor,gridColor);
    gridHelper_right.setColors(gridColor,gridColor);
    gridHelper_top.setColors(gridColor,gridColor);
    gridHelper_floor.setColors(gridColor,gridColor);
    gridHelper_front.setColors(gridColor,gridColor);

    // make sure the cube is oriented correctly before making it stop spinning
    if (wall_back.position.z < -2500 && Math.abs(cube.rotation.y%Math.PI)<0.01) {
      advanceable = 1;
    }

    if (hNew > 0.47) 
      scene.remove (gridHelper_back,gridHelper_front,gridHelper_left,gridHelper_right,gridHelper_top,gridHelper_floor);

  }
  // the universe collapses
  if (storyFrame == 2) {
    scene.remove(wall_back,wall_front,wall_left,wall_right,wall_top,wall_floor);


    wall_geometry.dispose();
    wall_material.dispose();
    var scaleFactor = 0.99;
    skyze = skyze*scaleFactor;
    sky.scale.set(skyze,skyze,1);
    if (skyze < 0.005 && Math.abs(cube.rotation.y%Math.PI)<0.01){
      scene.remove(sky);
      skyMat.dispose();
      skyTex.dispose();
      skyGeo.dispose();
      advanceable = 1;
    }
  }
  if (storyFrame == 3) {
    if (titleBoo){
      myString = "BRAINS and SPACE";
      writeTitle();
      titleBoo = 0;
      advanceable = 1;
    }
  }
}

function advanceScene() {
  if (advanceable){
    storyFrame++; 
    advanceable= 0;}
  else{
  }
  console.log(storyFrame);
}

function writeTitle(thisString){
  titleGeo = new THREE.TextGeometry(myString,{size:10, height:10})
  titleMat = new THREE.MeshBasicMaterial({color:0xff});
  title = new THREE.Mesh(titleGeo,titleMat);
  scene.add(title);
  title.position.z = -100;
  title.position.x = -100;
  title.position.y = 50;
  Reticulum.addCollider( title );
  title.ongazeover = function(){
    // have the object react when user looks at it
    this.material = new THREE.MeshBasicMaterial({color: 0xffcc00});
  }

  title.ongazeout = function(){// have the object react when user looks away from it
    this.material = new THREE.MeshBasicMaterial({color:  0xcc0000 }); 
  }
  title.ongazelong = function(){
    // have the object react when user looks at it for a specific time
    this.material = new THREE.MeshBasicMaterial({color:  0x00cc});
  }}

function makeWalls() {
  wall_geometry = new THREE.PlaneGeometry(wall_width*2, wall_width*2, 1);

  wall_material = new THREE.MeshBasicMaterial({
    transparent:true,
    color: 0x16a085 
  });
  wall_material.side = THREE.DoubleSide;


  // breathe life into objects
  wall_back = new THREE.Mesh(wall_geometry, wall_material);
  wall_left = new THREE.Mesh(wall_geometry, wall_material);
  wall_right = new THREE.Mesh(wall_geometry,wall_material);
  wall_floor = new THREE.Mesh(wall_geometry,wall_material);
  wall_top = new THREE.Mesh(wall_geometry,wall_material);
  wall_front = new THREE.Mesh(wall_geometry,wall_material);

  scene.add(wall_back);
  scene.add(wall_left);
  scene.add(wall_right);
  scene.add(wall_floor);
  scene.add(wall_top);
  scene.add(wall_front);

  wall_left.rotation.y = Math.PI/2;
  wall_left.position.x -= wall_width;
  // wall_left.position.z = wall_width/2 - 10;

  wall_right.rotation.y = -Math.PI/2;
  wall_right.position.x += wall_width;
  //wall_right.position.z = wall_width/2 - 10;

  wall_floor.rotation.x = -Math.PI/2;
  wall_floor.position.y = -wall_width;
  //wall_floor.position.z = wall_width/2 - 10 - 10 -10 -10 -10 -10 -10;

  wall_top.rotation.x = Math.PI/2;
  wall_top.position.y = wall_width;
  //wall_top.position.z = wall_width/2 - 10 - 10 -10 -10 -10 -10 -10;

  wall_front.position.z = wall_width;
  wall_front.rotation.x = Math.PI;

  wall_back.position.z -= wall_width+1;
}

function makeGrids() {
  gridColor = new THREE.Color(0xf1c40f);
  gridHelper_back = new THREE.GridHelper( grid_size, grid_step );		
  gridHelper_back.position.z = -grid_size;
  gridHelper_back.rotation.x = Math.PI/2;
  gridHelper_back.setColors(gridColor,gridColor);
  scene.add( gridHelper_back );

  gridHelper_left = new THREE.GridHelper( grid_size, grid_step );		
  gridHelper_left.setColors(gridColor,gridColor);
  gridHelper_left.rotation.z = Math.PI/2;
  gridHelper_left.position.x -= wall_width -1;
  scene.add(gridHelper_left);

  gridHelper_right = new THREE.GridHelper( grid_size, grid_step );		
  gridHelper_right.setColors(gridColor,gridColor);
  gridHelper_right.rotation.z = -Math.PI/2;
  gridHelper_right.position.x += wall_width -1;
  scene.add(gridHelper_right);

  gridHelper_floor = new THREE.GridHelper( grid_size, grid_step );		
  gridHelper_floor.setColors(gridColor,gridColor);
  gridHelper_floor.position.y -= wall_width -1;
  scene.add(gridHelper_floor);

  gridHelper_top = new THREE.GridHelper( grid_size, grid_step );		
  gridHelper_top.setColors(gridColor,gridColor);
  gridHelper_top.position.y = wall_width-1;
  scene.add(gridHelper_top);

  gridHelper_front = new THREE.GridHelper( grid_size, grid_step );		
  gridHelper_front.position.z = wall_width-1;
  gridHelper_front.rotation.x = Math.PI/2;
  gridHelper_front.setColors(gridColor,gridColor);
  scene.add( gridHelper_front );
}

function lightsOn() {
  directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
  directionalLight.position.set( 0, 0, 0 );
  scene.add( directionalLight );
  directionalLight.target=cube;
  lightHelper = new THREE.DirectionalLightHelper(directionalLight, 100);

  directionalLight.castShadow = true;

  directionalLight.shadowMapWidth = 2048;
  directionalLight.shadowMapHeight = 2048;

  var d = 50;

  directionalLight.shadowCameraLeft = -d;
  directionalLight.shadowCameraRight = d;
  directionalLight.shadowCameraTop = d;
  directionalLight.shadowCameraBottom = -d;

  directionalLight.shadowCameraFar = 3500;
  directionalLight.shadowBias = -0.0001;
  directionalLight.shadowDarkness = 0.35;
  //directionalLight.shadowCameraVisible = true;

  cube.castShadow = true;
  cube.receiveShadow = true;
}

// controls
function checkMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    controls = new THREE.DeviceOrientationControls(camera, true);
    boo = 1;
  }
}

document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(e) {
  mouseX = e.clientX - width/2;
  mouseY = e.clientY - height/2;  
}
//document.addEventListener('click',advanceScene);