
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">PersonenUndFirmen</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
    
      <a class="nav-item nav-link active" href="/persons">Personen <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="/companies/paginate">Firmen</a>
      @guest
      <a class="nav-item nav-link" href="/login">Login</a>
      <a class="nav-item nav-link" href="/register">Register</a>
      @endguest
      @auth
      <form method="POST" action="{{ route('logout') }}">
        @csrf
        <button class="btn btn-danger" type="submit">Logout</button>
      </form>
      @endauth
    </div>
  </div>
</nav>

