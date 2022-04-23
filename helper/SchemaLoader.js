const fs = require('fs');
const path = require('path');

module.exports = function loadSchemas(){
    const schemaPath = path.join(__dirname, '..', 'schemas', '/');
    const schemasContent = getContent(schemaPath);
    return schemasContent;
}

function getContent(schemaPath){
    let schemasContent = '';
    const files = fs.readdirSync(schemaPath);
    if(Array.isArray(files) && files.length > 0){
        for(let i=0; i<files.length; i++){
            const file = schemaPath + `${files[i]}`;
            schemasContent += fs.readFileSync(file);
            schemasContent += '\n';
        }
    }
    return schemasContent;
}
