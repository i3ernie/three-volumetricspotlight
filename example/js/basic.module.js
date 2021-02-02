import * as THREE from "../../node_modules/three/build/three.module.js";
import addVolumetricSpotlightMaterial2DatGui from "../../src/datgui.volumetricSpotlight.module.js"
import Volumetricspotlight from "../../src/Volumetricspotlight.module.js"
import Viewport from "../../node_modules/three-viewport/dist/viewport.es.js"



	let VP = new Viewport();

    VP.init();
	VP.start();
	
	//document.body.appendChild( VP.renderer.domElement );
	VP.renderer.setClearColor('black', 0 );
	VP.renderer.shadowMap.enabled	= true;

	VP.camera.position.set(0,2,5);
	VP.camera.lookAt(VP.scene.position);

    // add a ambient light
    VP.scene.add( new THREE.AmbientLight( 0x666666 ) );

	VP.scene.fog	= new THREE.FogExp2( 0x000000, 0.1 );

	
	//////////////////////////////////////////////////////////////////////////////////
	//		create a scene							//
	//////////////////////////////////////////////////////////////////////////////////

	// add back wall
	var geometry	= new THREE.BoxGeometry( 20, 0.1, 20, 20, 1, 20 );
	var material	= new THREE.MeshPhongMaterial({
		color	: new THREE.Color('gray')
	});
	var mesh	= new THREE.Mesh( geometry, material );
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	mesh.rotateX(Math.PI/2)
	mesh.position.set( 0, -geometry.parameters.height/2, -1)
	VP.scene.add( mesh );
	// add back wall - wireframe
	var material	= new THREE.MeshPhongMaterial({
		wireframe		: true,
		wireframeLinewidth	: 2,
		color			: new THREE.Color('black'),
	});
	var mesh	= new THREE.Mesh( geometry.clone(), material );
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	mesh.scale.multiplyScalar(1.01)
	mesh.rotateX(Math.PI/2)
	mesh.position.set( 0, -geometry.parameters.height/2, -1)
	VP.scene.add( mesh );

	// add ground
	var geometry	= new THREE.BoxGeometry( 20, 0.1, 20, 20, 1, 20 );
	var material	= new THREE.MeshPhongMaterial({
		color	: new THREE.Color('gray')
	});
	var mesh	= new THREE.Mesh( geometry, material );
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	mesh.position.set( 0, -geometry.parameters.height/2, 0)
	VP.scene.add( mesh );

	// add ground - wireframe
	var material	= new THREE.MeshPhongMaterial({
		wireframe		: true,
		wireframeLinewidth	: 2,
		color			: new THREE.Color('black'),
	});
	var mesh	= new THREE.Mesh( geometry.clone(), material );
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	mesh.scale.multiplyScalar(1.01)
	mesh.position.set( 0, -geometry.parameters.height/2, 0)
	VP.scene.add( mesh );

	// add a cube
	var geometry	= new THREE.BoxGeometry( 0.3, 2, 0.3 );
	var material	= new THREE.MeshPhongMaterial({
		color	: new THREE.Color('gray')
	});
	var mesh	= new THREE.Mesh( geometry, material );
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	mesh.position.set(0,geometry.parameters.height/2,0)
	VP.scene.add( mesh );

	// add a cube
	var geometry	= new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
	var material	= new THREE.MeshPhongMaterial({
		color	: new THREE.Color('gray')
	});
	var mesh	= new THREE.Mesh( geometry, material );
	mesh.position.set(0.2,geometry.parameters.height/2,0.5)
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	VP.scene.add( mesh );

	// add a sphere
	var geometry	= new THREE.SphereGeometry( 0.3, 16, 8 );
	var material	= new THREE.MeshPhongMaterial({
		color	: new THREE.Color('gray'),
	});
	var mesh	= new THREE.Mesh( geometry, material );
	mesh.receiveShadow	= true
	mesh.castShadow		= true
	mesh.position.set(0.5,geometry.radius,0)
	VP.scene.add( mesh );


	//////////////////////////////////////////////////////////////////////////////////
	//		animate the volumetric spotLight				//
	//////////////////////////////////////////////////////////////////////////////////

	VP.loop.add(function( delta, now ){
		var angle	= 0.1 * Math.PI*2*now;
		target.set( 1*Math.cos(angle), 0, 1*Math.sin(angle) );
		spotLight.update();
	});

	//////////////////////////////////////////////////////////////////////////////////
	//		add a volumetric spotligth					//
	//////////////////////////////////////////////////////////////////////////////////

	let angle =.1;
	const target	= new THREE.Vector3(1*Math.cos(angle),0,1*Math.sin(angle));
	var spotLight	= new Volumetricspotlight({follow: target });
	
	spotLight.position.set( 1.5,2,0 );
	
	VP.scene.add( spotLight );
	VP.scene.add( spotLight.light.target );

	//////////////////////////////////////////////////////////////////////////////////
	//		link it with a spotLight					//
	//////////////////////////////////////////////////////////////////////////////////

	let lightHelper = new THREE.SpotLightHelper( spotLight.light );
	let shadowCameraHelper = new THREE.CameraHelper( spotLight.light.shadow.camera );

	VP.scene.add( lightHelper );
	VP.scene.add( shadowCameraHelper );

	VP.loop.add(function( delta, now ){
		lightHelper.update();
		shadowCameraHelper.update();
	});
	
	// add a DAT.Gui for fine tuning
	new addVolumetricSpotlightMaterial2DatGui( spotLight );