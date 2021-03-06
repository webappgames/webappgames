import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';
//import AbstractBrick from '../../../world/classes/bricks/AbstractBrick';

export default class Plate extends AbstractSpellOnMeshes {

    public EFFECT_COLORS = {
        color1: '#fff400',
        color2: '#ff3b00'
    };

    get price():number{
        return 0;
    }


    /*todo acceptTargetMesh() {
     if(this.targetMesh.name === 'ground'){
     return false;
     }
     if (this.sharedStarage.firstPillarMesh) {


     return (
     Math.abs((this.sharedStarage.firstPillarMesh.position.y + this.sharedStarage.firstPillarMesh.scaling.y / 2)
     -
     (this.targetMesh.position.y + this.targetMesh.scaling.y / 2))<=0.5
     );


     }

     return true;
     }*/

    /*get message():string{
     if (this.sharedStarage.firstPillarMesh) {
     return('2/2');
     }else{
     return('1/2');
     }
     }*/


    public TARGET_COUNT = 2;

    finish() {
        super.finish();

        //!todo
        /*const pillar1 = this.targets[0].pickedBrick as AbstractBrick;
        const pillar2 = this.targets[1].pickedBrick as AbstractBrick;
        const point1 = pillar1.position;
        const point2 = pillar2.position;

        const middlePoint = point1.add(point2).scale(1 / 2);
        const pointDiff = point2.subtract(point1);
        const length = pointDiff.length();

        const rotation = Math.atan2(pointDiff.x, pointDiff.z);
        const width = Math.max(pillar1.size.z, pillar2.size.z, pillar1.size.x, pillar2.size.x);


        const boxMesh = BABYLON.Mesh.CreateBox("plate", 1, this.world.scene);
        boxMesh.position = middlePoint.add(new BABYLON.Vector3(0, pillar1.size.y / 2 + 1, 0));
        boxMesh.scaling = new BABYLON.Vector3(width, 1, length + 2);
        boxMesh.rotation = new BABYLON.Vector3(0, rotation, 0);
        boxMesh.material = this.world.materialFactory.getBabylonMaterial('stone-plain');


        boxMesh.physicsImpostor = new BABYLON.PhysicsImpostor(boxMesh, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: 10,
            restitution: 0.2
        }, this.world.scene);*/

    }
}