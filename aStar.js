// Name: Noorah Ahmed Alamri
// ID: 1506118
// EAR
// FlowFree solution using A* algorithm
//start node
var _s =
    [
        { color: "G", I: 2, J: 2 },
        { color: "Y", I: 0, J: 3 },        
        { color: "B", I: 0, J: 2 },        
        { color: "R", I: 0, J: 0 },
        
    ];

//goal colors
var _g =
    [
        { color: "G", I: 3, J: 3 },
        { color: "Y", I: 1, J: 2 },
        { color: "B", I: 2, J: 1 },
        { color: "R", I: 3, J: 2 }
    ];

//decleration the main arrays and start and end nodes.
var cols = 4;
var rows = 4;
var grid = new Array(4);
var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];

// time complexity for the heuristic
var time1 = 0;
var time2 = 0;




// for initiallizing the heauristic and cost  
function Spot(i, j) {
    //this.grid = grid;

    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.colour = "_";
    this.neighbors = [];
    this.previous = null;
    this.wall = false;




    this.addNeighbors = function (grid) {
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
    }
}





function setup(Intmat) {
    grid = new Array(4);

    // 2D array
    for (var i = 0; i < 4; i++) {
        grid[i] = new Array(4);
    }

    // new object for assigning the cost and heuristic for each node node. 
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);


        }
    }

    // connecting the neighbors
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);

        }
    }


    //assigning the colors in the node
    for (var f = 0; f < 4; f++) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {

                if (_s[f].I == i && _s[f].J == j) {
                    grid[i][j].original = true;
                    grid[i][j].colour = _s[f].color;


                }

                if (_g[f].I == i && _g[f].J == j) {
                    grid[i][j].original = true;
                    grid[i][j].colour = _g[f].color;



                }
            }
        }
    }

    // determining wether the spot has a colour or not, and making it a spot.


    var red = "R";
    var blue = "B";
    var yellow = "Y";
    var green = "G";



    if (Intmat == 0) {

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {


                document.write(this.grid[i][j].colour + " ");
            }
            document.write("<p></p>");
        }
    }


    // the start node color index. 
    var mat = Intmat;

    // while (mat < 4) {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {

            if (grid[i][j].colour == red) {
                grid[i][j].wall = true;
            }

            if (grid[i][j].colour == blue) {
                grid[i][j].wall = true;
            }

            if (grid[i][j].colour == yellow) {
                grid[i][j].wall = true;
            }

            if (grid[i][j].colour == green) {
                grid[i][j].wall = true;
            }
        }
    }

    start = startNode(mat);
    openSet.push(start);


    // finding the goal node from the start node color.  endNode


    var endGoalNode = -1;
    for (var i = 0; i < 4; i++) {
        if (_s[mat].color == _g[i].color) {
            endGoalNode = i;
            //alert(_s[mat].color);
        }
    }

    end = endNode(endGoalNode);





    AStar(start, end);











    console.log(grid);// showing the 2D matrix as graph matrix

}



// returning a start node color in the grid. 
function startNode(stNode) {

    // i and j for the start node color.
    var i_Start_Index = this._s[stNode].I;
    var j_Start_Index = this._s[stNode].J;

    var start_Node = grid[i_Start_Index][j_Start_Index];

    return start_Node;
}

//return the end node in the grid index.
function endNode(enNode) {

    // i and j for the goal node color.
    var i_Goal_Index = this._g[enNode].I;
    var j_Goal_Index = this._g[enNode].J;

    end_Node = grid[i_Goal_Index][j_Goal_Index];

    return end_Node;
}




//----------------------------------------------
//            A* Algorithm
//----------------------------------------------
function AStar(start, end) {


    while (openSet.length > 0) {


        //determining the goal index
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {

            if (openSet[i].f < openSet[winner].f) {
                winner = i;

            }
        }

        var current = openSet[winner];


        // find the path by backtracking.
        if (current === end) {


            //empty list is path
            var temp = current;
            path.push(temp);// starting with the last node we achieve

            //adding the optimal solution nodes to an array.
            while (temp.previous) {

                if (!temp.previous.wall) {
                    temp.previous.colour = end.colour;

                }

                path.push(temp.previous); // connecting with the node  before it
                temp = temp.previous; // getting the node before it 


            }

            console.log("Done!!");


        }




        removeFromArray(openSet, current);

        closedSet.push(current);



        // making the path of the color by the neighbors (array)
        var neiborsArr = current.neighbors;
        var neighbor;
        for (var i = 0; i < neiborsArr.length; i++) {
            neighbor = neiborsArr[i];

            if (neighbor === end) {
                openSet.push(end);

            }

            // we don't use the path that already been evaluated or 
            if (!closedSet.includes(neighbor)) {
                if (!neighbor.wall) {
                    var tempG = current.g + 1;

                    // if it's in the openSet then we must compare between the g(x).
                    if (openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;

                        }
                    } else {
                        neighbor.g = tempG;
                        openSet.push(neighbor);
                    }

                    // calculating the time complexity
                    time1 = performance.now();
                    // -----------------------------------
                    // calculating heuristic h(x)
                    neighbor.h = heuristic(grid);

                    // how long I have to get there + how long it will be to get to the goal node. f(x)
                    neighbor.f = neighbor.g + neighbor.h;
                    time2 = performance.now();

                }

                neighbor.previous = current;
            }




        }



    }




}



// heuristic function ( estimating the remaining point between points a and b). 
function heuristic(grid) {



    var counter = 0;

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {

            if (grid[i][j].colour == "_ ") {
                counter++;

            }
        }

    }

    return counter;
}




// remove node from array because in java script there's no .remove function 
function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }

    }
    //document.write("remove from array");
    //document.write("<p></p>");


}




function main() {


    var redArr = [];
    var red = 0;
    var greenArr = [];
    var green = 0;
    var yellowArr = [];
    var yellow = 0;
    var blueArr = [];
    var blue = 0;


    document.write("The Initial nodes: ");
    document.write("<p></p>");





    for (var t = 0; t < cols; t++) {
        setup(t);
        // printing the nodes before connecting 
        console.log(time2 - time1);




        //counter 1 "red"
        if (_s[t].color == "R") {
            //document.write("------------Red Path----------");
            //document.write("<p></p>");
            for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    if (grid[i][j].colour == "R") {
                        red++;


                    }

                }
            }
            redArr.length = red;


            var tempr = red - 1;
            //red 
            while (tempr >= 0) {
                for (var i = 0; i < cols; i++) {
                    for (var j = 0; j < rows; j++) {
                        if (grid[i][j].colour == "R") {
                            redArr[tempr] = grid[i][j];

                            tempr--;
                        }

                    }
                }
            }
            /*for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    document.write(grid[i][j].colour + " ");
                }
                document.write("<p></p>");
            }*/


        }




        //counter 2 "yellow"
        else if (_s[t].color == "Y") {
            //document.write("------------Yellow Path----------");
            //document.write("<p></p>");

            for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    if (grid[i][j].colour == "Y") {
                        yellow++;


                    }

                }
            }
            yellowArr.length = yellow;
            var tempy = yellow - 1;
            //yellow
            while (tempy >= 0) {
                for (var i = 0; i < cols; i++) {
                    for (var j = 0; j < rows; j++) {
                        if (grid[i][j].colour == "Y") {
                            yellowArr[tempy] = grid[i][j];
                            tempy--;
                        }

                    }
                }
            }
            /*for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    document.write(grid[i][j].colour + " ");
                }
                document.write("<p></p>");
            }*/

        }





        //counter 3 "blue"
        else if (_s[t].color == "B") {
            //document.write("------------Blue Path----------");
            //document.write("<p></p>");
            for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    if (grid[i][j].colour == "B") {
                        blue++;


                    }

                }
            }
            blueArr.length = blue;
            var temb = blue - 1;
            //blue
            while (temb >= 0) {
                for (var i = 0; i < cols; i++) {
                    for (var j = 0; j < rows; j++) {
                        if (grid[i][j].colour == "B") {
                            blueArr[temb] = grid[i][j];
                            temb--;
                        }

                    }
                }
            }
            /*for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    document.write(grid[i][j].colour + " ");
                }
                document.write("<p></p>");
            }*/
        }





        //counter 4 "green"
        else if (_s[t].color == "G") {
            
            for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    if (grid[i][j].colour == "G") {
                        green++;


                    }

                }
            }
            greenArr.length = green;
            var tempg = green - 1;
            //green
            while (tempg >= 0) {
                for (var i = 0; i < cols; i++) {
                    for (var j = 0; j < rows; j++) {
                        if (grid[i][j].colour == "G") {
                            greenArr[tempg] = grid[i][j];
                            tempg--;
                        }

                    }
                }
            }
            //for (var i = 0; i < cols; i++) {
              //  for (var j = 0; j < rows; j++) {
                //    document.write(grid[i][j].colour + " ");
               // }
                //document.write("<p></p>");
            //}
        }



    }
    // connecting the graphs together.








    document.write("by Applying the A* Algorithm for all graph: ");
    document.write("<p></p>");
    






    //red 
    for (var p = 0; p < redArr.length; p++) {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].i == redArr[p].i && grid[i][j].j == redArr[p].j) {
                    grid[i][j].colour = redArr[p].colour;

                }

            }
        }
    }
    document.write("------------Red Path----------");
    document.write("<p></p>");
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            document.write(grid[i][j].colour + " ");
        }
        document.write("<p></p>");
    }
    document.write("<p>==========================</p>");
    


    //blue 
    for (var p = 0; p < blueArr.length; p++) {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].i == blueArr[p].i && grid[i][j].j == blueArr[p].j) {
                    grid[i][j] = blueArr[p];

                }

            }
        }
    }

    document.write("------------Blue Path----------");
    document.write("<p></p>");
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            document.write(grid[i][j].colour + " ");
        }
        document.write("<p></p>");
    }
    document.write("<p>==========================</p>");


    //yellow
    for (var p = 0; p < yellowArr.length; p++) {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].i == yellowArr[p].i && grid[i][j].j == yellowArr[p].j) {
                    grid[i][j] = yellowArr[p];

                }

            }
        }
    }
    document.write("------------Yellow Path----------");
    document.write("<p></p>");
    
    // printing final
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            document.write(grid[i][j].colour + " ");
        }
        document.write("<p></p>");
    }

    document.write("<p>==========================</p>");
    

    //green 
    for (var p = 0; p < greenArr.length; p++) {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                if (grid[i][j].i == greenArr[p].i && grid[i][j].j == greenArr[p].j) {
                    grid[i][j] = greenArr[p];

                }

            }
        }
    }
    document.write("------------Green Path----------");
    document.write("<p></p>");

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            document.write(grid[i][j].colour + " ");
        }
        document.write("<p></p>");
    }
    document.write("<p>==========================</p>");

    
}

