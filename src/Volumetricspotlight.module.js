import * as THREE from "../node_modules/three/build/three.module.js";
import VolumetricSpotLightMaterial from"./Material.Volumetricspotlight.module.js"; 

//class Mesh extends Object3D
class Volumetric extends THREE.Mesh {

    constructor ( opts ) {

        const defaults = {
            height : 5,
            angle : Math.PI/6,
            size : .1
        };

        super();

        const o = this.options = Object.assign({}, defaults, opts);
    
       this.geometry = this.getGeo();
        // var geometry	= new THREE.BoxGeometry( 3, 1, 3 );
        // var material	= new THREE.MeshNormalMaterial({
        // 	side	: THREE.DoubleSide
        // });
        // var material	= new THREE.MeshPhongMaterial({
        // 	color		: 0x000000,
        // 	wireframe	: true,
        // })
        this.material = new VolumetricSpotLightMaterial( o );

        this.material.uniforms.spotPosition.value	= this.position;
    }

    getGeo () {
        const o = this.options;

        let geo	= new THREE.CylinderGeometry( o.size, o.height*Math.tan( o.angle ), o.height, 32*2, 20, true);
        geo.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, -geo.parameters.height/2, 0 ) );
        geo.applyMatrix4( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );
        geo.computeVertexNormals();

        return geo;
    }

    update () {
        this.material.uniforms.spotPosition.value	= this.parent.position;
        this.options.angle = this.parent.light.angle;
        this.geometry.dispose();
        this.geometry = this.getGeo();
    }
};


class SpotLight extends THREE.SpotLight {

    constructor ( opts ) {
    
        super(); 

        let color = typeof opts.color === "string"? new THREE.Color( opts.color ): opts.color;
        
        this.color		= color;
        this.angle		= opts.angle;
        this.intensity	= opts.intensity;
        this.penumbra   = opts.penumbra;
        this.decay      = opts.decay;

        this.enableShadow();
    }

    enableShadow () {
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
};

const defaults = {
    intensity : 2,
    penumbra : .1,
    angle : Math.PI/6,
    decay : 1,
    size : .05
};

class Volumetricspotlight extends THREE.Object3D {
    constructor ( opts ) {

        super();

        let o = this.options = Object.assign({}, defaults, opts);


        this.volume = new Volumetric( o );
        this.volume.position.set( 0, 1, 0 );

        o.color = this.volume.material.uniforms.lightColor.value;

        this.light = new SpotLight( o );
        
        
        
        this.add( this.light );
        this.add( this.volume );

    
        if ( o.target ){ 
            if ( o.target instanceof THREE.Object3D || o.target instanceof THREE.Vector3 ) { 
                this.follow = o.target;
                this.volume.lookAt( o.target );
                this.light.target.position.copy( o.target );
            } else {
                let t = new THREE.Object3D()
                this.follow = t.position;
                t.position.set( o.target[0], o.target[1], o.target[2] );
                this.volume.lookAt( this.follow );
                this.light.add( t );
                this.light.target.position.copy( this.follow );
            }
        }
    }

    update () { 
        if ( this.follow ){
            this.volume.lookAt( this.follow );
            this.light.target.position.copy( this.follow );
            this.volume.update();
        }
    }
};



// doesnt seems to work - not moving with the spotLight
// var helper	= new THREE.SpotLightHelper(spotLight)
// scene.add(helper)
// onRenderFcts.push(function(delta, now){
// 	helper.update()
// })


export {Volumetricspotlight, Volumetric, SpotLight, VolumetricSpotLightMaterial};
export default Volumetricspotlight;