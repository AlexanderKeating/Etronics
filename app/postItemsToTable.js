$(document).ready(function () {
    var t = $('#items_table').DataTable({
        "paging": true,
        "pageLength": 10,
        "processing": true,
        "serverSide": true,
        'ajax': {
            'type': 'POST',
            'url': '/itemsToTable'
        },
        'columns':
            [
            { 'data': '_id', "defaultContent": "", 'name': '_id' },
            { 'data': 'productName', "defaultContent": "", 'name': 'productName' },

            ],
        "columnDefs": [
            {
                "searchable": false,
                "orderable": false,
                "targets": 0
            }
        ]
    });

 });