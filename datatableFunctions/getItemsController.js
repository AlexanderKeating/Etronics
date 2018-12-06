/**This is the javascript used to get the items for a persons account*/
var itemsModel = require('../app/models/getItems');

exports.getItems = function (req, res) {

    
    var searchStr = req.body.search.value;
    if(req.body.search.value)
    {
            var regex = new RegExp(req.body.search.value, "i")
            searchStr = { $or: [{'productName':regex },{'Description': regex},{'seller': regex}] };
    }
    else
    {
         searchStr={};
    }

    var recordsTotal = 0;
    var recordsFiltered=0;
    
    itemsModel.count({}, function(err, c) {
        recordsTotal=c;
        console.log(c);
        itemsModel.count(searchStr, function(err, c) {
            recordsFiltered=c;
            console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
                itemsModel.find(searchStr, 'productName itemPrice Quantity Description seller', {'skip': Number( req.body.start), 'limit': Number(req.body.length) }, function (err, results) { // get all items in the items collection
                    if (err) {
                        console.log('error while getting results'+err);
                        return;
                    }
            
                    var data = JSON.stringify({
                        "draw": req.body.draw,
                        "recordsFiltered": recordsFiltered,
                        "recordsTotal": recordsTotal,
                        "data": results
                    });
                    console.log('results' + data);
                    res.send(data);
                });
        
          });
   });
   
     


    


};