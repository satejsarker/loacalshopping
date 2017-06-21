$(document).ready(function() {
    $('.delete-testr').on('click', function() {
        var id = $(this).data('id');
        var url = '/deleter/' + id;
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

});