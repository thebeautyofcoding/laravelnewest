

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});



// Document.ready
$(function () {

    $(this).on('click', ':button.personPageButton, :button#nextButton, :button#previousButton', function () {

        var currentPageNumber = $(this).val();


        var ajaxPageLimit = $('#ajaxPageLimit').val()
        if ($('#personProperty').val() === '' && $('#searchInput').val() === '') {

            var controllerpath = `/ajax/persons?page=${currentPageNumber}&ajaxPageLimit=${ajaxPageLimit}`;


            $.ajax({
                type: "GET",
                url: controllerpath,




                success: function (response) {

                    $('.tr').each(function () {
                        $(this).remove()
                    })

                    $('#currentLimit').val(ajaxPageLimit)
                    $('#currentLimit').text(ajaxPageLimit)



                    $.map(response.persons.data, function (person) {
                        personHtml = `<tr data-id="${typeof person.id !== 'undefined' ? person.id : ''}" class="tr">

                        <td class="foto"><div class="imgAndBtnContainer"><button class="btn-sm btn-danger imageDeleteBtn" data-id="${person.id}">x</button><img class=" personPic img-thumbnail" src="/image/show/${person.id}?${Math.random()}"/></div>
          
                        </td>
                         <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${typeof person.firma.id !== 'undefined' ? person.firma.id : ''}"class="firma"><a href="companies/details/${person.firma.id}">${person.firma.name}</a></td>
                        <td ><button data-id="${typeof person.id !== 'undefined' ? person.id : ''}" data-target="#editPerson${typeof person.id !== 'undefined' ? person.id : ''}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`



                        $('tbody').append(personHtml)
                    })






                    $('#paginationNav').remove()

                    var paginationTemplate = `
                    {{^onlyOnePage}}
                    <nav id="paginationNav" aria-label="Page navigation example">
                        <ul class="pagination">
                        {{#previousPage}}
                            <li class="page-item">
                                <button class="page-link" id="previousButton" type="submit" name="" value="{{.}}">
                                    Previous
                                </button>
                            </li>
                            {{/previousPage}}
                            {{#total}}



                            <li class="page-item">
                                <button class="page-link personPageButton"  type="submit" name="" value="{{.}}">
                                   {{.}}
                                </button>
                            </li>
                            {{/total}}
                        {{^isLastPage}}
                            {{#nextPage}}
                            <li class="page-item">
                                <button class="page-link" id="nextButton" type="submit" name="" value="{{.}}">
                                    Next
                                </button>
                            </li>
                            {{/nextPage}}
                        {{/isLastPage}}
                        </ul>
                    </nav>
                {{/onlyOnePage}}
                `
                    var pagintationHtml = Mustache.render(paginationTemplate, response)
                    $('#paginationContainer').append(pagintationHtml)

                    $(`button[value=${response.persons.current_page}]`).closest('li').addClass('disabled')


                    // persons = {}
                    // persons.person=[]
                    // console.log(response)
                    // var personList = []
                    // // var person= new Object()
                    // response.persons.map(function (curr) {

                    //     personList.push(curr)

                    // })
                    // console.log(response)
                    // // var persons=JSON.stringify(persons)
                    // // persons={persons:persons}




                    // $('#trHeader').after(html)










                }
            })

        } else {



            var limit = $("#ajaxPageLimit").val();
            var query = $("#searchInput").val();

            var personProperty = $('#personProperty').val()
            var ajaxPageLimit = $('#ajaxPageLimit').val()
            console.log(ajaxPageLimit)
            $.ajax({
                type: "GET",
                url: `personsSearch?page=${currentPageNumber}&personProperty=${personProperty}&ajaxPageLimit=${ajaxPageLimit}&query=${query}`,

                success: function (response) {
                    console.log('success')
                    $('.tr').each(function () {
                        $(this).remove()
                    })

                    $('#currentLimit').val(limit)
                    $('#currentLimit').text(limit)


                    $.map(response.persons.data, function (person) {
                        personHtml = `<tr data-id="${person.id}" class="tr">
                        <td class="foto"><div class="imgAndBtnContainer"><button class="btn-sm btn-danger imageDeleteBtn" data-id="${person.id}">x</button><img class=" personPic img-thumbnail" src="/image/show/${person.id}"/></div>
          
                        </td>
                         <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${typeof person.firma.id !== 'undefined' ? person.firma.id : ''}"class="firma"><a href="companies/details/${person.firma.id}">${person.firma.name}</a></td>
                        <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`





                        $('tbody').append(personHtml)

                    })



                    $('#paginationNav').remove()
                    console.log(response.currentPage)







                    var paginationTemplate = `
                    {{^onlyOnePage}}
                    <nav id="paginationNav" aria-label="Page navigation example">
                        <ul class="pagination">
                        {{#previousPage}}
                            <li class="page-item">
                                <button class="page-link" id="previousButton" type="submit" name="" value="{{.}}">
                                    Previous
                                </button>
                            </li>
                            {{/previousPage}}
                            {{#total}}



                            <li class="page-item">
                                <button class="page-link personPageButton"  type="submit" name="" value="{{.}}">
                                   {{.}}
                                </button>
                            </li>
                            {{/total}}
                        {{^isLastPage}}
                            {{#nextPage}}
                            <li class="page-item">
                                <button class="page-link" id="nextButton" type="submit" name="" value="{{.}}">
                                    Next
                                </button>
                            </li>
                            {{/nextPage}}
                        {{/isLastPage}}
                        </ul>
                    </nav>
                {{/onlyOnePage}}
                `
                    var pagintationHtml = Mustache.render(paginationTemplate, response)
                    console.log(pagintationHtml)
                    $('#paginationContainer').append(pagintationHtml)
                    $(`button[value=${response.persons.current_page}]`).closest('li').addClass('disabled')
                },
                error: function (e) {
                    console.log(e);
                }
            })
        }
    })



    $('#searchInput').prop('disabled', 'disabled')
    $('#personProperty').change(function () {


        if ($(this).val() !== '') {
            $('#searchInput').prop('disabled', false)
        } else {
            $('#searchInput').prop('disabled', true)
        }
        if ($('#searchInput').val() !== '') {
            var query = $('#searchInput').val().toLowerCase().trim();
            var personProperty = $(this).val();
            var limit = $('#ajaxPageLimit').val();

            $.ajax({
                url: `personsSearch?page=${currentPageNumber}&personProperty=${personProperty}&ajaxPageLimit=${ajaxPageLimit}&query=${query}`,

                method: 'GET',

                success: function (response) {
                    $('.tr').remove()
                    var tableRows = $(response).find('.tr')

                    $.map(response.persons.data, function (person) {
                        personHtml = `<tr data-id="${person.id}" class="tr">
                        <td class="foto"><div class="imgAndBtnContainer"><button class="btn-sm btn-danger imageDeleteBtn" data-id="${person.id}">x</button><img class=" personPic img-thumbnail" src="/image/show/${person.id}?${Math.random()}"/></div>
          
                        </td>
                         <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${typeof person.firma.id !== 'undefined' ? person.firma.id : ''}"class="firma"><a href="companies/details/${person.firma.id}">${person.firma.name}</a></td>
                        <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`





                        $('tbody').append(personHtml)
                    })






                    $('#paginationNav').remove()
                    console.log(response.currentPage)







                    var paginationTemplate = `
                    {{^onlyOnePage}}
                    <nav id="paginationNav" aria-label="Page navigation example">
                        <ul class="pagination">
                        {{#previousPage}}
                            <li class="page-item">
                                <button class="page-link" id="previousButton" type="submit" name="" value="{{.}}">
                                    Previous
                                </button>
                            </li>
                            {{/previousPage}}
                            {{#total}}



                            <li class="page-item">
                                <button class="page-link personPageButton"  type="submit" name="" value="{{.}}">
                                   {{.}}
                                </button>
                            </li>
                            {{/total}}
                        {{^isLastPage}}
                            {{#nextPage}}
                            <li class="page-item">
                                <button class="page-link" id="nextButton" type="submit" name="" value="{{.}}">
                                    Next
                                </button>
                            </li>
                            {{/nextPage}}
                        {{/isLastPage}}
                        </ul>
                    </nav>
                {{/onlyOnePage}}
                `
                    var pagintationHtml = Mustache.render(paginationTemplate, response)
                    console.log(pagintationHtml)
                    $('#paginationContainer').append(pagintationHtml)
                    $(`button[value=${response.currentPage}]`).closest('li').addClass('disabled')

                },
                error: function () {
                    alert("something has gone wrong");
                }
            });
        }

    })

    $("#searchInput").on("keyup", function () {


        var query = $(this).val().toLowerCase().trim();
        var personProperty = $('#personProperty').val();
        var limit = $('#ajaxPageLimit').val().trim();

        $.ajax({
            url: 'personsSearch',
            data: {
                'query': query,
                'personProperty': personProperty,
                'ajaxPageLimit': limit,
                'currentPage': 1
            },
            method: 'GET',

            success: function (response) {
                $('.tr').remove()
                console.log(response)
                $.map(response.persons.data, function (person) {
                    
                    personHtml = `<tr data-id="${person.id}" class="tr">
                    <td class="foto"><div class="imgAndBtnContainer"><button class="btn-sm btn-danger imageDeleteBtn" data-id="${person.id}">x</button><img class=" personPic img-thumbnail" src="/image/show/${person.id}?${Math.random()}"/></div>
          
                    </td>
                         <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${typeof person.firma.id !== 'undefined' ? person.firma.id : ''}"class="firma"><a href="companies/details/${person.firma.id}">${person.firma.name}</a></td>
                        <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`





                    $('tbody').append(personHtml)

                })



                $('#paginationNav').remove()








                var paginationTemplate = `
                    {{^onlyOnePage}}
                    <nav id="paginationNav" aria-label="Page navigation example">
                        <ul class="pagination">
                        {{#previousPage}}
                            <li class="page-item">
                                <button class="page-link" id="previousButton" type="submit" name="" value="{{.}}">
                                    Previous
                                </button>
                            </li>
                            {{/previousPage}}
                            {{#total}}



                            <li class="page-item">
                                <button class="page-link personPageButton"  type="submit" name="" value="{{.}}">
                                   {{.}}
                                </button>
                            </li>
                            {{/total}}
                        {{^isLastPage}}
                            {{#nextPage}}
                            <li class="page-item">
                                <button class="page-link" id="nextButton" type="submit" name="" value="{{.}}">
                                    Next
                                </button>
                            </li>
                            {{/nextPage}}
                        {{/isLastPage}}
                        </ul>
                    </nav>
                {{/onlyOnePage}}
                `
                var pagintationHtml = Mustache.render(paginationTemplate, response)
                console.log(pagintationHtml)
                $('#paginationContainer').append(pagintationHtml)
                $(`button[value=${response.persons.current_page}]`).closest('li').addClass('disabled')
            },
            error: function () {

            }
        });
    });



    $('#ajaxPageLimit').change(function () {


        var val = $('#ajaxPageLimit').val();

        var personProperty = $('#personProperty').val();
        var searchInput = $('#searchInput').val();


        const pageNumber = $('.page-item.disabled').find('#pageButton').val()

        var controllerpath = $("#uri_hidden").val();

        if (personProperty == '' && searchInput == '') {


            $.ajax({
                type: "GET",
                url: '/ajax/persons',
                data: { 'ajaxPageLimit': val, 'pageNumber': 1 },
                success: function (response) {
                    $('.tr').each(function () {
                        $(this).remove()

                    }
                    )
                    $('#paginationNav').remove()

                    var paginationTemplate = `
                    {{^onlyOnePage}}
                    <nav id="paginationNav" aria-label="Page navigation example">
                        <ul class="pagination">
                        {{#previousPage}}
                            <li class="page-item">
                                <button class="page-link" id="previousButton" type="submit" name="" value="{{.}}">
                                    Previous
                                </button>
                            </li>
                            {{/previousPage}}
                            {{#total}}



                            <li class="page-item">
                                <button class="page-link personPageButton"  type="submit" name="" value="{{.}}">
                                   {{.}}
                                </button>
                            </li>
                            {{/total}}
                        {{^isLastPage}}
                            {{#nextPage}}
                            <li class="page-item">
                                <button class="page-link" id="nextButton" type="submit" name="" value="{{.}}">
                                    Next
                                </button>
                            </li>
                            {{/nextPage}}
                        {{/isLastPage}}
                        </ul>
                    </nav>
                {{/onlyOnePage}}
                `

                    paginationHtml = Mustache.render(paginationTemplate, response)
                    $.map(response.persons.data, function (person) {
                        personHtml = `<tr data-id="${person.id}" class="tr">
                        <td class="foto"><div class="imgAndBtnContainer"><button class="btn-sm btn-danger imageDeleteBtn" data-id="${person.id}">x</button><img class=" personPic img-thumbnail" src="/image/show/${person.id}?${Math.random()}"/></div>
          
                        </td>
                        <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${typeof person.firma.id !== 'undefined' ? person.firma.id : ''}"class="firma"><a href="companies/details/${person.firma.id}">${person.firma.name}</a></td>
                        <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`






                        $('tbody').append(personHtml)
                    })

                    $('#paginationContainer').append(paginationHtml)

                    $('#currentLimit').val(val)
                    $('#currentLimit').text(val)

                    $('#ajaxPageLimit option').show();
                    $('#ajaxPageLimit option:selected').hide();




                }

            })

        } else {
            var val = $('#ajaxPageLimit').val();

            var query = $('#searchInput').val().toLowerCase().trim();
            var personProperty = $('#personProperty').val().trim();
            var limit = $('#ajaxPageLimit').val().trim();
            console.log(limit)
            $.ajax({
                url: '/personsSearch',
                data: {
                    'query': query,
                    'personProperty': personProperty,
                    'ajaxPageLimit': limit,
                    'page': 1
                },
                method: 'GET',

                success: function (response) {
                    $('.tr').remove()
                    $('#paginationNav').remove()

                    var paginationTemplate = `
                    {{^onlyOnePage}}
                    <nav id="paginationNav" aria-label="Page navigation example">
                        <ul class="pagination">
                        {{#previousPage}}
                            <li class="page-item">
                                <button class="page-link" id="previousButton" type="submit" name="" value="{{.}}">
                                    Previous
                                </button>
                            </li>
                            {{/previousPage}}
                            {{#total}}



                            <li class="page-item">
                                <button class="page-link personPageButton"  type="submit" name="" value="{{.}}">
                                   {{.}}
                                </button>
                            </li>
                            {{/total}}
                        {{^isLastPage}}
                            {{#nextPage}}
                            <li class="page-item">
                                <button class="page-link" id="nextButton" type="submit" name="" value="{{.}}">
                                    Next
                                </button>
                            </li>
                            {{/nextPage}}
                        {{/isLastPage}}
                        </ul>
                    </nav>
                {{/onlyOnePage}}
                `

                    paginationHtml = Mustache.render(paginationTemplate, response)
                    $('#paginationContainer').append(paginationHtml)
                    $.map(response.persons.data, function (person) {
                        personHtml = `<tr data-id="${person.id}" class="tr">
                        <td class="foto"><div class="imgAndBtnContainer"><button class="btn-sm btn-danger imageDeleteBtn" data-id="${person.id}">x</button><img class=" personPic img-thumbnail" src="/image/show/${person.id}?${Math.random()}"/></div>
          
                        </td>
                        <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${typeof person.firma.id !== 'undefined' ? person.firma.id : ''}"class="firma"><a href="companies/details/${person.firma.id}">${person.firma.name}</a></td>
                        <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`






                        $('tbody').append(personHtml)
                    })

                },
                error: function () {

                }
            });
        }

    })



    $(this).on('change', '.personsToDeleteCheckbox', function () {
        $('tr').not(':has(:checkbox:checked)').removeClass('waitingToBeRemoved')
        $('tr').filter(':has(:checkbox:checked)').each(function () {
            $(this).addClass('waitingToBeRemoved')

        });

    })
    $('#deletePersons').hide()
    $(this).on('change', function () {

        $(this).each(function () {

            $('.personsToDeleteCheckbox:checkbox:checked').length > 0 ? $('#deletePersons').fadeIn() : $('#deletePersons').fadeOut()

        })
    })
    $('#deletePersons').on('click', function () {

        var personsToDelete = []
        $("input:checkbox:checked").each(function () {
            personsToDelete.push($(this).val());
        });
        $.ajax({
            url: '/personsDelete', // separate file for search
            data: {
                personsToDelete: personsToDelete
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


                $('#deletePersons').fadeOut('slow')




            }



        })



    })




    $(this).on('click', '.update', function (e) {
      
        $('#modal').modal('show');

        var updateButtonId = $(this).data('id')
        $('#personIdHidden').val(updateButtonId)

        var companyId = $(this).parent().siblings('.firma').attr('value');
        var selectMenuHtml;

        $('#company').remove()
        $.ajax({
            url: 'companies',
            method: 'GET',
            success: function (response) {
                selectMenuHtml = `<label for="company">Bitte Firma auswählen:</label><select class="form-control" name="companies" id="company">
                <option value="">Bitte auswählen:</option>`;

                $.each(response.companies, function () {
                    selectMenuHtml = selectMenuHtml + ` <option value="${this.id}">${this.name}</option>`
                })

                selectMenuHtml = selectMenuHtml + `</select>`



                $('#companiesSelectMenu').append(selectMenuHtml)




            }

        })

        $.ajax({


            url: `persons/${updateButtonId}`,
            method: 'GET',
            success: function (response) {

                $('#modal h5').text(` Editiere ${response.person.vorname} ${response.person.nachname}`)

                $('#modal-idHidden').val(response.person.id);
                $('#modal-anrede').val(response.person.anrede);
                $('#modal-vorname').val(response.person.vorname);
                $('#modal-nachname').val(response.person.nachname);
                $('#modal-email').val(response.person.email);
                $('#modal-telefon').val(response.person.telefon);
                $('#modal-handy').val(response.person.handy);
                $('#modal').attr('data-id', response.person.id)
                $('#modal-updateButton').attr('data-id', response.person.id)




                $('#modal').modal('show')

                $(`input[data-id="${updateButtonId}"]`).siblings('#companiesSelectMenu').append(selectMenuHtml)
                $(`option[value='${companyId}']`).attr('selected', 'selected');
            }
        })
    })

    $(this).on('click', '#modal-updateButton', function () {
        console.log($(this).attr('data-id'))

        var personId = $(this).attr('data-id')
        var anrede = $('#modal-anrede').val()
        var  vorname = $('#modal-vorname').val()
        var  nachname = $('#modal-nachname').val()

        var email = $('#modal-email').val()
        var  telefon = $('#modal-telefon').val()
        var   handy = $('#modal-handy').val()
        var  firma = $('#company').val()



        $.ajax({
            url: 'persons/edit',
            data: {
                'id': personId,
                'anrede': anrede,
                'vorname': vorname,
                'nachname': nachname,
                'email': email,
                'telefon': telefon,
                'handy': handy,
                'firma': firma,
                'photo': $('#photoIdHidden').val()

            },
            method: 'PATCH',
      
            success: function (response) {
                console.log(response)
                $('body').removeClass('modal-open')
                $('#modal h5').text(``)
                $('#photoIdHidden').val('')
                $('#modal-idHidden').val('');
                $('#modal-anrede').val('');
                $('#modal-vorname').val('');
                $('#modal-nachname').val('');
                $('#modal-email').val('');
                $('#modal-telefon').val('');
                $('#modal-handy').val('');
                $('#modal').attr('data-id', '')
                $('#modal-updateButton').attr('data-id', '')
                $('.modal-backdrop').remove()

                
                $("tr[data-id='" + personId + "']").find('.foto').html(`<div class="imgAndBtnContainer"><button class="btn-sm btn-danger imageDeleteBtn" data-id="${response.updatedPerson.id}">x</button><img class=" personPic img-thumbnail" src="/image/show/${response.updatedPerson.id}?${Math.random()}"/></div>`)
                $("tr[data-id='" + personId + "']").find('.anrede').html(`${response.updatedPerson.anrede}`)
                $("tr[data-id='" + personId + "']").find('.vorname').html(`${response.updatedPerson.vorname}`)
                $("tr[data-id='" + personId + "']").find('.nachname').html(`${response.updatedPerson.nachname}`)
                $("tr[data-id='" + personId + "']").find('.email').html(`${response.updatedPerson.email}`)
                $("tr[data-id='" + personId + "']").find('.telefon').html(`${response.updatedPerson.telefon}`)
                $("tr[data-id='" + personId + "']").find('.handy').html(`${response.updatedPerson.handy}`)
                $("tr[data-id='" + personId + "']").find('.firma').html(`<a href="companies/details/${response.updatedPerson.firma.id}">${response.updatedPerson.firma.name}</a></td>`)


            

            }
        })




    })

    $(this).on('click', '#createButton', function () {
        var anrede = $('#anrede').val('')
        var vorname = $('#vorname').val('')
        var nachname = $('#nachname').val('')
        var email = $('#email').val('')
        var telefon = $('#telefon').val('')
        var handy = $('#handy').val('')
        var firma = $('#createPerson').find('#companiesSelectMenu').find('#company').val('')

        $.ajax({
            url: 'companies',
            method: 'GET',
            success: function (response) {
                var selectMenuHtml = `<select class="form-control" name="companies" id="company">
                <option value="">Bitte auswählen:</option>`;

                $.each(response.companies, function () {
                    selectMenuHtml = selectMenuHtml + ` <option value="${this.id}">${this.name}</option>`
                })

                selectMenuHtml = selectMenuHtml + `</select>`
                $('#createPerson').find('#companiesSelectMenu').find('#company').remove()

                $('#createPerson').find('#companiesSelectMenu').append(selectMenuHtml)


            }
        })

    })


    $(this).on('click', '#saveNewButton', function () {

        var anrede = $('#anrede').val()
        var vorname = $('#vorname').val()
        var nachname = $('#nachname').val()
        var email = $('#email').val()
        var telefon = $('#telefon').val()
        var handy = $('#handy').val()
        var firma = $('#createPerson').find('#companiesSelectMenu').find('#company').val()

        console.log(vorname)
        $.ajax({
            url: 'persons/create',
            method: 'POST',
            data: {
                'anrede': anrede,
                'vorname': vorname,
                'nachname': nachname,
                'email': email,
                'telefon': telefon,
                'handy': handy,
                'firma': firma,

            },

            success: function (response) {

                var latestAddedRowId = $('tbody').find('tr').first()
                console.log(latestAddedRowId)
                $('body').removeClass('modal-open')

                $('.modal-backdrop').remove()



                var person = response.latestPerson


                personHtml = `<tr class="tr latestRow"data-id="${person.id}" class="tr">
                <td class="foto"><div class="imgAndBtnContainer"><button class="btn-sm btn-danger imageDeleteBtn" data-id="${person.id}">x</button><img class=" personPic img-thumbnail" src="/image/show/${person.id}"/></div>
          
                </td>
                <td  class="anrede">${person.anrede}</td>
                <td class="vorname">${person.vorname}</td>
                <td class="nachname">${person.nachname}</td>
                <td class="email">${person.email}</td>
                <td class="telefon">${person.telefon}</td>
                <td class="handy">${person.handy}</td>
                <td value="${typeof person.firma.id !== 'undefined' ? person.firma.id : ''}"class="firma"><a href="companies/details/${person.firma.id}">${person.firma.name}</a></td>
                <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                </tr>`

                $('tbody').find('tr').first().before(personHtml)
                var textColor = $('tbody').find('tr').first().css('color');
                var backgroundColor = $('tbody').find('tr').first().css('backgroundColor')

                $('.latestRow').css({
                    'background-color': 'green',
                    'color': '#fff'
                });

                setTimeout(function () {

                    $('.latestRow').css({
                        'background-color': backgroundColor,
                        'color': textColor
                    });

                    $('.latestRow').removeClass('.latestRow')

                }, 500);


            }
        })
    })


    $(this).on('mouseover','.imgAndBtnContainer', function(){
       $(this).find('.imageDeleteBtn').css('display', 'block')
    })


    $(this).on('mouseleave','.imgAndBtnContainer', function(){
        $(this).find('.imageDeleteBtn').css('display', 'none')
     })


     $(this).on('click', '.imageDeleteBtn', function(){
         var personId = $(this).data('id')

         $.ajax({
            cache:false,
            url:'image/delete',
            method:'POST',
            data:{'personId':personId},
            success:function(response){
                $("tr[data-id='" + personId + "']").find('.foto').html(`<img class=" personPic img-thumbnail" src="/image/show/${personId}"/>`)
            }
        })



     })

})
