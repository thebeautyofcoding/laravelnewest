$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).ready(function () {

    $(this).on('change', '.companiesToDeleteCheckbox', function () {
        $('tr').not(':has(:checkbox:checked)').removeClass('waitingToBeRemoved')
        $('tr').filter(':has(:checkbox:checked)').each(function () {
            $(this).addClass('waitingToBeRemoved')

        });

    })
    $('#deleteCompanies').hide()
    $(this).on('change', function () {

        $(this).each(function () {

            $('.companiesToDeleteCheckbox:checkbox:checked').length > 0 ? $('#deleteCompanies').fadeIn() : $('#deleteCompanies').fadeOut()

        })
    })
    $('#deleteCompanies').on('click', function () {

        var companiesToDelete = []
        $("input:checkbox:checked").each(function () {
            companiesToDelete.push($(this).val());
        });
        $.ajax({
            url: '/companiesDelete', // separate file for search
            data: {
                companiesToDelete: companiesToDelete
            },
            method: 'POST',

            success: function (response) {


                $('.waitingToBeRemoved').css({
                    'background-color': '#f60000',
                    'color': '#fff'
                });
                $('.waitingToBeRemoved').fadeOut('slow', function () {
                    $(this).remove();
                })


                $('#deleteCompanies').fadeOut('slow')




            }



        })



    })
    $('#createCompanyButton').attr('disabled', true);
    $(this).on('keyup', 'input', function(){
        var trigger = false;
        $('form input[type="text"]').each(function(){

 
            
            if(!$(this).val()){
                trigger = true;
               
            }
            trigger? $('#createCompanyButton').attr('disabled', true): $('#createCompanyButton').attr('disabled', false)
     
        })
      
      
        })
       
  
})