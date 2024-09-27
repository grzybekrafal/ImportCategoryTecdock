(function() {

    var jquery_version = '3.3.1';
    var site_url = '/';

    var static_url = site_url + 'static/';
    var min_width = 100;
    var min_height = 100;
    var jquery_src = site_url + 'site/js/jquery/jquery-2.2.4.min.js'
    var save_img_url = site_url + 'admin/save_img_from_www';

    console.log('Wczytało się ! ');

    function bookmarklet(){

       var css = jQuery('<link>');
       css.attr({
        rel: 'stylesheet',
        type: 'text/css',
        href: static_url + 'css/bookmarklet.css?r='
        +Math.floor(Math.random()*99999999999999999999999999999999999999999999999)
       });

       jQuery('head').append(css);

       jQuery('#bookmarklet').remove();

       box_html = "<div id='bookmarklet' class='bookmarklet_class'><a href='#' id='close'>&times;</a>";

       box_html += "<h2>Wybierz produkt do którego mamy zapisać zdjęcia aasss</h2><hr>";

       box_html += "<div class='col_0'>";

       box_html += "<div class='col_1'>";
       box_html += "<label>Podaj szukany symbol</label>";
       box_html += "<p><input type='text' id='search_symbol_search_img'></p>";
       box_html += "<button type='button' onClick='search_by_symbol_search_img()'>Szukaj</button>";
       box_html += "</div>";

       box_html += "<div class='col_2'>";
       box_html += "<label>Wskarz produkt do zapisu</label>";
       box_html += "<p><select name='symbol' id='select_symbol_search_img'><option value=''>Wyszukaj SYMBOL</option></select></p>";
       box_html += "<button type='button' onClick='save_to_this_symbol_search_img()'>Zapisz wskazane zdjęcia</button>";
       box_html += "</div>";

       box_html += "</div>";

       box_html += "<div class='col_0'><hr><h2>Wybierz zdjęcia do dodania:</h2><hr>";


       box_html += "<form id='form_symbol_mp_search_img' target='_blank' method='POST'  action='"+save_img_url+"'>";
       box_html += "<input type='hidden' id='symbol_mp_search_img' name='symbol_mp' value=''>";
       box_html += "<input type='hidden' id='large_lp_mp' name='large_lp' value=''>";
       box_html += "<input type='hidden' name='csrfmiddlewaretoken' value=''>";
       box_html += "<div class='images'></div></div></div>";

       box_html += "</form>";

       box_html += "<script>function removeThisImageMp(lp){ jQuery('.img_mp_'+lp).remove();}</script>";

        box_html += "<script>";


        box_html += "function set_wh_this_img(img){";

        box_html += "   let h = img.naturalHeight; ";
        box_html += "   let w = img.naturalWidth; ";
        box_html += "   let lp = jQuery(img).data('lp');";
        box_html += "   jQuery('.wh_'+lp).html(w + 'x' + h);";

        box_html += "}";


        box_html += "function set_wh_img(){";
        box_html += "   jQuery('.img_mp_symbol').each(function(i, img) { ";
        box_html += "   let h = img.naturalHeight; ";
        box_html += "   let w = img.naturalWidth; ";
        box_html += "   let lp = jQuery(img).data('lp');";
        box_html += "   jQuery('.wh_'+lp).html(w + 'x' + h);";
        box_html += "   }); ";
        box_html += "}";

        box_html += "function save_to_this_symbol_search_img(){";
        box_html += " let v = jQuery('#select_symbol_search_img').val(); ";
        box_html += " if(v != '' && v != undefined) {";
        box_html += " jQuery('#symbol_mp_search_img').val(v);";
        box_html += " jQuery('#form_symbol_mp_search_img').submit();";
        box_html += "} else {";
        box_html += " alert('Wybierz SYMBOL');";
        box_html += "}";
        box_html += "}";


        box_html += "function search_by_symbol_search_img(){";

        box_html += "let symbol = jQuery('#search_symbol_search_img').val();";

        box_html += "jQuery.ajax({";
        box_html += "type: 'GET',";
        box_html += "'Access-Control-Allow-Origin': '*',";
        box_html += "url: '"+site_url+"admin/get_product_list_by_symbol/'+symbol,";
        box_html += "";
        box_html += "success: function(result) {";

        box_html += "jQuery('#select_symbol_search_img option').remove();";

        box_html += "jQuery.each(result.list, function( index, value ) {";

        box_html += "jQuery('#select_symbol_search_img').append(jQuery('<option>', {";
        box_html += " value: value.id,";
        box_html += " text: value.symbol + ' - '+ value.category";
        box_html += "}));";

        box_html += "});";
        box_html += "";
        box_html += "";


        box_html += "},";
        box_html += "error: function(returnval) {";
        box_html += "console.log(returnval);";
        box_html += "alert('Błąd przy próbie pobrania SYMBOL.')";
        box_html += "},";
        box_html += "})";
        box_html += "}";


        box_html += "set_wh_img();";

        box_html += "</script>";


       jQuery('body').append(box_html);

       jQuery('#bookmarklet #close').click(function(){
        jQuery('#bookmarklet').remove();
       })

        images_array = [];
        images_array = getImages('jpg', images_array);
        images_array = getImages('jpeg', images_array);
        images_array = getImages('png', images_array);
        images_array = getImages('gif', images_array);
        images_array = getImages('webp', images_array);
        images_array = getImages('svg', images_array);
        images_array = getImagesUrl(images_array);

        jQuery('#large_lp_mp').val(images_array.length);
    }

    function add_this_image(image_url, images_array){
        if(jQuery.inArray(image_url, images_array) === -1) {
           images_array.push(image_url);
           let count = images_array.length;

           let img_html = '<div class="img_mp img_mp_'+count+'">';

           img_html += '<button class="btn btn-warning small_btn" onClick="removeThisImageMp('+"'"+count+"'"+')">x</button>';
           img_html += '<img data-lp="'+count+'" class="img_mp_symbol" src="'+image_url+'" onLoad="set_wh_this_img(this);"/>';
           img_html += "<input type='hidden' name='img_"+count+"' value='"+image_url+"'>";
           img_html += "<div><center><small class='wh_"+count+"'></small></center></div>"
           img_html += '</div>';

           jQuery('#bookmarklet .images').append(img_html);
        }
        return images_array;
    }


    function getImagesUrl(images_array){
        jQuery.each(jQuery('img'), function (index, image) {
            if (jQuery(image).width() >= min_width && jQuery(image).height() >= min_height){
                image_url = jQuery(image).attr('src');
                if(image_url !== undefined){
                    if(image_url.substring(0, 4) == 'http'){
                        last_4 = image_url.substring(image_url.length - 4);
                        last_3 = image_url.substring(image_url.length - 4);
                        if(last_4 != 'jpeg' && last_4 != 'webp' && last_3 != 'jpg' && last_3 != 'png' && last_3 != 'gif' && last_3 != 'svg'){
                            images_array = add_this_image(image_url, images_array);
                        }
                    }
                }
            }
        });
        return images_array;
    }

    function getImages(type, images_array){
        jQuery.each(jQuery('img[src$="'+type+'"]'), function (index, image) {
            if (jQuery(image).width() >= min_width && jQuery(image).height() >= min_height){
                image_url = jQuery(image).attr('src');
                images_array = add_this_image(image_url, images_array);
            }
        });
        return images_array;
    }

    if (typeof window.jQuery != 'undefined') {
        bookmarklet();
    } else {
        var confilct = typeof window.$ != 'undefined';

        var script = document.createElement('script');
        script.setAttribute(
            'src',
            jquery_src
        );
        document.body.appendChild(script);

        var attempts = 15;
        (function(){
            if(typeof window.jQuery == 'undefined') {
                if(--attempts > 0) {
                    window.setTimeout(arguments.callee, 250);
                } else {
                    alert('Wystapił błąd podczas wczytywana jQuery');
                }
            } else {
                bookmarklet();
            }
        })();

    }



})();

