import fromFloorStrings from './fromFloorStrings';

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
|------------
|            
|   +   +   +
|            
|   +        
|            
-----        
`;


const FLOOR1c = `
#############
#############
#############
####         
####         
####         
####           
`;









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
    FLOOR1c
    //FLOOR0
]);

console.log(BUILDING1);

export { BUILDING1 };

//█
