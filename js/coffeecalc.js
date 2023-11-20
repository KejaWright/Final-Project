$('#start-button').click(function(){
    $('#game').toggle();
    $('#start-button').toggle();
/////OBJECTS AND STUFF FOR THE GAME///////
///VERY BASIC SETUP///
const canvas = document.getElementById("game");
if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    //left box for orders
    ctx.fillStyle = "#946B34";
    ctx.fillRect(0, 50, 200, 500);
    //right box for ingredients
    ctx.fillStyle = "#583D1A";
    ctx.fillRect(800, 50, 200, 500);
    //top box for score and stuff
    ctx.fillStyle = "#FF9300";
    ctx.fillRect(0, 0, 1000, 50);
    //bottom box for blend types
    ctx.fillStyle = "#FF9300";
    ctx.fillRect(200, 450, 600, 100);
    
}

//Order display


////Ingredients Display




////Blend options menu Display



////Top menu bar
//






//////MATH AND STUFF FOR THE GAME//////
////Adding ingredients
})