

@extends('layouts.app')

<form class="container" action="{{route('company.store')}}" method="POST" >
@csrf

  <div class="form-group">
    <label for="name">Firmenname</label>
    <input type="hidden" class="form-control" name="id" id="name" aria-describedby="emailHelp" placeholder="Enter Firmenname"/>
    <input type="text" class="form-control" name="name" id="name" aria-describedby="emailHelp" placeholder="Enter Firmenname"/>

  </div>
  <div class="form-group">
    <label for="unterzeile">Unterzeile</label>

    <input type="text" class="form-control" name="unterzeile" id="unterzeile" aria-describedby="emailHelp" placeholder="Enter Unterzeile"/>

  </div>
  <div class="form-group">
    <label for="strasse">Straße</label>

    <input type="text" class="form-control" name="strasse" id="strasse" aria-describedby="emailHelp" placeholder="Enter Strasse"/>

  </div>
  <div class="form-group">
    <label for="hausnummer">Hausnummer</label>

    <input type="text" class="form-control" id="hausnummer"name="hausnummer" aria-describedby="emailHelp" placeholder="Enter Hausnummer"/>

  </div>
  <div class="form-group">
    <label for="plz">Plz</label>

    <input type="text" class="form-control" name="plz" id="plz" aria-describedby="emailHelp" placeholder="Enter Plz"/>

  </div>
  <div class="form-group">
    <label for="ort">Ort</label>

    <input type="text" class="form-control" id="ort"name="ort" aria-describedby="emailHelp" placeholder="Enter Ort"/>

  </div>
  <div class="form-group">
    <label for="telefon">Telefon</label>

    <input type="text" class="form-control" id="telefon"name="telefon" aria-describedby="emailHelp" placeholder="Enter Telefon">

  </div>
  <div class="form-group">
    <label for="fax">Fax</label>

    <input type="text" class="form-control" id="fax"name="fax" aria-describedby="emailHelp" placeholder="Enter fax"/>

  </div>
  <div class="form-group">
    <label for="web">Web</label>

    <input type="text" class="form-control"  name="web" id="web" aria-describedby="emailHelp" placeholder="Enter email"/>

  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>

