import * as BABYLON from 'babylonjs';
import AbstractBrick from '../world/classes/bricks/AbstractBrick';

export default interface IPickingInfo{
    handPosition:BABYLON.Vector3;
    pickedPoint:BABYLON.Vector3;
    pickedBrick:AbstractBrick|null
}