'use strict';
// Create Content
module.exports.createContent = async event => {
    if(!global.contentList){
        global.contentList = [];
       console.log(`contentList set to empty ${global.contentList}`)
    }
    var body = event.body;
    var parseBody = JSON.parse(body);
    global.contentList.push(parseBody);
    console.log(`pushed the value to the contentList ${JSON.stringify(global.contentList)}`)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Added',
        
      },
 
    ),
  };

  
};
// Content List
module.exports.contentList = async event => {
 console.log(`contentlist = ${JSON.stringify(global.contentList)}`)
    return {
        statusCode: 200,
        body: JSON.stringify(
            global.contentList
        ),
    };
};
// Content Delete
module.exports.contentDelete = async event => {
  var id = event.pathParameters.id;
  var deleted = false;
  var tempArray = [];
  for(var item of global.contentList){
    if(item.id!=id){
      tempArray.push(item)
    }
    else{
      deleted = true;
    }
  }
  global.contentList = tempArray;
     return {
         statusCode: 200,
         body: JSON.stringify(
             {message : `delete status = ${deleted}`}
         ),
     };
 };
 // Content Update
 module.exports.contentUpdate = async event => {
    this.contentDelete(event);
    this.createContent(event);
     return {
         statusCode: 200,
         body: JSON.stringify(
             {message: "Content Updated"}
         ),
     };
 };