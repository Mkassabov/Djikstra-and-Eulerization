//full graph | problem 40
g.addVertex('A', {C:5, B:2, D:3});
g.addVertex('B', {C:1, D:2});
g.addVertex('C', {D:3, E:6});
g.addVertex('D', {E:4});
g.addVertex('E', {A:2});

var tempArray = printAllConnections(g);
shortestPerfectMatch(tempArray);