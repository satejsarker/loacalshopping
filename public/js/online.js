$(document).ready(function() {
    $('.delete-test').on('click', function() {
        var id = $(this).data('id');
        var url = '/deleteo/' + id;
        if (confirm('do you want to delete ?')) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result) {
                    console.log('deleteting the file ');
                    location.reload();
                },
                error: function(err) {
                    console.log(err);
                }
            });

        }

    });
    $('.edit-test').on('click', function() {
        $('#edit-form-linkonline').val($(this).data('imagePath'));
        $('#edit-form-description').val($(this).data('description'));
        $('#edit-form-price').val($(this).data('price'));
        $('#edit-form-city').val($(this).data('city'));
        $('#edit-form-pnames').val($(this).data('pnames'));
        $('#edit-form-catagory').val($(this).data('catagory'));
        $('#edit-form-mobile').val($(this).data('mobile'));
        $('#edit-form-id').val($(this).data('id'));


    });
});