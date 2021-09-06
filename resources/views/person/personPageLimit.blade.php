
<div class="d-flex align-items-center">
<h4 class="text-nowrap d-flex align-items-center mr-3 ">Bitte Seitenlimit auswählen: </h3>
<select name="ajaxPageLimit" class="form-control" id="ajaxPageLimit">
  <option id="currentLimit" value="">Bitte auswählen:</option>
  @foreach ($limits as $limit)
    <option value="{{$limit}}">{{$limit}}</option>
@endforeach
</select>

</div>