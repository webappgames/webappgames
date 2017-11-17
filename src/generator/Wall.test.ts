import Wall from './Wall';

const wall1 = new Wall(
    {x: 0,y: 0,z: 0},
    {x: 0,y: 0,z: 0}
);

const wall2 = new Wall(
    {x: 1,y: 1,z: 1},
    {x: 1,y: 1,z: 1}
);

const wall3 = new Wall(
    {x: 2,y: 1,z: 1},
    {x: 3,y: 1,z: 1}
);

const wall4 = new Wall(
    {x: 4,y: 1,z: 1},
    {x: 5,y: 1,z: 1}
);

it('diagonal walls are not joinable ', () => {
    expect(wall1.isJoinable(wall2)).toEqual(false);
    expect(wall1.isJoinable(wall3)).toEqual(false);
    expect(wall1.isJoinable(wall4)).toEqual(false);
});

it('near walls are joinable', () => {
    expect(wall2.isJoinable(wall3)).toEqual(true);
    expect(wall3.isJoinable(wall4)).toEqual(true);
});

it('far walls are not joinable', () => {
    expect(wall2.isJoinable(wall4)).toEqual(false);

});

it('joining 3 walls in row and 1 diagonal will result in 2 joined walls', () => {
    expect(Wall.joinWalls([wall1,wall2,wall3,wall4]).length).toEqual(2);
});

const wall2_ = new Wall(
    {x: 1,y: 2,z: 1},
    {x: 1,y: 2,z: 1}
);

const wall3_ = new Wall(
    {x: 2,y: 2,z: 1},
    {x: 3,y: 2,z: 1}
);

const wall4_ = new Wall(
    {x: 4,y: 2,z: 1},
    {x: 5,y: 2,z: 1}
);

it('joining 6 walls in block and 1 diagonal will result in 2 joined walls', () => {
    expect(Wall.joinWalls([wall1,wall2,wall3,wall4,wall2_,wall3_,wall4_]).length).toEqual(2);
});