var fs = require('fs');
var csv = require('fast-csv');
var file;
var stream;
var outputFileName;
var writable;

function create(req){
    file = req.files.file;
    file.mv(__dirname + '/public/files/' + file.name);
    setTimeout(function(){
        stream = fs.createReadStream(__dirname + '/public/files/' + file.name);
        outputFileName = file.name.split('.');
        writable = fs.createWriteStream(__dirname + '/public/files/' + outputFileName[0] + '.yaml');
    }, 3000);
}

module.exports = function(app){
    // display page template from views
    app.get('/', function(req, res){
        res.render('index');
    });

    app.post('/', function(req, res, next){
        create(req);
        setTimeout(function(){
            next();
        }, 3000);
    }, [function(req, res, next){
        csv
        .fromStream(stream, {headers : true})
        .on("data", function(data){
            if(data['SKU'] === undefined){
                writable.write("    - sku: " + data.sku + "\n")
            } else {
                writable.write("    - sku: " + data['SKU'] + "\n")
            }
                writable.write("      price: $" + Number(data['price']).toFixed(2) + "\n")
            writable.write("      options:\n")
            writable.write("        - name: Brand\n")
            if(data['Brand'] === undefined){
                writable.write("          value: " + data.brand + "\n")
            } else {
                writable.write("          value: " + data['Brand'] + "\n")
            }
            writable.write("        - name: Model\n")
            if(data['Model'] === undefined){
                writable.write("          value: " + data.model + "\n")
            } else {
                writable.write("          value: " + data['Model'] + "\n")
            }
            writable.write("        - name: Gender\n")
            if(data['Gender'] === undefined){
                writable.write("          value: " + data.gender + "\n")
            } else {
                writable.write("          value: " + data['Gender'] + "\n")
            }
            writable.write("        - name: Sizes\n")
            if(data['Size'] === undefined){
                if(data.size === 'XS'){
                    writable.write("          value: Extra Small (" + data.size + ")\n")
                } else if(data.size === 'XS/S') {
                    writable.write("          value: Extra Small/Small (" + data.size + ")\n")
                } else if(data.size === 'S') {
                    writable.write("          value: Small (" + data.size + ")\n")
                } else if(data.size === 'M') {
                    writable.write("          value: Medium (" + data.size + ")\n")
                } else if(data.size === 'M/L') {
                    writable.write("          value: Medium/Large (" + data.size + ")\n")
                } else if(data.size === 'L') {
                    writable.write("          value: Large (" + data.size + ")\n")
                } else if(data.size === 'XL') {
                    writable.write("          value: Extra Large (" + data.size + ")\n")
                } else if(data.size === '2XL') {
                    writable.write("          value: XXL (" + data.size + ")\n")
                } else if(data.size === '3XL') {
                    writable.write("          value: XXXL (" + data.size + ")\n")
                } else if(data.size === '4XL') {
                    writable.write("          value: XXXXL (" + data.size + ")\n")
                } else if(data.size === '5XL') {
                    writable.write("          value: XXXXXL (" + data.size + ")\n")
                } else {
                    writable.write("          value: " + data.size + "\n")
                }
            } else {
                if(data['Size'] === 'XS'){
                    writable.write("          value: Extra Small (" + data['Size'] + ")\n")
                } else if(data['Size'] === 'XS/S') {
                    writable.write("          value: Extra Small/Small (" + data['Size'] + ")\n")
                } else if(data['Size'] === 'S') {
                    writable.write("          value: Small (" + data['Size'] + ")\n")
                } else if(data['Size'] === 'M') {
                    writable.write("          value: Medium (" + data['Size'] + ")\n")
                } else if(data['Size'] === 'M/L') {
                    writable.write("          value: Medium/Large (" + data['Size'] + ")\n")
                } else if(data['Size'] === 'L') {
                    writable.write("          value: Large (" + data['Size'] + ")\n")
                } else if(data['Size'] === 'XL') {
                    writable.write("          value: Extra Large (" + data['Size'] + ")\n")
                } else if(data['Size'] === '2XL') {
                    writable.write("          value: XXL (" + data['Size'] + ")\n")
                } else if(data['Size'] === '3XL') {
                    writable.write("          value: XXXL (" + data['Size'] + ")\n")
                } else if(data['Size'] === '4XL') {
                    writable.write("          value: XXXXL (" + data['Size'] + ")\n")
                } else if(data['Size'] === '5XL') {
                    writable.write("          value: XXXXXL (" + data['Size'] + ")\n")
                } else {
                    writable.write("          value: " + data['Size'] + "\n")
                }
            }
            writable.write("        - name: Colors\n")
            if(data['Color'] === undefined){
                writable.write("          value: " + data.color + "\n")
            } else {
                writable.write("          value: " + data['Color'] + "\n")
            }
            writable.write("        - name: Print Placement\n")
            if(data['Print Placement'] === undefined && data['Print placement'] === undefined){
                writable.write("          value: " + data.printplacement + "\n")
            } else if (data['Print Placement']){
                writable.write("          value: " + data['Print Placement'] + "\n")
            } else {
                writable.write("          value: " + data['Print placement'] + "\n")
            }
        }).on("end", function(){
            console.log('Done');
        });
        setTimeout(function(){
            next();
        }, 3000);
    }, function(req, res, next){
        res.download(__dirname + '/public/files/' + outputFileName[0] + '.yaml');
    }])
}