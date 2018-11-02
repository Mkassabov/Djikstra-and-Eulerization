//creates a priority queue for vertex storage
function PriorityQueue () {
  this._nodes = [];

  this.enqueue = function (priority, key) {
    this._nodes.push({key: key, priority: priority });
    this.sort();
  };
  this.dequeue = function () {
    return this._nodes.shift().key;
  };
  this.sort = function () {
    this._nodes.sort(function (a, b) {
      return a.priority - b.priority;
    });
  };
  this.isEmpty = function () {
    return !this._nodes.length;
  };
}

//generates graph
function Graph(){
  var INFINITY = 1/0;
  this.vertices = {};

  //add vertices to graph
  this.addVertex = (name, edges) => {
    this.vertices[name] = edges;
  };

  //finds shortest path (Dijkstra's Algorithm)
  this.shortestPath = (start, finish) => {
    var nodes = new PriorityQueue(),
        distances = {},
        previous = {},
        path = [],
        smallest, vertex, neighbor, alt;

    for(vertex in this.vertices) {
      if(vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      }
      else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while(!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      if(smallest === finish) {
        path = [];

        while(previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }

        break;
      }

      if(!smallest || distances[smallest] === INFINITY){
        continue;
      }

      for(neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor];

        if(alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;

          nodes.enqueue(alt, neighbor);
        }
      }
    }

    return path;
  };
  
  this.getShortestPath = (start, finish) => {
    var output = this.shortestPath(start, finish);
    output.push(start);
    return output.reverse();
  }
  
  //gets total dist when given a path of vertices
  this.totalDist = (nodeArray) => {
    var distance = 0;
    
    for(var i = 0; i < nodeArray.length - 1; i++) {
      distance += this.vertices[nodeArray[i]][nodeArray[i + 1]];
    }
    
    return distance;
  }
}


//prints a table with all connections on the graph and their length
//returns an assoiative array with table data
function printAllConnections(graph) {
  let output = [];
  
  for(var vertex in graph.vertices) {
    output[vertex] = {};
    
    for(var connection in graph.vertices) {
      output[vertex][connection] = graph.totalDist(g.shortestPath(vertex, connection).concat([vertex]).reverse());
    }
  }
  
  console.table(output);
  return output;
}

//formats the output in printAllConnections from an assoiative array to an indexed array
function formatGraph(allConections) {
  var output = [];
  
  var allConectionsNew = Object.keys(allConections).map(function (k) { return allConections[k];});
  for(var i = 0; i < Object.keys(allConections).length; i++) {
    var nums = Object.keys(allConectionsNew[i]).map(function (k) { return allConectionsNew[i][k];});
    var slicePoint = nums.findIndex(function (e) {return e == 0;});
    // nums = nums.slice(slicePoint + 1);
    output.push(nums);
    // output = output.concat(nums);
  }
  
  //console.log(output);
  return output;
}

//find shortest perfect match
function shortestPerfectMatch(allConnections, maxSteps = 10000) {
  
  // if((Object.keys(allConnections).length % 2) == 1) {
    // throw new Error("graph has odd number of vertices");
  // }
  
  var shortestFoundLength = Number.MAX_SAFE_INTEGER;
  var shortestFoundMatch = {};
  var MAX_STEPS = maxSteps;
  var steps = 0;
  
  function testPerfectMatch(used){
    var length=0;
    // console.log("Testing");
    // console.log(used);
    for(var v in used){
      length += allConnections[v][used[v]];
    }
    length = length/2;
    if (length < shortestFoundLength) {
      shortestFoundLength = length;
        shortestFoundMatch = []; 
        for (w in used){
            shortestFoundMatch[w]=used[w];
          }
    }
    steps++;
    if (steps == MAX_STEPS) {
      throw new Error("Passed Max Steps");
    }
  }  
  
  function loopPerfectMatch(used){
    steps++;
    if (steps == MAX_STEPS) {
      throw new Error("Passed Max Steps");
    }
    // console.log("Recursion In");
    // console.log(used);
    var unused=[];
    var unusedLen=0;
    for(var v in allConnections){
      if (v in used) {
        // console.log("used" + v);
      } else {
        //unused.push(v);
        unused[v]=0;
        unusedLen++;
        // console.log("unused" + v);
      }
    }
    // console.log("unused");
    // console.log(unused);
    if (unusedLen == 0){
      testPerfectMatch(used);
    } else {
      var first=true;
      var firstIndex;
      for ( v in unused){
        // console.log(v);
        if (first) {
          firstIndex = v;
          first = false;
        } else {
          var newUsed=[];
          for (w in used){
            newUsed[w]=used[w];
          }           
          // console.log("USED");
          // console.log(used);
          // console.log("new Used");
          // console.log(newUsed);
          //newUsed.push(v);
          newUsed[v] = firstIndex;
          //newUsed.push(firstIndex);
          newUsed[firstIndex] = v;
          // console.log("new used after push");
          // console.log(newUsed);
          loopPerfectMatch(newUsed);
        }
      }
    }
  }
  
  loopPerfectMatch([]);
  console.log("Best Length " + shortestFoundLength);
  console.log(shortestFoundMatch);
  
  var answer = {};
  for (w in shortestFoundMatch){
    answer[w]=shortestFoundMatch[w];
  }
  
  console.table({'Best Length': {'Value' : shortestFoundLength}, 'Best Match': {'Value' : JSON.stringify(answer).replace(/['"]+/g, '').replace(/[,]+/g, ', ')}});
  
  return({'Best Length': {'Value' : shortestFoundLength}, 'Best Match': {'Value' : answer}});
}

var g = new Graph();

// Log test, with the addition of reversing the path and prepending the first node so it's more readable
// console.log(g.shortestPath('A', 'H').concat(['A']).reverse());