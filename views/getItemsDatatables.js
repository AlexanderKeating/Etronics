$(document).ready(function () {


    var table = $('#item_Table').DataTable({
        "paging": true,
        "pageLength": 10,
        "processing": true,
        "serverSide": true,
        "select":true,
        'ajax': {
            'type': 'POST',
            'url': '/itemsToTable'
        },
        "columnDefs": [
            {
                "searchable": false,
                "orderable": true,

                className: 'select-checkbox',
                targets: 0,
                
            }
        ],
        "select": {
            style: 'os',
            selector: 'td:first-child'

        },
        "order": [[ 1, 'asc' ]],
        'columns':
            [
            { 'data': null, defaultContent: ''},
            { 'data': 'productName', 'name': 'productName'},
            { 'data': 'itemPrice', 'name': 'itemPrice' },
            { 'data': 'Quantity', 'name': 'Quantity' },
            { 'data': 'Description', 'name': 'Description' },
            { 'data': 'seller', 'name': 'seller' },
            ],


    });

    $('#btnSelectedRows').on('click', function() {

        $.each(table.rows('.selected').nodes(), function(i, item) {
          var id = item.productName;
          var data = table.row(this).data();
            console.log("hi" + id);
          alert("Produt Id : " +
            id + " && product Status:  " + data[4]);
        });
      })


 });
