new Vue({
  el: '#app_file',
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
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100');
        event.currentTarget.classList.add('bg-green-300');
      }
    },
    dragleave(event) {
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
          dt.items.add(event.dataTransfer.files[f]);
        }
        this.$refs.file = dt;
        // Clean up
        event.currentTarget.classList.add('bg-gray-100');
        event.currentTarget.classList.remove('bg-green-300');
      }
      this.onChange(); // Trigger the onChange event manually

      if(wrong_file_is_dropped){
          alert("Można zapisać tylko pliki z obrazkami");
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


          axios.post("/admin/add_file_to_product/"+product_id, bodyFormData, config)
           .then((response) => {

               delete(this.uploadProgress_list[config.file_name])
               this.$forceUpdate();

                let html = $('#category_tab_0').html();
                $('#category_tab_0').html(html + response.data);

                window.scrollTo({ top: $('#category_tab_0').offset().top, behavior: 'smooth' });
                swal({
                    title: 'Dodano',
                    html: 'Dodano plik',
                    showCancelButton: false,
                    icon: 'success',
                })

                this.files_loading--;
                sortableElements();
           })
           .catch((error) => {
                this.alert_message = 'Wystąpił błąd podczas zapisu pliku.';
                this.show_alert = true;
                this.files_loading--;
           });
        }

        this.loading = false

        this.filelist = [];
    },

  }
});
