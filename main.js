const { program } = require ('commander');
const fs = require ('node:fs');
const http = require ('http');
const xml = require("fast-xml-parser");

program
    .option('-h, --host <address>')
    .option('-p, --port <number>')
    .option('-i, --input <path>')

program.parse();
const options = program.opts();

if (!options.input) {
    console.log('Please, specify input file');
    return;
}

if (!options.port) {
    console.log('Please, specify port');
    return;
}

if (!options.host) {
    console.log('Please, specify host');
    return;
}
if (!fs.existsSync(options.input)){
    console.log('Cannot find input file');
    return;
}

const requestListener = function (req, res) {
    fs.readFile(options.input, 'utf8', (err, data) => {
        let parsedData = JSON.parse(data);
        const builder = new xml.XMLBuilder({format : true});
        const xmlStr = builder.build(parsedData);
        const parser = new xml.XMLParser();
        const obj = parser.parse(xmlStr);
        const array = [];
        for (const item in obj) {
            array.push(obj[item].rate);
        }
        let max_rate = Math.max(...array);
        const objToSave = {data: {max_rate: max_rate}};
        const newXML = builder.build(objToSave);
        fs.writeFile("test.xml", newXML);

    });
}


const server = http.createServer(requestListener);
server.listen(options.port, options.host, () => {
    console.log(`Server is running on ${options.host}:${options.port}`);
});

