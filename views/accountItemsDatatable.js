$(document).ready(function () {


    var table = $('#local_items').DataTable({
        "paging": true,
        "pageLength": 10,
        "processing": true,
        "serverSide": true,
        'ajax': {
            'type': 'POST',
            'url': '/itemsToAccountTable'
        },
        'columns':
            [
            { 'data': 'productName', 'name': 'productName'},
            { 'data': 'itemPrice', 'name': 'itemPrice' },
            { 'data': 'Quantity', 'name': 'Quantity' },
            { 'data': 'Description', 'name': 'Description' },
            { 'data': 'seller', 'name': 'seller' },           
            ],
        "columnDefs": [
            {
                "searchable": false,
                "orderable": true,
                "targets": 0
            }
        ]
    });

 });