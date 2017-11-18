import fromFloorStrings from '../src/classes/Building/fromFloorStrings';

const FLOOR0 = `
+   +   +   +   +   +
                  
+   +   +   +   +   +
                  
+   +   +   +   +   +
                  
+   +   +   +   +   +
                  
+   +   +   +   +   +
                   
+   +   +   +   +   +

`;
FLOOR0;


const FLOOR1 = `
+----        
|::::        
|:::+        
|::::        
|:::+        
|::::        
|:::+:::+:::+
|::::::::::::
+:::+:::+:::+
|::::::::::::
|:::+:::+:::+
|::::        
|:::+        
|::::        
+----        
`;


function createPlateString(floorString: string) {
    let deskString = '';
    for (let i = 0; i < floorString.length; i++) {
        if (floorString[i] === ' ') {
            deskString += floorString[i];
        } else if (floorString[i] === '\n') {
            deskString += floorString[i];
        } else {
            deskString += '#';
        }
    }
    return deskString;
}


const FLOOR1c = createPlateString(FLOOR1);


/*const FLOOR1 = `
--------|---+---+---+
|:::|   |
+---+   |   +---+---+
            |   |   |
            +---+---|
            |   |   |
+---+---+   +--- ---+
|::: :::|   |   |   |
+   +   +   +---+---+
|::: :::|
+---+---+   +---+---+
            |   |   |
            +---+---+
            |   |   |
            +---+---+
            |   |   |
            +   +   +
`;*/

/*const FLOOR2 = `
+   +   +   +   +---+
                    |
+   +   +   +   +---+

+   +   +   +   +
`;*/

const BUILDING1 = fromFloorStrings([
    FLOOR1c,
    FLOOR1,
    FLOOR1c,
    FLOOR1,
    FLOOR1c,
    /*FLOOR1,
    FLOOR1c,
    FLOOR1,
    FLOOR1c*/
    //FLOOR0
]);

console.log(BUILDING1);

export {BUILDING1};

//█
