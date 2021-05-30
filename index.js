#!/usr/bin/env node

var {Parser} = require("simple-text-parser");

var parser = new Parser();
const fs = require('fs')
var dir = __dirname;
const { exec } = require("child_process");

var myArgs = process.argv.slice(2).join(' ');

if (myArgs=='parse')  {
  //console.log('# Parsing all files in current directory');
  var parsePath = __dirname + '/parse.sh';
  exec(parsePath, (error, data, getter) => {
    if(error){
      console.log("error",error.message);
      return;
    }
    if(getter){
      console.log("data",data);
      return;
    }
    console.log("",data);
  
  });

}
  
else {




try {
  var fdata = fs.readFileSync(myArgs, 'utf8')
  //console.log(data)
} catch (err) {
  console.error(err)
}

// Define a rule using a regular expression
parser.addRule(/\#[\S]+/gi, function (tag) {
    // Return the tag minus the `#` and surrond with html tags
    return `<span class="tag">${tag.substr(1)}</span>`;
  });


console.log(`{`);

// Parser

/*
[id='ID']
= H1
*/

// ID
parser.addRule(/\[id\=\'(.*)\'\]/, function(str, ID) {
  console.log(`"ID":"${ID}", `);
});


// H1 at top of file
  parser.addRule(/^\=[\s]+(.*)/, function(str, H1) {
    console.log(`"heading":"${H1}", `);
  });

// H1 after newline
parser.addRule(/\n\=[\s]+(.*)/, function(str, H1) {
  console.log(`"heading":"${H1}", `);
});


// Abstract line after [role="_abstract"]
parser.addRule(/_abstract(.*)\n(.*)/, function(str,dummy, abstract) {
  console.log(`"abstract":"${abstract}", `);
});


// write filename 
console.log(`"filename":"${myArgs}",`);

parser.render(fdata);

console.log(`"dummy":0}`);

}