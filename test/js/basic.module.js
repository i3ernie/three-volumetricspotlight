import * as THREE from "../../node_modules/three/build/three.module.js";
import addVolumetricSpotlightMaterial2DatGui from "../../src/datgui.volumetricSpotlight.module.js"
import Volumetricspotlight from "volumetricspotlight"
import Viewport from "../../node_modules/three-viewport/dist/viewport.es.js"
import stage1 from "./stage1.module.js"


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

	stage1( VP );


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
	var spotLight	= new Volumetricspotlight({target: target });
	
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