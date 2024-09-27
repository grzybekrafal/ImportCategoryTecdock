
$(document).ready(function() {
    sortableElements();
});


function sortableElements(){

$('.sortable').sortable({
    refreshPositions: true,
    opacity: 0.6,
    scroll: true,
    containment: 'parent',
    placeholder: 'placeholder',
    tolerance: 'pointer',
    items: '.sortable_handle'
  }).disableSelection().on( "sortstop", function( event, ui ) {
        var listElements = $(event.target).children();
        let listaItemToSave = []

        $(listElements).each(function( index ) {
            let item = new Object()
            item.id =  $(this).find('div').data('id');
            item.action_type= $(this).find('div').data('action');
            item.index  = index++;
            item.type = $(this).find('div').data('type');
            item.parent = $(this).find('div').data('parent');

            listaItemToSave.push(item);
        });

         $.ajax({
                type: 'POST',
                url: "/admin/special_operation/save_orders",
                data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  listaItemToSave: JSON.stringify(listaItemToSave)},
                success: function(result) {
                },
                error: function(returnval) {

                },
            })
  } );


 $('.sortableTable').sortable({
    refreshPositions: true,
    opacity: 0.6,
    scroll: true,
    containment: 'parent',
    placeholder: 'placeholder',
    tolerance: 'pointer',
   // handle: 'sortable_handle',
    filter: 'filtered'
  }).disableSelection().on( "sortstop", function( event, ui ) {

        var listElements = $(event.target).children();
        let listaItemToSave = []
        console.log(listElements)
        $(listElements).each(function( index ) {

            let item = new Object()
            item.id =  $(this).data('id');
            item.index  = index++;

            item.action_type= 'product';
            item.type = 'file';
            item.parent =  $(this).data('parent');

            listaItemToSave.push(item);
        });

        $.ajax({
            type: 'POST',
            url: "/admin/special_operation/save_orders",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  listaItemToSave: JSON.stringify(listaItemToSave)},
            success: function(result) {
            },
            error: function(returnval) {

            },
        })

  });

  $('.sortableTableCategory').sortable({
    refreshPositions: true,
    opacity: 0.6,
    scroll: true,
    containment: 'parent',
    placeholder: 'placeholder',
    tolerance: 'pointer',
    // handle: 'sortable_handle',
    //filter: 'filtered'
  }).disableSelection().on( "sortstop", function( event, ui ) {

        var listElements = $(event.target).children();
        let listaItemToSave = []
        console.log(listElements)
        $(listElements).each(function( index ) {

            let item = new Object()
            item.id =  $(this).data('id');
            item.index  = index++;

            item.action_type= 'category';
            item.type = 'file';
            item.parent =  $(this).data('parent');

            listaItemToSave.push(item);
        });

        $.ajax({
            type: 'POST',
            url: "/admin/special_operation/save_orders",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  listaItemToSave: JSON.stringify(listaItemToSave)},
            success: function(result) {
            },
            error: function(returnval) {

            },
        })

  });




    $('.sortableTableLinksSupport').sortable({
    refreshPositions: true,
    opacity: 0.6,
    scroll: true,
    containment: 'parent',
    placeholder: 'placeholder',
    tolerance: 'pointer',
    // handle: 'sortable_handle',
    //filter: 'filtered'
  }).disableSelection().on( "sortstop", function( event, ui ) {

        var listElements = $(event.target).children();
        let listaItemToSave = []
        console.log(listElements)
        $(listElements).each(function( index ) {

            let item = new Object()
            item.id =  $(this).data('id');
            item.index  = index++;
            item.action_type= $(this).data('action')
            item.type= $(this).data('type')
            item.parent =  $(this).data('parent');
            listaItemToSave.push(item);
        });

        $.ajax({
            type: 'POST',
            url: "/admin/special_operation/save_orders",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  listaItemToSave: JSON.stringify(listaItemToSave)},
            success: function(result) {
            },
            error: function(returnval) {

            },
        })

  });


}

