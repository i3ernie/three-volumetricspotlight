/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const gulp = require('gulp');


const build_vslAMD = require("./build/build_amd");
const build_domeventsES = require("./build/build_es");

var pkg = require('./package.json');


gulp.task('init', ( done ) => {
    
    done();
    
});

gulp.task("build", ( done ) => {
    "use strict";
    build_vslAMD( ()=>{
        
            done();
       
    });
});

gulp.task("buildAMD", build_vslAMD );

gulp.task("buildES", build_domeventsES );

gulp.task('default', gulp.series('init', 'buildAMD') );