import * as BABYLON from 'babylonjs';
import AbstractGravity from './AbstractGravity';

export default class Nogravity extends AbstractGravity{
    modifyGravity(normalGravity:BABYLON.Vector3):BABYLON.Vector3{
        return BABYLON.Vector3.Zero();
    }
}