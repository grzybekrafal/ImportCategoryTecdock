new Vue({
  el: '#appImgCat',
  delimiters: ['[[', ']]'],
  data: {
    filelist: [],
    loading: false,
    files_loading : 0,
    uploadProgress_list: {},
  },
  computed: {
    uploadingFiles(){
        if (this.files_loading > 0){
            return true
        } else {
            return false
        }
    }
  },
  methods: {
    onChange() {
      this.filelist = [...this.$refs.file.files];
      this.save_this_image();
    },
    remove(i) {
      console.log('remove');
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      console.log('dragover');
      event.preventDefault();
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100');
        event.currentTarget.classList.add('bg-green-300');
      }
    },
    dragleave(event) {
      console.log('dragleave');
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    drop(event) {
      event.preventDefault();
      wrong_file_is_dropped = false;
      const dt = new DataTransfer()
      for (var f in event.dataTransfer.files) {
        if($.isNumeric(f)){
          var file = event.dataTransfer.files[f];
            var fileExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
            var ext = file.type;
            if ($.inArray(ext, fileExtension) == -1) {
              if(!wrong_file_is_dropped){
                  wrong_file_is_dropped += event.dataTransfer.files[f].name;
              } else {
                wrong_file_is_dropped += event.dataTransfer.files[f].name;
              }
            } else {
              dt.items.add(event.dataTransfer.files[f]);
            }
        }
        this.$refs.file = dt;
        // Clean up
        event.currentTarget.classList.add('bg-gray-100');
        event.currentTarget.classList.remove('bg-green-300');
      }
      this.onChange(); // Trigger the onChange event manually
      if(wrong_file_is_dropped){
          alert("Można zapisać tylko pliki z obrazkami: jpeg, jpg, png, gif, bmp, webp");
      }
    },
    save_this_image(){
        axios.defaults.xsrfHeaderName = "X-CSRFToken";
        axios.defaults.xsrfCookieName = "csrftoken";

        this.loading = true
        this.files_loading = this.filelist.length

        for (var f in this.filelist) {
          var bodyFormData = new FormData();
          bodyFormData.append("file", this.filelist[f]);

           let key = this.filelist[f].name.replaceAll(' ', '_');
           const config = {
                file_name: key,
                onUploadProgress: progressEvent => {
                    const file_name = key;
                    if (this.uploadProgress_list[file_name] == undefined){
                        this.uploadProgress_list[file_name] = 0
                    }
                    this.uploadProgress_list[file_name] = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                    this.$forceUpdate();
                }
           }

          axios.post("/admin/add_image_to_category/"+category_id, bodyFormData, config)
           .then((response) => {

               delete(this.uploadProgress_list[config.file_name])
               this.$forceUpdate();

                let html = $('.img_card_category').find('ul').html();
                $('.img_card_category').find('ul').append('<li class="ui-sortable-handle">'+response.data+'</li>');
                this.files_loading--;

                window.scrollTo({ top: $('.img_card').find('ul').offset().top, behavior: 'smooth' });
                swal({
                    title: 'Dodano',
                    html: 'Dodano plik',
                    showCancelButton: false,
                    icon: 'success',
                })

                sortableElements();
           })
           .catch((error) => {
                this.alert_message = 'Wystąpił błąd podczas zapisu zdjęcia.';
                this.show_alert = true;
                this.files_loading--;
           });
        }

        this.loading = false

        this.filelist = []
    },

  }
});
