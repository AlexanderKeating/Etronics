/**This is the javascript used to get the items for a persons account*/

var itemsModel = require('../app/models/getItems');//require the model from getItems 

exports.getItemsAccount = function (req, res) {

    
    var searchStr = req.body.search.value;
    if(req.body.search.value)
    {
            var regex = new RegExp(req.body.search.value, "i")
            searchStr = { $or: [{'productName':regex },{'Description': regex},{'seller': regex}] }; //this is incase someone searches through datatables
    }
    else
    {
         searchStr={};
    }

    var recordsTotal = 0;
    var recordsFiltered=0;
    
    console.log(req.user.local.userName);
    var userNameSearch = req.user.local.userName
    itemsModel.count({}, function(err, c) {
        recordsTotal=c;
        console.log(c);
        itemsModel.count(searchStr, function(err, c) {
            recordsFiltered=c;
            console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
                itemsModel.find({seller: req.user.local.userName}, 'productName itemPrice Quantity Description seller', function (err, results) { // "Seller: req.user.local.userName" Will  only pull the records in a collection that have the username of the person logged in
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
                    res.send(data);
                });
        
          });
   });
   
     


    


};