Dropzone.options = {

}
Dropzone.options.fileDropzone = {
   
    url: `image/upload/store?${Math.random()}`,
    acceptedFiles: ".jpeg,.jpg,.png,.gif",
    addRemoveLinks: true,
    maxFilesize: 1,
    params: { 'personId': $('#personIdHidden').val() },
    headers: {
        'X-CSRF-TOKEN': "{{ csrf_token() }}"
    },
    removedfile: function (file) {
        var name = file.upload.filename;
        $.ajax({
            type: 'POST',
            url: 'image/upload/store',
            data: { "_token": "{{ csrf_token() }}", name: name },
            success: function (data) {
                console.log("File has been successfully removed!!");
            },
            error: function (e) {
                console.log(e);
            }
        });
        var fileRef;
        return (fileRef = file.previewElement) != null ?
            fileRef.parentNode.removeChild(file.previewElement) : void 0;
    },
    success: function (file, response) {
        $('#photoIdHidden').val(response.photoId)
    },
}

