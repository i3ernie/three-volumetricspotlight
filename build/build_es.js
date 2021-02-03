const rollup  = require('rollup');
const resolve =require('rollup-plugin-node-resolve');
const buble = require('rollup-plugin-buble');
const replace = require("./replace.js");
const async = require("async");

const transforms = {
    arrow: false,
    classes: true,
    letConst : false
};

const build_Pack = function( done ){
   
    rollup.rollup({
        input : 'src/domevents.pack.es.js',
        external: ['../node_modules/three/build/three.module.js', '../../node_modules/three/build/three.module.js'],
        
        plugins:[
            
            resolve(),
            
            buble({
				transforms: transforms
            })
        ]
    }).then(( bundle ) => { 
        bundle.write({
            file: './dist/domevents.pack.es.js',
            plugins:[
                
                replace({
                    "../node_modules/three/" : "../../three/"
                })
            ],
            
            format: 'es',
            name: 'three',
            exports: 'named',
            sourcemap: true
          });
          build_ES( done );
    }).catch(
        (err)=>{console.error(err);}
    );
};

const build_ES = function( done ){
   
    rollup.rollup({
        input : 'src/Domevents.es.js',
        external: ['../node_modules/three/build/three.module.js', '../../node_modules/three/build/three.module.js'],
        
        plugins:[
            
            resolve(),
            
            buble({
				transforms: transforms
            })
        ]
    }).then(( bundle ) => { 
        bundle.write({
            file: './dist/domevents.es.js',
            plugins:[
                
                replace({
                    "../node_modules/three/" : "../../three/"
                })
            ],
            
            format: 'es',
            name: 'three',
            exports: 'named',
            sourcemap: true
          });
          build_extDomeventsES( done );
    }).catch(
        (err)=>{console.error(err);}
    );
};


module.exports = function( done ){
    async.series([
        build_ES,
        build_Pack
    ], function( err, data ){
        done();
    });
};