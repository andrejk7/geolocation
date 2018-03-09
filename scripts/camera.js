////////////////////////////////////////////////////////////////////////////////
		// Init
////////////////////////////////////////////////////////////////////////////////
// init renderer
var renderer	= new THREE.WebGLRenderer({
	antialias: true,
	alpha: true
});
renderer.setClearColor(new THREE.Color('lightgrey'), 0)
renderer.setSize( 640, 480 );
renderer.domElement.style.position = 'absolute'
renderer.domElement.style.top = '0px'
renderer.domElement.style.left = '0px'
document.body.appendChild( renderer.domElement );
// array of functions for the rendering loop
var onRenderFcts= [];
// init scene and camera
var scene	= new THREE.Scene();

//////////////////////////////////////////////////////////////////////////////////
//		Initialize a basic camera
//////////////////////////////////////////////////////////////////////////////////
// Create a camera
var camera = new THREE.Camera();
scene.add(camera);
////////////////////////////////////////////////////////////////////////////////
//          handle arToolkitSource
////////////////////////////////////////////////////////////////////////////////
var arToolkitSource = new THREEx.ArToolkitSource({
	sourceType : 'webcam',
});

arToolkitSource.init(function onReady(){
	onResize()
});

// handle resize
window.addEventListener('resize', function(){
	onResize()
});

function onResize(){
	arToolkitSource.onResize()
	arToolkitSource.copySizeTo(renderer.domElement)
	if( arToolkitContext.arController !== null ){
		arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
	}
}

////////////////////////////////////////////////////////////////////////////////
//          initialize arToolkitContext
////////////////////////////////////////////////////////////////////////////////

// create atToolkitContext
var arToolkitContext = new THREEx.ArToolkitContext({
	cameraParametersUrl: 'data/camera_para.dat',
	detectionMode: 'mono',
})

// initialize it
arToolkitContext.init(function onCompleted(){
	// copy projection matrix to camera
	camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
})
// update artoolkit on every frame
onRenderFcts.push(function(){
	if( arToolkitSource.ready === false )	return
	arToolkitContext.update( arToolkitSource.domElement )

	// update scene.visible if the marker is seen
	scene.visible = camera.visible
})

scene.visible = false
//////////////////////////////////////////////////////////////////////////////////
//		add an object in the scene
//////////////////////////////////////////////////////////////////////////////////

var dir = new THREE.Vector3( 10, 10, 15 );

//normalize the direction vector (convert to vector of length 1)
dir.normalize();

var origin = new THREE.Vector3( 0, 0, 0 );
var length = 1;
var hex = 0xffff00;

var arrowHelper = new THREE.ArrowHelper( dir, origin, 0.5, hex );
scene.add( arrowHelper );

// onRenderFcts.push(function(delta){
// 	mesh.rotation.x += Math.PI*delta
// })
//////////////////////////////////////////////////////////////////////////////////
//		render the whole thing on the page
//////////////////////////////////////////////////////////////////////////////////
// render the scene
onRenderFcts.push(function(){
	renderer.render( scene, camera );
})
// run the rendering loop
var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
	// keep looping
	requestAnimationFrame( animate );
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	// call each update function
	onRenderFcts.forEach(function(onRenderFct){
		onRenderFct(deltaMsec/1000, nowMsec/1000)
	})
})
