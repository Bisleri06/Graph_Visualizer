var input_string="";    //for input graph string
var main_graph={};      //stores the graph object
var graph_changed=false;//conditional render to save resources
var dragging=-1;        //node is being dragged
var edge_from=-1;       //edge creation


//ui and setup part
function setup() {
  createCanvas(screen.width-10,1500);
  
  let inp = createInput('');
  inp.position(0, 25);
  inp.size(screen.width-20);
  inp.input(handleInput);
  
  button = createButton('Create Graph');
  button.position(0, 0);
  button.mousePressed(createGraph);
  
  button = createButton('Clear Graph');
  button.position(100, 0);
  button.mousePressed(clearGraph);
  
  textSize(12);
  fill('white');
  text('Press V key to create node at position pointed by mouse', 0, 75);
  text('Press V key to delete node at position of mouse', 0, 100);
  text('Press E key while hovering on one node and E again on target node to draw an edge between them', 0, 125);
  text('Press D key while hovering on one node and D again on target node to delete an edge between them', 0, 150);
  text('Drag the nodes around and restructure the graph to view all edges better', 0, 175);
}
/////////////////////


//initial event handling part
function clearGraph(){
  main_graph={}
  graph_changed=true;
}

function handleInput(){
  input_string=this.value();
}
/////////////////////



//create graph from input
function createGraph(){
  
  input_array=input_string.split(" ");

  if(input_array.length<2)      //invalid input
    return;
  
  let vertices=Number(input_array[0]);
  let edges=Number(input_array[1]);
  
  let start_height=screen.height/4;     //exclude ui part
  let start_width=screen.width/3;
  
  for(let i=0;i<vertices;i++){        //create vertices in array
    
    if(start_width>screen.width)
    {
      start_height+=200;
      start_width=screen.width/3;
    }
    
    main_graph[i]={
      position:[start_width,start_height],
      connected:[]
    }
    
    start_width+=100;
  }
  
  
  for(let i=0;i<edges*2;i+=2)         //create edges
  {
    let e1=Number(input_array[2+i]);
    let e2=Number(input_array[2+i+1]);
    
    main_graph[e1].connected.push(e2);
    main_graph[e2].connected.push(e1);
  }
  
  console.log(main_graph);
  graph_changed=true;
}
/////////////////////



//only draw graph if it has changed
function draw()
{
  if(!graph_changed)    //optimization
  {
    return;
  }

  clear();
  
  textSize(12);
  fill('white');
  text('Press V key to create node at position pointed by mouse', 0, 75);
  text('Press V key to delete node at position of mouse', 0, 100);
  text('Press E key while hovering on one node and E again on target node to draw an edge between them', 0, 125);
  text('Press D key while hovering on one node and D again on target node to delete an edge between them', 0, 150);
  text('Drag the nodes around and restructure the graph to view all edges better', 0, 175);
  
  for(let i in main_graph){   //draw edges first so that nodes are more visible when they overwrite lines
    
    stroke('#CF6679');
    strokeWeight(2);
    for(let j of main_graph[i].connected)
    {
      
      if(j==dragging)         //when dragging a node, redraw the edges to have a moving effect
        main_graph[j].position=[mouseX,mouseY];
        
      line(main_graph[i].position[0],main_graph[i].position[1],main_graph[j].position[0],main_graph[j].position[1]);
    }
  }
    
  for(let i in main_graph){   //draw nodes
    
    if(i==dragging)           //if dragging around nodes
      main_graph[i].position=[mouseX,mouseY];
    
    noStroke();               //draw node
    fill('#3700B3');
    circle(main_graph[i].position[0],main_graph[i].position[1],50);
    fill('white');
    textSize(20);
    text(i, main_graph[i].position[0]-5,main_graph[i].position[1]+10);
  }
  
  if(dragging===-1)
    graph_changed=false;
}
/////////////////////


//handle key presses
function keyPressed(){
  if(keyCode===86)    //V for handling nodes
  {
    create_delete_nodes();
  }
  if(keyCode==69)    //E for creating edges
  {
    create_edges();    
  }
  if(keyCode==68)    //D for deleting edges
  {
    delete_edges();
  }
}
/////////////////////


//check if mouse pointer inside a node
function checkBounds(x1,y1,x2,y2,r){
    if(x1>=(x2-r) && x1<=(x2+r) && y1>=(y2-r) && y1<=(y2+r))
    {
        return true;
    }
    return false;
}
/////////////////////


//handle dragging a node around
function mouseClicked(){
  
  let x=mouseX;
  let y=mouseY;
  
  if(y<200)   //ignore ui region for drag and drop
    return;
  
  if(dragging!==-1){  //fix position of node being dragged
    main_graph[dragging].position=[mouseX,mouseY];
    graph_changed=true;
    dragging=-1;
    return;
  }
  
  for(let i in main_graph){ //drag a node
    if(checkBounds(x,y,main_graph[i].position[0],main_graph[i].position[1],25))
    {
      dragging=i;
      graph_changed=true;
      return;
    }
  }
}
/////////////////////


//create a new edge
function create_edges(){
  
  let x=mouseX;
  let y=mouseY;
  
  for(let i in main_graph){
    if(checkBounds(x,y,main_graph[i].position[0],main_graph[i].position[1],25))
    {
      if(edge_from===-1)   //source edge
      {
        edge_from=i;
      }
      else{               //target edge and draw it
        main_graph[i].connected.push(edge_from);
        main_graph[edge_from].connected.push(i);
        edge_from=-1;
        graph_changed=true;
      }
      
      return;
    }
  }
  
  edge_from=-1;
}
/////////////////////


//delete an edge
function delete_edges(){
  
  let x=mouseX;
  let y=mouseY;
  
  for(let i in main_graph){
    if(checkBounds(x,y,main_graph[i].position[0],main_graph[i].position[1],25))
    {
      if(edge_from===-1)  //select edge
      {
        edge_from=i;
        return;
      }
      
      //delete an edge
      main_graph[i].connected=main_graph[i].connected.filter((elem)=>{return elem!=edge_from});
      main_graph[edge_from].connected=main_graph[edge_from].connected.filter((elem)=>{return elem!=i});
      
      graph_changed=true;
      break;
    }
  }
  
  edge_from=-1;
}
/////////////////////


//handle creating deleting nodes
function create_delete_nodes() {

  let x=mouseX;
  let y=mouseY;
  
  if(y<200)   //ignore ui part
    return;
    
  let count=0;
  
  for(let i in main_graph){   //delete a node part
    if(checkBounds(x,y,main_graph[i].position[0],main_graph[i].position[1],25))
    {
          //delete node
          delete main_graph[i];
          
          //delete all edges of the node
          let exclude=i;
          for(let x in main_graph){
            main_graph[x].connected=main_graph[x].connected.filter((elem)=>{return elem!=exclude});
          }
      
          //return after deleting
          graph_changed=true;
          return;
    }
    
    if(Number(i)>count)
      count=Number(i);
  }
  
  //create new edge with unused index value
  main_graph[count+1]={
      position:[x,y],
      connected:[]
  }

  graph_changed=true;
  return;
}
/////////////////////