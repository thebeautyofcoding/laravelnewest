
@extends('layouts.app')
@section('content')



<h3 class="container mt-5 mb-5 d-flex justify-content-center">Detailseite der Firma "{{$company->name}}":</h3>


<table id="myTable" class="table table-striped  mt-5 mb-5">
  <thead>
    <tr id="trHeader" >
   
      <th scope="col">Unterzeile</th>
      <th scope="col">Strasse</th>
      <th scope="col">Hausnummer</th>
      <th scope="col">Plz</th>
      <th scope="col">Ort</th>
      <th scope="col">Telefon</th>
      <th scope="col">Fax </th>
      <th scope="col">Web </th>
  

    </tr>
  </thead>
  <tbody>

    <tr class="tr" data-id="{{$company->id}}">

      
      <td class="unterzeile">{{$company->unterzeile}}</td>
      <td class="strasse">{{$company->strasse}}</td>
      <td class="hausnummer">{{$company->hausnummer}}</td>
      <td class="plz">{{$company->plz}}</td>
      <td class="ort">{{$company->ort}}</td>
      <td class="telefon">{{$company->telefon}}</td>
      <td class="fax">{{$company->fax}}</td>
      <td class="web">{{$company->web}}</td>


      


      
    </tr>

  </tbody>

</table>

<h3 class="container mt-5 mb-5 d-flex justify-content-center">In der Firma "{{$company->name}}" sind {{$totalPersons}} Personen angestellt:</h3>
<table id="myTable" class="table table-striped">
  <thead>
    <tr id="trHeader" >
      <th scope="col">Anrede</th>
      <th scope="col">Vorname</th>
      <th scope="col">Nachname</th>
      <th scope="col">Email</th>
      <th scope="col">Telefon</th>
      <th scope="col">Handy</th>
 
      

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


     




@endforeach

  </tbody>

</table>




<div class="d-flex justify-content-center mb-5"id="paginationContainer">

</div>

@endsection