import fromFloorStrings from './fromFloorStrings';

const FLOOR0 = `
+   +   +   +   +   +
                  
+   +   +   +   +   +
                  
+   +   +   +   +   +
                  
+   +   +   +   +   +
                  
+   +   +   +   +   +
                   
+   +   +   +   +   +

`;


const FLOOR1 = `
+---+---+---+---+---+
|   |   |   |   |   |
+---+---+   +---+---+
|   |   |   |   |   |
+---+---+   +---+---+
|   |   |   |   |   |
+---+---+   +---+---+
|   |   |   |   |   |
+---+---+   +---+---+
|   |   |   |   |   |
+---+---+---+---+---+
`;

/*const FLOOR2 = `
+   +   +   +   +---+
                    |
+   +   +   +   +---+
                  
+   +   +   +   + 
`;*/

const BUILDING1 = fromFloorStrings([
    FLOOR1,
    FLOOR0
]);

export { BUILDING1 };
