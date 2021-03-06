<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Person;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Validator;
use Redirect;
class PersonController extends Controller
{
    public function listPersons(Request $request)
    {
        $limit = 5;
        $persons = Person::orderBy('id', 'DESC')->paginate($limit);

        $totalNumberOfPersons = Person::all()->count();
        $totalNumberOfPages = ceil($totalNumberOfPersons / $limit);
        $arrayWithPageNumbers = [];
        foreach (range(1, $totalNumberOfPages) as $index) {
            $arrayWithPageNumbers[] = (int) $index;
        }
        $linksShown = 3;
        $currentPage = 1;
        $nextPage = $currentPage + 1;
        $previousPage = $currentPage - 1;

        $visiblePages = [];
        for (
            $x = $currentPage - $linksShown;
            $x < $currentPage + $linksShown + 1;
            ++$x
        ) {
            if ($x > 0 && $x <= $totalNumberOfPages) {
                $visiblePages[] = $x;
            }
        }
        $lastPage = end($arrayWithPageNumbers);
        if ($lastPage == $currentPage) {
            $isLastPage = true;
        } else {
            $isLastPage = false;
        }

        if ($arrayWithPageNumbers['0'] == $currentPage) {
            $isFirstPage = true;
        } else {
            $isFirstPage = false;
        }

        $limits = [1, 2, 5, 10];
        return view('person.persons', [
            'persons' => $persons,
            'total' => $visiblePages,
            'visible' => $visiblePages,
            'currentPage' => $currentPage,

            'previousPage' => $previousPage,
            'nextPage' => $nextPage,
            'isFirstPage' => $isFirstPage,
            'isLastPage' => $isLastPage,
            'limits' => $limits,
        ]);
    }

    public function ajaxListPersons(Request $request)
    {
        $currentPage = $request->query('page');

        $ajaxPageLimit = $request->input('ajaxPageLimit');
        $query = $request->input('query');
        $personProperty = $request->input('personProperty');
        if (isset($currentPage)) {
            $currentPage = (int) $currentPage;
        } else {
            $currentPage = 1;
        }
        $ajaxPageLimit = $request->input('ajaxPageLimit');
        if (isset($ajaxPageLimit)) {
            $limit = $ajaxPageLimit;
        } else {
            $limit = 5;
        }

        $offset = $currentPage * $limit;

        $persons = Person::orderBy('id', 'DESC')->paginate($limit);

        $totalNumberOfPersons = Person::all()->count();
        $totalNumberOfPages = ceil($totalNumberOfPersons / $limit);
        $arrayWithPageNumbers = [];
        foreach (range(1, $totalNumberOfPages) as $index) {
            $arrayWithPageNumbers[] = (int) $index;
        }
        $linksShown = 3;

        $nextPage = $currentPage + 1;
        $previousPage = $currentPage - 1;

        $visiblePages = [];
        for (
            $x = $currentPage - $linksShown;
            $x < $currentPage + $linksShown + 1;
            ++$x
        ) {
            if ($x > 0 && $x <= $totalNumberOfPages) {
                $visiblePages[] = $x;
            }
        }

        $lastPage = end($arrayWithPageNumbers);
        if ($lastPage == $currentPage) {
            $isLastPage = true;
        } else {
            $isLastPage = false;
        }

        if ($arrayWithPageNumbers['0'] == $currentPage) {
            $isFirstPage = true;
        } else {
            $isFirstPage = false;
        }

        foreach ($persons as $person) {
            $person->firma = $person->company;
        }
        $limits = [1, 2, 5, 10];
        return response()->json([
            'persons' => $persons,
            'total' => $visiblePages,
            'currentPage' => $currentPage,
            'previousPage' => $previousPage,
            'nextPage' => $nextPage,
            'isFirstPage' => $isFirstPage,
            'isLastPage' => $isLastPage,
            'limits' => $limits,
        ]);
    }

    public function ajaxSearchAction(Request $request)
    {
        $currentPage = $request->query('page');
        $query = $request->input('query');
        $personProperty = $request->query('personProperty');
        $ajaxPageLimit = $request->query('ajaxPageLimit');

        if (isset($currentPage)) {
            $currentPage = (int) $currentPage;
        } else {
            $currentPage = 1;
        }
        $ajaxPageLimit = $request->query('ajaxPageLimit');
        if (isset($ajaxPageLimit)) {
            $limit = $ajaxPageLimit;
        } else {
            $limit = 5;
        }

        $offset = $currentPage * $limit;
        $persons = null;
        if ($query) {
            $persons = Person::where(
                $personProperty,
                'LIKE',
                '%' . $query . '%'
            )->paginate($limit);
        } else {
            
            $persons = Person::paginate($limit);
         
        }

        $totalNumberOfPersons = DB::table('persons')
            ->where($personProperty, 'LIKE', '%' . $query . '%')
            ->count();
        $totalNumberOfPages = ceil($totalNumberOfPersons / $limit);
        $arrayWithPageNumbers = [];
        foreach (range(1, $totalNumberOfPages) as $index) {
            $arrayWithPageNumbers[] = (int) $index;
        }
        $linksShown = 3;

        $nextPage = $currentPage + 1;
        $previousPage = $currentPage - 1;

        $visiblePages = [];
        for (
            $x = $currentPage - $linksShown;
            $x < $currentPage + $linksShown + 1;
            ++$x
        ) {
            if ($x > 0 && $x <= $totalNumberOfPages) {
                $visiblePages[] = $x;
            }
        }

        $lastPage = (int)end($arrayWithPageNumbers);
      
        if ($lastPage == $currentPage) {
            $isLastPage = true;
        } else {
            $isLastPage = false;
        }

        if ($arrayWithPageNumbers[0] == $currentPage) {
            $isFirstPage = true;
        } else {
            $isFirstPage = false;
        }

        foreach ($persons as $person) {
            $person->firma = $person->company;
        }

        $limits = [1, 2, 5, 10];
        return response()->json([
            'persons' => $persons,
            'total' => $visiblePages,
            'currentPage' => $currentPage,
            'previousPage' => $previousPage,
            'nextPage' => $nextPage,
            'isFirstPage' => $isFirstPage,
            'isLastPage' => $isLastPage,
            'limits' => $limits,
        ]);
    }

    public function delete(Request $request)
    {
        DB::table('persons')
            ->whereIn('id', $request->personsToDelete)
            ->delete();
    }

    public function edit(Request $request)
    {
        $person = Person::find($request->id)->update([
            'anrede' => $request->anrede,
            'vorname' => $request->vorname,
            'nachname' => $request->nachname,
            'email' => $request->email,
            'telefon' => $request->telefon,
            'handy' => $request->handy,
            'firma' => (int) $request->firma,
            'photo' => (int) $request->photo,
        ]);

        $updatedPerson = Person::find($request->id);
        $updatedPerson->firma = $updatedPerson->company;
        return response()->json([
            'updatedPerson' => $updatedPerson,
        ]);
    }

    public function create(Request $request)



    {

      $validePersonData=$request->validate([
          'anrede'=>['required'],
          'vorname'=>['required'],
          'nachname'=>['required'],
          'email'=>['required'],
          'telefon'=>['required'],
          'handy'=>['required'],
          'firma'=>['required'],
      ]);

      
   
        $person = new Person($request->all());


        
        $person->save();

        $person = Person::all()->last();

        $person->firma = $person->company;

        return response()->json([
            'message' => 'SUCCESS',
            'latestPerson' => $person,
        ]);
    }

    public function showPerson($id)
    {
        $person = Person::find($id);

        return response()->json([
            'person' => $person,
        ]);
    }
}
