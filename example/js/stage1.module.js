import * as THREE from "../../node_modules/three/build/three.module.js";

const stage1 = function( VP ){

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
    material	= new THREE.MeshPhongMaterial({
        wireframe		: true,
        wireframeLinewidth	: 2,
        color			: new THREE.Color('black'),
    });
    mesh	= new THREE.Mesh( geometry.clone(), material );
    mesh.receiveShadow	= true
    mesh.castShadow		= true
    mesh.scale.multiplyScalar(1.01)
    mesh.rotateX(Math.PI/2)
    mesh.position.set( 0, -geometry.parameters.height/2, -1)
    VP.scene.add( mesh );

    // add ground
    geometry	= new THREE.BoxGeometry( 20, 0.1, 20, 20, 1, 20 );
    material	= new THREE.MeshPhongMaterial({
        color	: new THREE.Color('gray')
    });
    mesh	= new THREE.Mesh( geometry, material );
    mesh.receiveShadow	= true
    mesh.castShadow		= true
    mesh.position.set( 0, -geometry.parameters.height/2, 0)
    VP.scene.add( mesh );

    // add ground - wireframe
    material	= new THREE.MeshPhongMaterial({
        wireframe		: true,
        wireframeLinewidth	: 2,
        color			: new THREE.Color('black'),
    });
    mesh	= new THREE.Mesh( geometry.clone(), material );
    mesh.receiveShadow	= true
    mesh.castShadow		= true
    mesh.scale.multiplyScalar(1.01)
    mesh.position.set( 0, -geometry.parameters.height/2, 0)
    VP.scene.add( mesh );

    // add a cube
    geometry	= new THREE.BoxGeometry( 0.3, 2, 0.3 );
    material	= new THREE.MeshPhongMaterial({
        color	: new THREE.Color('gray')
    });
    mesh	= new THREE.Mesh( geometry, material );
    mesh.receiveShadow	= true
    mesh.castShadow		= true
    mesh.position.set( 0, geometry.parameters.height/2, 0 )
    VP.scene.add( mesh );

    // add a cube
    geometry	= new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
    material	= new THREE.MeshPhongMaterial({
        color	: new THREE.Color('gray')
    });
    mesh	= new THREE.Mesh( geometry, material );
    mesh.position.set( 0.2, geometry.parameters.height/2, 0.5)
    mesh.receiveShadow	= true
    mesh.castShadow		= true
    VP.scene.add( mesh );

    // add a sphere
    geometry	= new THREE.SphereGeometry( 0.3, 16, 8 );
    material	= new THREE.MeshPhongMaterial({
        color	: new THREE.Color('gray'),
    });
    mesh	= new THREE.Mesh( geometry, material );
    mesh.receiveShadow	= true
    mesh.castShadow		= true
    mesh.position.set(0.5,geometry.radius,0)
    VP.scene.add( mesh );
};
export default stage1;