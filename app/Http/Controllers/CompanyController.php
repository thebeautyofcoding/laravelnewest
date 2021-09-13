<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Person;
use App\Models\Company;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Response;
class CompanyController extends Controller
{
    public function all()
    {
        $companies = Company::all();
        return response()->json([
            'companies' => $companies,
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function paginate(Request $request)
    {
        $currentPage = $request->query('page');
        // $ajaxPageLimit = $request->input('ajaxPageLimit');
        $companies = Company::orderBy('id', 'DESC')->paginate(10);

        return view('company.companies', ['companies' => $companies]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('company.create', []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newCompany = new Company([
            'name' => $request->name,
            'unterzeile' => $request->unterzeile,
            'strasse' => $request->strasse,
            'hausnummer' => $request->hausnummer,
            'plz' => $request->plz,
            'ort' => $request->ort,
            'telefon' => $request->telefon,
            'fax' => $request->fax,
            'web' => $request->web,
        ]);
        $newCompany->save();
        return redirect('companies/paginate');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $company = Company::find($id);

        $personsWorkingForCompany = $company->person;

        $totalPersonCountCompany = $personsWorkingForCompany->count();

        return view('company.details', [
            'persons' => $personsWorkingForCompany,
            'company' => $company,
            'totalPersons' => $totalPersonCountCompany,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *s
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $companyToEdit = DB::table('firmen')
            ->where('id', '=', $id)
            ->first();

        return view('company.edit', [
            'company' => $companyToEdit,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $person = Company::find($request->id)->update([
            'name' => $request->name,
            'unterzeile' => $request->unterzeile,
            'strasse' => $request->strasse,
            'hausnummer' => $request->hausnummer,
            'plz' => $request->plz,
            'ort' => $request->ort,
            'telefon' => $request->telefon,
            'fax' => $request->fax,
            'web' => $request->web,
        ]);
        return redirect('companies/paginate');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        DB::table('firmen')
            ->whereIn('id', $request->companiesToDelete)
            ->delete();

        return \Response::json(
            [
                'message' => 'SUCCESS',
            ],
            200
        );
    }
}
