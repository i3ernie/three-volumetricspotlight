/**
 * addVolumetricSpotlightMaterial2DatGui.js definition
 * @type {function}
 */

 import dat from "../node_modules/dat.gui/build/dat.gui.module.js"

const addVolumetricSpotlightMaterial2DatGui	= function( material, datGui ){
	datGui		= datGui || new dat.GUI();

	var uniforms	= material.uniforms;
	// options
	var options  = {
		anglePower	: uniforms['anglePower'].value,
		attenuation	: uniforms['attenuation'].value,
		lightColor	: '#'+uniforms.lightColor.value.getHexString(),
		penumbra : .1
	}
	const onChange = function() {
		uniforms['anglePower'].value	= options.anglePower
		uniforms['attenuation'].value	= options.attenuation
		uniforms.lightColor.value.set( options.lightColor ); 
	}

	onChange();
	
	// config datGui
	datGui.add( options, 'anglePower', 0, 10)	.listen().onChange( onChange );
	datGui.add( options, 'attenuation', 0, 10)	.listen().onChange( onChange );
	datGui.add( options, 'penumbra', 0, 1)		.listen().onChange( onChange );

	datGui.addColor( options, 'lightColor' )	.listen().onChange( onChange );
}

export default addVolumetricSpotlightMaterial2DatGui;