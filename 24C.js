//full graph | problem 24C
g.addVertex('A', {B:3, I:8, H:2});
g.addVertex('B', {A:3, C:4, I:4});
g.addVertex('C', {B:4, I:1, D:6});
g.addVertex('D', {C:6, J:5, E:5});
g.addVertex('E', {D:5, J:9, F:3});
g.addVertex('F', {E:3, J:6, G:4});
g.addVertex('G', {F:4, J:1, H:9});
g.addVertex('H', {G:9, I:6, A:2});
g.addVertex('I', {H:6, A:8, B:4, C:1, J:2});
g.addVertex('J', {I:2, D:5, E:9, F:6, G:1});

var tempArray = printAllConnections(g);
shortestPerfectMatch(tempArray);