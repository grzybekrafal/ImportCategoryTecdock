//const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;


    $( "body" ).on( "click", ".clear_this_form",  function() {
        $('#clear_form').submit();
    });


    $( "body" ).on( "click", ".btn_show_more",  function() {
        let pk = $(this).data('id');
        if($('#pk_info_'+pk).is(":visible")){
            $('#pk_info_'+pk).hide();
        } else {

            $.ajax({
                type: 'POST',
                url: "/admin/products/product_more_information",
                data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: pk},
                success: function(result) {
                    $('#pk_info_'+pk).show();
                    let html = "<small><b>Lista uzupełnionych cech</b></small><ul>";
                    $.each(result, function( index, value ) {
                        html += '<li class="float-left ml-4"><small>' + index + ' : ' + value + '</small></li>'
                    });
                    html += "</ul>";
                    $('#pk_'+pk).html(html);
                },
                error: function(returnval) {

                },
            })

        }

    });

    $( "body" ).on( "click", ".deactivate-lang",  function() {
        let id = $(this).data('id');
        $.ajax({
            type: 'POST',
            url: "/admin/lang/deactivate_lang/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id},
            success: function(result) {
                $('#lang_deactivate_'+id).show()
                $('#lang_active_'+id).hide()

                $('#lang_deactivate_btn_'+id).hide()
                $('#lang_active_btn_'+id).show()
            },
            error: function(returnval) {

             },
        })
    });

    $( "body" ).on( "click", ".active-lang",  function() {
         let id = $(this).data('id');
         $.ajax({
            type: 'POST',
            url: "/admin/lang/activate_lang/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id},
            success: function(result) {

                $('#lang_deactivate_'+id).hide()
                $('#lang_active_'+id).show()

                $('#lang_active_btn_'+id).hide()
                $('#lang_deactivate_btn_'+id).show()
            },
            error: function(returnval) {

             },
         })
    });

    $( "body" ).on( "click", ".delete-filters",  function() {
        let id = $(this).data('id');
        swal({
            title: 'Potwierdź usunięcie.',
            html: 'Czy na pewno chcesz usunąć tą cechę?',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Tak',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'Nie',
            buttonsStyling: false
          }).then(function(result) {
             if(result.value){
                window.location.replace("/admin/remove_filter/"+id);
             }
          })
          .catch(swal.noop);
    });

    $( "body" ).on( "click", ".delete-filters-info",  function() {
        let id = $(this).data('id');

        $.ajax({
            type: 'POST',
            url: "/admin/filters/get_filter_answers/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id},
            success: function(result) {
                html = '';
                if (result['Success']){
                    console.log(result['product__category__name'])
                    html += '<div ><b>Cecha jest używana w kategoriach:</b></div>'


                    html += '<br><br><ul style="list-style-type: none;">'
                    html += '<li style="text-align: left;">'
                    html += ' <small>Kategoria i ilość produktów w kategorii</small>'
                    html += '</li>'

                    $.each(result['count'], function( index, value ) {
                        html += '<li style="text-align: left;"><small>'
                        + value['product__category__name']
                        + ' : '
                        +  value['total']
                        + '</small></li>';

                    });
                    html += '</ul>';

                }

                swal({
                    title: 'Potwierdź usunięcie.',
                    html: 'Czy na pewno chcesz usunąć tą cechę? <div>'+html+'</div>',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: 'Tak',
                    cancelButtonClass: 'btn btn-danger',
                    cancelButtonText: 'Nie',
                    buttonsStyling: false
                  }).then(function(result) {
                     if(result.value){
                        window.location.replace("/admin/remove_filter/"+id);
                     }
                  })
                  .catch(swal.noop);
            },
            error: function(returnval) {

             },
        })


    });


    $( "body" ).on( "click", ".delete-products",  function() {
        let id = $(this).data('id');
        swal({
            title: 'Potwierdź usunięcie.',
            html: 'Czy na pewno chcesz usunąć ten product?',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Tak',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'Nie',
            buttonsStyling: false
          }).then(function(result) {
             if(result.value){
                window.location.replace("/admin/remove_product/"+id);
             }
          })
          .catch(swal.noop);
    });

    $( "body" ).on( "click", ".deactivate-products",  function() {
        let id = $(this).data('id');
        $.ajax({
            type: 'POST',
            url: "/admin/products/deactivate_product/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id},
            success: function(result) {
                $('#products_deactivate_'+id).show()
                $('#products_active_'+id).hide()

                $('#products_deactivate_btn_'+id).hide()
                $('#products_active_btn_'+id).show()
            },
            error: function(returnval) {

             },
        })
    });

    $( "body" ).on( "click", ".active-products",  function() {
         let id = $(this).data('id');
         $.ajax({
            type: 'POST',
            url: "/admin/products/activate_product/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id},
            success: function(result) {

                $('#products_deactivate_'+id).hide()
                $('#products_active_'+id).show()

                $('#products_active_btn_'+id).hide()
                $('#products_deactivate_btn_'+id).show()
            },
            error: function(returnval) {

             },
         })
    });


    $( "body" ).on( "click", ".delete-products-td",  function() {
        let id = $(this).data('id');
        swal({
            title: 'Potwierdź usunięcie.',
            html: 'Czy na pewno chcesz usunąć ten product?',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Tak',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'Nie',
            buttonsStyling: false
          }).then(function(result) {
             if(result.value){
                $.ajax({
                    type: 'POST',
                    url: "/admin/products/remove_ajax/",
                    data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id},
                    success: function(result) {
                        $('#product_td_'+id).remove()
                    },
                    error: function(returnval) {
                     },
                })
             }
          })
          .catch(swal.noop);
    });


    $( "body" ).on( "click", ".delete-filter-td",  function() {
        let id = $(this).data('id');
        swal({
            title: 'Potwierdź usunięcie.',
            html: 'Czy na pewno chcesz usunąć tą cechę?',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Tak',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'Nie',
            buttonsStyling: false
          }).then(function(result) {
             if(result.value){
                $.ajax({
                    type: 'POST',
                    url: "/admin/filters/remove_ajax/",
                    data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id},
                    success: function(result) {
                        $('#filter_td_'+id).remove()
                    },
                    error: function(returnval) {
                     },
                })
             }
          })
          .catch(swal.noop);
    });


    $( "body" ).on( "click", ".unset-news-products",  function() {
        let id = $(this).data('id');
        $.ajax({
            type: 'POST',
            url: "/admin/products/unset_news/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id},
            success: function(result) {
                $('#products_not_news_'+id).show()
                $('#products_news_'+id).hide()
                $('#products_not_news_btn_'+id).hide()
                $('#products_news_btn_'+id).show()
            },
            error: function(returnval) {

             },
        })
    });


    $( "body" ).on( "click", ".set-news-products",  function() {
         let id = $(this).data('id');
         $.ajax({
            type: 'POST',
            url: "/admin/products/set_news/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id},
            success: function(result) {

                $('#products_not_news_'+id).hide()
                $('#products_news_'+id).show()
                $('#products_not_news_btn_'+id).show()
                $('#products_news_btn_'+id).hide()

            },
            error: function(returnval) {

             },
         })
    });


    $( "body" ).on( "click", ".unset-archive-products",  function() {
        let id = $(this).data('id');
        $.ajax({
            type: 'POST',
            url: "/admin/products/unset_archive/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id},
            success: function(result) {
                $('#products_not_archive_'+id).show()
                $('#products_archive_'+id).hide()


                $('#products_not_archive_btn_'+id).hide()
                $('#products_archive_btn_'+id).show()
            },
            error: function(returnval) {

             },
        })
    });

    $( "body" ).on( "click", ".set-archive-products",  function() {

         let id = $(this).data('id');
         $.ajax({
            type: 'POST',
            url: "/admin/products/set_archive/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id},
            success: function(result) {

                $('#products_not_archive_'+id).hide()
                $('#products_archive_'+id).show()
                $('#products_not_archive_btn_'+id).show()
                $('#products_archive_btn_'+id).hide()
            },
            error: function(returnval) {

             },
         })
    });



    $( "body" ).on( "click", ".deactivate-files",  function() {
        let id = $(this).data('id');
        let type = $(this).data('type');
        $.ajax({
            type: 'POST',
            url: "/admin/products/deactivate_files/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id, type: type},
            success: function(result) {
                $('#file_deactivate_'+id).show()
                $('#file_active_'+id).hide()

                $('#file_deactivate_btn_'+id).hide()
                $('#file_active_btn_'+id).show()
            },
            error: function(returnval) {

             },
        })
    });

    $( "body" ).on( "click", ".active-files",  function() {
         let id = $(this).data('id');
         let type = $(this).data('type');
         $.ajax({
            type: 'POST',
            url: "/admin/products/activate_files/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id, type: type},
            success: function(result) {

                $('#file_deactivate_'+id).hide()
                $('#file_active_'+id).show()

                $('#file_active_btn_'+id).hide()
                $('#file_deactivate_btn_'+id).show()
            },
            error: function(returnval) {

             },
         })
    });




/*
//Blockui plugin...this causes the blockui to run
  //whenever the content is within an <asp:UpdatePanel>
  Page = Sys.WebForms.PageRequestManager.getInstance();
  Page.add_beginRequest(OnBeginRequest);
  Page.add_endRequest(endRequest);

  function OnBeginRequest(sender, args) {
    blockUI();
  }
  function endRequest(sender, args) {
    $.unblockUI();
  }
*/
  //Center the element
  $.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
    return this;
  }

  //blockUI
  function blockUI() {
    $.blockUI({
      css: {
        backgroundColor: 'transparent',
        border: 'none'
      },
      message: '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>',
      baseZ: 1500,
      overlayCSS: {
        backgroundColor: '#FFFFFF',
        opacity: 0.7,
        cursor: 'wait'
      }
    });
    $('.blockUI.blockMsg').center();
  }


  function remove_this_link(id, cat_id,  cat_name,  type){
        swal({
            title: 'Potwierdź usunięcie.',
            html: 'Czy na pewno usunąć ten link ?',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Tak',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'Nie',
            buttonsStyling: false
        }).then(function(result) {
         if(result.value){
            $.ajax({
                type: 'POST',
                url: "/admin/links/remove",
                data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  id: id, type: type},
                success: function(result) {
                    $('#tab_link_'+id).remove();
                    $('#link_category_options').append('<option value="'+cat_id+'">'+cat_name+'</option>')
                },
                error: function(returnval) {

                },
            })
         }
        })
      .catch(swal.noop);
    }



    function file_category_select(obj){
         let id = $(obj).data('id');
         let productId = $(obj).data('product');
         let category = $(obj).val();
         let html = $('#file_'+id+'_'+productId).clone();
         $(html).find('.file_category_select').val(category)
         $('#file_'+id+'_'+productId).remove();
         $('#category_tab_'+category).append(html)

         $.ajax({
            type: 'POST',
            url: "/admin/products/change_files_category/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id, productId: productId, category: category},
            success: function(result) {

            },
            error: function(returnval) {

             },
         })


    }


    function file_category_select_for_category(obj){

         let id = $(obj).data('id');
         let categoryId = $(obj).data('category');
         let category = $(obj).val();
         let html = $('#file_'+id+'_'+categoryId).clone();
         $(html).find('.file_category_select').val(category)
         $('#file_'+id+'_'+categoryId).remove();
         $('#category_tab_'+category).append(html)

         $.ajax({
            type: 'POST',
            url: "/admin/category/change_files_category/",
            data: {csrfmiddlewaretoken: window.CSRF_TOKEN,  pk: id, categoryId: categoryId, category: category},
            success: function(result) {

            },
            error: function(returnval) {

             },
         })
    }


$(document).ajaxStart(function() {
    blockUI();
}).ajaxStop(function() {
    $.unblockUI();
});






