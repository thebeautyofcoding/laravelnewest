<!-- Stored in resources/views/layouts/app.blade.php -->

<html>

    <head>
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <script src="https://unpkg.com/mustache@latest" type="module"></script>


    <script src="{{ asset('/js/jQuery.js') }}" ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.2/min/dropzone.min.js" ></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <link href="{{ asset('/css/app.css') }}" rel="stylesheet" type="text/css" >
    <link href="  https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.2/dropzone.css" rel="stylesheet" type="text/css" >

    <link href="{{ asset('/css/customCss.css') }}" rel="stylesheet" type="text/css" >




    </head>

    <body>
   <script src="{{ asset('/js/DropZoneJs.js') }}" ></script>
  <script src="{{ asset('/js/personsTableJQuery.js') }}" ></script>

  <script src="{{ asset('/js/companiesTableJQuery.js') }}" ></script>
 @include('partials.navigation')

@yield('content')


    </body>
</html>

