import * as BABYLON from 'babylonjs';
import AbstractGravity from './AbstractGravity';

export default class Antigravity extends AbstractGravity{
    modifyGravity(normalGravity:BABYLON.Vector3):BABYLON.Vector3{
        return normalGravity.scale(-1);
    }
}