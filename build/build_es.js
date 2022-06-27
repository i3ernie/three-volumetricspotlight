const rollup  = require('rollup');
const resolve =require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');
const replace = require("./replace.js");
const async = require("async");

const transforms = {
    arrow: false,
    classes: false,
    letConst : false
};


const build_ES = function( done ){
   
    rollup.rollup({
        input : 'src/Volumetricspotlight.module.js',
        external: [
            '../node_modules/three/build/three.module.js', 
            '../../node_modules/three/build/three.module.js'
        ],
        
        plugins:[
            
            resolve()
           /* 
            buble({
				transforms: transforms
            })*/
        ]
    }).then(( bundle ) => { 
        bundle.write({
            file: './dist/volumetricspotlight.module.js',
            plugins:[
                
                replace({
                    "../node_modules/three/build/three.module.js" : "three"
                })
            ],
            
            format: 'es',
            name: 'three',
            exports: 'named',
            sourcemap: true
          });
          //build_extDomeventsES( done );
          done();
    }).catch(
        (err)=>{console.error(err);}
    );
};


module.exports = function( done ){
    async.series([
        build_ES
    ], function( err, data ){
        done();
    });
};