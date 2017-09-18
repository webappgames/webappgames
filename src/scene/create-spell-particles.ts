import * as BABYLON from 'babylonjs';


export default function createSpellParticles(fountainMesh:BABYLON.AbstractMesh,scene:BABYLON.Scene):BABYLON.ParticleSystem{


    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 1000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("/assets/particles/flare.png", scene);

    // Where the particles come from
    particleSystem.emitter = fountainMesh; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0, 0.5, 1, 1.0);
    particleSystem.color2 = new BABYLON.Color4(.5, 0, 1, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 2;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 1;
    particleSystem.maxLifeTime = 3;

    // Emission rate
    particleSystem.emitRate = 100;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    //particleSystem.gravity = new BABYLON.Vector3(0, -100, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(1, 1, 1);
    particleSystem.direction2 = new BABYLON.Vector3(-1, -1, -1);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 0;
    particleSystem.maxEmitPower = 1;
    particleSystem.updateSpeed = 0.005;

    // Start the particle system
    particleSystem.start();

    return particleSystem;

}