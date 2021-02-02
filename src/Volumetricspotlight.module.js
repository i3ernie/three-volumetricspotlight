import * as THREE from "../../node_modules/three/build/three.module.js";
import VolumetricSpotLightMaterial from"./Material.Volumetricspotlight.module.js"; 

const Volumetric = function(){
    let geo	= new THREE.CylinderGeometry( 0.1, 1.5, 5, 32*2, 20, true);
	// var geometry	= new THREE.CylinderGeometry( 0.1, 5*Math.cos(Math.PI/3)/1.5, 5, 32*2, 20, true);
	geo.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, -geo.parameters.height/2, 0 ) );
	geo.applyMatrix4( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );
	// geometry.computeVertexNormals()
	// var geometry	= new THREE.BoxGeometry( 3, 1, 3 );
	// var material	= new THREE.MeshNormalMaterial({
	// 	side	: THREE.DoubleSide
	// });
	// var material	= new THREE.MeshPhongMaterial({
	// 	color		: 0x000000,
	// 	wireframe	: true,
	// })
	let material	= new VolumetricSpotLightMaterial()
    THREE.Mesh.call( this, geo, material );

    
	material.uniforms.lightColor.value.set('white')
    material.uniforms.spotPosition.value	= this.position;
};

Volumetric.prototype = Object.assign( Object.create( THREE.Mesh.prototype ),{
    constructor : Volumetric
});

const defaults = {
    intensity : 3,
    penumbra : .1
};

const SpotLight = function( material ) {
    THREE.SpotLight.call( this );

    this.color		= material.uniforms.lightColor.value;
    this.exponent	= 30;
    this.angle		= Math.PI/3;
    this.intensity	= 3;
    this.penumbra = 0.1;

    this.enableShadow();
};

SpotLight.prototype = Object.assign( Object.create( THREE.SpotLight.prototype ), {
    constructor : SpotLight,
    enableShadow : function(){
        this.castShadow	= true;
        this.shadow.camera.near	= 0.01;
        this.shadow.camera.far	= 15;
        this.shadow.camera.fov	= 45;
    
        this.shadow.camera.left	= -8;
        this.shadow.camera.right =  8;
        this.shadow.camera.top	=  8;
        this.shadow.camera.bottom= -8;

        this.shadow.mapSize.width	= 1024
        this.shadow.mapSize.height	= 1024

        this.shadow.bias	= 0.0;
    }
});

const Volumetricspotlight = function(opts){
    
    this.volume = new Volumetric();
    this.light = new SpotLight( this.volume.material );
    this.volume.position.set(0,1,0);
    THREE.Object3D.call( this );
    
    this.add( this.light );
    this.add( this.volume );

    

    if ( opts.follow ){ this.follow = opts.follow;
        this.volume.lookAt( opts.follow );
		this.light.target.position.copy( opts.follow );
    }

};

Volumetricspotlight.prototype = Object.assign( Object.create( THREE.Object3D.prototype ),{
    constructor : Volumetricspotlight,
    update : function(){
        if ( this.follow ){
            this.volume.lookAt( this.follow );
		    this.light.target.position.copy( this.follow );
        }
    }
});



// doesnt seems to work - not moving with the spotLight
// var helper	= new THREE.SpotLightHelper(spotLight)
// scene.add(helper)
// onRenderFcts.push(function(delta, now){
// 	helper.update()
// })


export {Volumetricspotlight, Volumetric, SpotLight};
export default Volumetricspotlight;