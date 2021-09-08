
@extends('layouts.app')
@section('content')
<div class="d-flex container ">@include('person.SearchPerson')
@include('person.personPageLimit')</div>

@include('person.PersonCreateModal')
<table id="myTable" class="table table-striped">
  <thead>
    <tr id="trHeader" >
      <th scope="col">Anrede</th>
      <th scope="col">Vorname</th>
      <th scope="col">Nachname</th>
      <th scope="col">Email</th>
      <th scope="col">Telefon</th>
      <th scope="col">Handy</th>
      <th scope="col">Firma</th>
      @auth
      <th scope="col">Updaten </th>
      <th scope="col">Zum Löschen markieren </th>
      @endauth
    </tr>
  </thead>
  <tbody>
@foreach($persons as $person)
    <tr class="tr" data-id="{{$person->id}}">

      <td class="anrede">{{$person->anrede}}</td>
      <td class="vorname">{{$person->vorname}}</td>
      <td class="nachname">{{$person->nachname}}</td>
      <td class="email">{{$person->email}}</td>
      <td class="telefon">{{$person->telefon}}</td>
      <td class="handy">{{$person->handy}}</td>

    
      <td class="firma" value="{{$person->company->id}}"><a href="companies/details/{{$person->company->id}}">{{$person->company->name}}</a></td>
 
      @auth
      <td><button  type="button" class="btn btn-primary update" data-id="{{$person->id}}" >Updaten</button><td>
   @include('person.PersonEditModal')
      <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="{{$person->id}}"></td>@endauth
    </tr>

@endforeach

  </tbody>

</table>
@auth
<div class="d-flex justify-content-center align-items-center mb-2" id="NewAndDeleteButtonContainer">
                    <button class="btn btn-primary m-3" id="createButton"  data-toggle="modal" data-target="#createPerson" >New Person</button>
                    <button class="btn btn-danger ml-2" id="deletePersons" >Löschen</button>


                </div>@endauth


<div class="d-flex justify-content-center mb-5 mt-5"id="paginationContainer">
<nav id="paginationNav" aria-label="Page navigation example">
  <ul class="pagination">
    @if($currentPage===1)
    
    @else
    <li class="page-item"><button id="previousButton" value="{{$previousPage}}" class="page-link">Previous</button></li>
    @endif
  @foreach($total as $page)

    @if($currentPage===$page)

        <li class="page-item disabled"><button class="page-link personPageButton ">{{$page}}</button></li>

    @else
    <li class="page-item"><button class="page-link personPageButton" value="{{$page}}">{{$page}}</button></li>

    @endif


    @endforeach
    <li class="page-item"><button  id="nextButton" value="{{$nextPage}}" class="page-link">Next</button></li>
  </ul>
</nav>
</div>

@endsection

<div id="modalTemplate">
  <div class="modal" data-id="" id="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Editiere</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <input type="hidden"data-id="{=personId=}" id="modal-idHidden" value="">
            <input type="text" class="form-control mb-3 " id="modal-anrede" value="">
            <input type="text" class="form-control mb-3 " id="modal-vorname" value=''>
            <input type="text" class="form-control mb-3 "id="modal-nachname"   value=''>
            <input type="text" class="form-control mb-3 " id="modal-email"  value=''>
            <input type="text" class="form-control mb-3 "id="modal-telefon"   value=''>
            <input type="text" class="form-control mb-3 "id="modal-handy"  value=''>


        <div id="companiesSelectMenu">

        </div>
        </div>
        <div class="modal-footer">
            <button type="button" id="modal-updateButton" data-id="" data-dismiss="modal"  class="btn btn-primary ">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
</div>


</div>