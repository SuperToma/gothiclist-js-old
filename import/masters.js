const fs = require('fs')
const XmlTagStream = require('xml-tag-stream')
const through2 = require('through2')
const xmlParser = require('xml2js').Parser()

fs.createReadStream('./import/discogs_20170101_masters.xml')
    .pipe(new XmlTagStream('master'))
    .pipe(through2.obj((tag, enc, cb) => xmlParser.parseString(tag, cb)))
    .on('data', function (data) {
console.log(data.master.genres[0].genre.indexOf('Electronic'))
        if(data.master.genres[0].genre.indexOf('Electronic') !== -1) {
            /*db.Masters.find({
                where: {
                    id: userDeviceId
                }
            }).then(function(Masters) {
                if (!Masters) {
                    return 'not find';
                }
            });*/
            console.log('OK !')
        }
    })
    .on('end', console.log.bind(console, '-\n', 'Import Masters ended'))