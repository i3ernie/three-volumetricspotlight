/**
 * addVolumetricSpotlightMaterial2DatGui.js definition
 * @type {function}
 */

 import dat from "../node_modules/dat.gui/build/dat.gui.module.js"

const addVolumetricSpotlightMaterial2DatGui	= function( spotlight, datGui ){
	datGui		= datGui || new dat.GUI();

	var uniforms	= spotlight.volume.material.uniforms;
	// options
	var options  = Object.assign({
		anglePower	: uniforms['anglePower'].value,
		attenuation	: uniforms['attenuation'].value,
		lightColor	: '#'+uniforms.lightColor.value.getHexString(),
		penumbra : .1,
		angle : Math.PI/3,
		decay : 1,
		intensity : 3
	}, spotlight.options)
	const onChange = function() {
		uniforms['anglePower'].value	= options.anglePower
		uniforms['attenuation'].value	= options.attenuation
		uniforms.lightColor.value.set( options.lightColor ); 
		spotlight.light.penumbra = options.penumbra;
		spotlight.light.angle = options.angle;
		spotlight.light.intensity = options.intensity;
		spotlight.light.decay = options.decay;
	}

	onChange();
	
	// config datGui
	datGui.add( options, 'anglePower', 0, 10)	.listen().onChange( onChange );
	datGui.add( options, 'attenuation', 0, 10)	.listen().onChange( onChange );
	datGui.add( options, 'penumbra', 0, 1)		.listen().onChange( onChange );
	datGui.add( options, 'angle', .1, Math.PI*.5)		.listen().onChange( onChange );
	datGui.add( options, 'intensity', 0.1, 3)		.listen().onChange( onChange );
	datGui.add( options, 'decay', 1, 2)		.listen().onChange( onChange );

	datGui.addColor( options, 'lightColor' )	.listen().onChange( onChange );
}

export default addVolumetricSpotlightMaterial2DatGui;