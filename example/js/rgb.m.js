import * as THREE from "three";
//import addVolumetricSpotlightMaterial2DatGui from "../../src/datgui.volumetricSpotlight.module.js"
import Volumetricspotlight from "volumetricspotlight"
import Viewport from "./vendor/viewport.es.js"
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
	spotLight2.update();
	spotLight3.update();
});


//////////////////////////////////////////////////////////////////////////////////
//		add a volumetric spotligth					//
//////////////////////////////////////////////////////////////////////////////////

let angle =.1;
const target	= new THREE.Vector3(1*Math.cos(angle),0,1*Math.sin(angle));
var spotLight	= new Volumetricspotlight({color:"green", target: target });

spotLight.position.set( 1.5, 2, 0 );


var spotLight2	= new Volumetricspotlight({color:"red", target: target });
spotLight2.position.set( -1.5, 2, 0 );

var spotLight3	= new Volumetricspotlight({color:"blue", target: target });
spotLight3.position.set( 0, 2, 1.5 );

VP.scene.add( spotLight, spotLight2, spotLight3 );


VP.scene.add( spotLight.light.target, spotLight2.light.target, spotLight3.light.target );
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
//new addVolumetricSpotlightMaterial2DatGui( spotLight );