
@extends('layouts.app')
@section('content')
<table id="myTable" class="table table-striped">
  <thead>
    <tr id="trHeader" >
      <th scope="col">Firmenname</th>
      <th scope="col">Unterzeile</th>
      <th scope="col">Strasse</th>
      <th scope="col">Hausnummer</th>
      <th scope="col">Plz</th>
      <th scope="col">Ort</th>
      <th scope="col">Telefon</th>
      <th scope="col">Fax </th>
      <th scope="col">Web </th>
      @auth
      <th scope="col">Zum Löschen markieren </th>
      @endauth
    </tr>
  </thead>
  <tbody>
@foreach($companies as $company)
    <tr class="tr" data-id="{{$company->id}}">

      <td class="name">{{$company->name}}</td>
      <td class="unterzeile">{{$company->unterzeile}}</td>
      <td class="strasse">{{$company->strasse}}</td>
      <td class="hausnummer">{{$company->hausnummer}}</td>
      <td class="plz">{{$company->plz}}</td>
      <td class="ort">{{$company->ort}}</td>
      <td class="telefon">{{$company->telefon}}</td>
      <td class="fax">{{$company->fax}}</td>
      <td class="web">{{$company->web}}</td>


      

    @auth
      <td><a   class="btn btn-primary" href="/companies/edit/{{$company->id}}">Updaten</a><td>
 
      <td ><input class="companiesToDeleteCheckbox" type="checkbox" name="deleteCompanies" value="{{$company->id}}"></td>@endauth
    </tr>

@endforeach

  </tbody>

</table>
@auth
<div class="d-flex justify-content-center align-items-center mb-2" id="NewAndDeleteButtonContainer">
                    <a class="btn btn-primary m-3" href="create" >New Company</a>
                    <button class="btn btn-danger ml-2" id="deleteCompanies" >Löschen</button>


                </div>@endauth


<div class="d-flex justify-content-center mb-5"id="paginationContainer">

    {{$companies->links()}}

</div>

@endsection