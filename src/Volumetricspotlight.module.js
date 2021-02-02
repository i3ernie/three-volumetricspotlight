import * as THREE from "../../node_modules/three/build/three.module.js";
import VolumetricSpotLightMaterial from"./Material.Volumetricspotlight.module.js"; 


const Volumetric = function( opts ){
    const defaults = {
        height : 5,
        angle : Math.PI/6
    };

    const o = this.options = Object.assign({}, defaults, opts);
   
	let geo	= this.getGeo();
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
    constructor : Volumetric,
    getGeo : function(){
        let geo	= new THREE.CylinderGeometry( .1, this.options.height*Math.tan( this.options.angle ), this.options.height, 32*2, 20, true);
        geo.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, -geo.parameters.height/2, 0 ) );
        geo.applyMatrix4( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );
        geo.computeVertexNormals();
        return geo;
    },
    update : function(){
        this.material.uniforms.spotPosition.value	= this.parent.position;
        this.options.angle = this.parent.light.angle;
        this.geometry.dispose();
        this.geometry = this.getGeo();
    }
});


const SpotLight = function( opts ) {
    THREE.SpotLight.call( this );

    this.color		= opts.color;
    this.angle		= opts.angle;
    this.intensity	= opts.intensity;
    this.penumbra   = opts.penumbra;
    this.decay      = opts.decay;

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

const defaults = {
    intensity : 3,
    penumbra : .1,
    angle : Math.PI/6,
    decay : 1
};

const Volumetricspotlight = function( opts ){
    let o = this.options = Object.assign({}, defaults, opts);

    this.volume = new Volumetric();
    this.volume.position.set( 0,1,0 );

    o.color = this.volume.material.uniforms.lightColor.value;

    this.light = new SpotLight( o );
    
    THREE.Object3D.call( this );
    
    this.add( this.light );
    this.add( this.volume );

    

    if ( o.follow ){ 
        this.follow = o.follow;
        this.volume.lookAt( o.follow );
		this.light.target.position.copy( o.follow );
    }

};

Volumetricspotlight.prototype = Object.assign( Object.create( THREE.Object3D.prototype ),{
    constructor : Volumetricspotlight,
    update : function(){
        if ( this.follow ){
            this.volume.lookAt( this.follow );
            this.light.target.position.copy( this.follow );
            this.volume.update();
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