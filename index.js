var {Parser} = require("simple-text-parser");
var parser = new Parser();


// Define a rule using a regular expression
parser.addRule(/\#[\S]+/gi, function (tag) {
    // Return the tag minus the `#` and surrond with html tags
    return `<span class="tag">${tag.substr(1)}</span>`;
  });

  



// Parser

/*
  image: [ imagename.type, image caption ] --> /articleImgs/id-imagename.type
  header: { header content } --> <h2>header content</h2>
  */

 parser.addRule(/\[(.*?)\]/, function(tag) {
    var data = tag.replace(/[[\]]/g,'').split(',');
    return "<br><figure><img class='img-responsive' src='/articleImg/" 
    + data[0].trim() + "'><figcaption>" 
    + data[1].trim() + "</figcaption></figure><br>";
  });
  parser.addRule(/\{(.*?)\}/, function(tag) {
    console.log("hello");
    return "<h2>" + tag.replace(/[{}]/g,'').trim() + "</h2>";
  });
  function parseContent(id, content) {
  // takes [ imagename.type  ] and turns it into [id-imagename.type]
  var text = content.trim().replace(/\[\s*(.*?)\s*]/g, '[$1]').replace(/\[/g,"[" + id + "-");
  var html = parser.render(text);
  return html;
}


console.log(parser.render("{ test.jpg }"));
