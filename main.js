const { program } = require ('commander');
const fs = require ('node:fs');
const http = require ('http');

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

}
const server = http.createServer(requestListener);
server.listen(options.port, options.host, () => {
    console.log(`Server is running on ${options.host}:${options.port}`);
});