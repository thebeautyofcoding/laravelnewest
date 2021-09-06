<div class="modal" id="createPerson" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Erstelle einen neuen Personeneintrag</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <input type="hidden" >
          <input type="text" placeholder="Anrede..." id="anrede"class="form-control mb-3 anrede">
        <input type="text" placeholder="Vorname..."id="vorname"class="form-control mb-3 vorname" >
        <input type="text" placeholder="Nachname..."id="nachname"class="form-control mb-3 nachname" >
        <input type="text" placeholder="Email..."id="email"class="form-control mb-3 email" >
        <input type="text"placeholder="Telefon..." id="telefon"class="form-control mb-3 telefon"  >
        <input type="text"placeholder="Handy..." id="handy"class="form-control mb-3 handy"  >


<div id="companiesSelectMenu">

</div>
      </div>
      <div class="modal-footer">
        <button type="button"  data-dismiss="modal" id="saveNewButton" data-target="#createPerson" class="btn btn-primary ">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
