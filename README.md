# Graph Visualizer

<h3>Program to visualize graphs</h3>

<br/>

While solving DSA questions or designing logic for a problem, we often come across problems where we encounter a graph and we have to draw it with pen paper or use very sophisticated softwares to visualize the graph we have to work on.<br/>
This visualizer has basic controls and does the job in a very simple way.<br/>
It also takes graph input in typical coding competition format.<br/>


<h3>Controls</h3>

Press V key to create node at position pointed by mouse<br/>
Press V key to delete node at position of mouse<br/>
Press E key while hovering on one node and E again on target node to draw an edge between them<br/>
Press D key while hovering on one node and D again on target node to delete an edge between them<br/>
Drag the nodes around and restructure the graph to view all edges better<br/>

<h3>Create Graph</h3>
In case you have a text representation of a graph you can copy it into the text field and click create graph.<br/>
<h5>Format:</h5>
The first line contains V and E the number and vertices and number of edges respectively.<br/>
Next E lines contain two numbers denoting the nodes which are connected by a specific edge.<br/>



<h3>Example</h3>

We will create the following graph:

![graph](https://user-images.githubusercontent.com/89184620/182335776-7a1f5b24-a2e4-4ab6-a3c7-d76fd020d75f.png)

It has the following representation in text:
```
5 7
0 1
1 2
2 3
3 4
4 0
4 1
3 1
```

We get a Linked list like representation but after selecting and arranging the edges around we can get the exact same graph as follows:

![Capture](https://user-images.githubusercontent.com/89184620/182335585-b4003e29-eefc-44f6-a733-7303eb3d3b47.PNG)


Then we can delete and create both edges and vertices,
If we delete edge 4 and create a vertex between 0 and 3, We get:

![Capture2](https://user-images.githubusercontent.com/89184620/182335544-8cad72d7-ca68-4321-a1ef-0d4ae88f2839.PNG)

Star the repo if you find it useful!
