<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\CompanyController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/persons', [PersonController::class, 'listPersons']);
Route::get('/personsSearch', [PersonController::class, 'ajaxSearchAction']);



Route::get('/ajax/persons', [PersonController::class, 'ajaxListPersons']);



Route::post('/personsDelete', [PersonController::class, 'delete']);

Route::patch('/persons/edit', [PersonController::class, 'edit']);

Route::get('/companies', [CompanyController::class, 'all']);

Route::post('/persons/create', [PersonController::class, 'create']);

Route::get('/persons/{id}', [PersonController::class, 'showPerson']);

Route::get('/companies/paginate', [CompanyController::class, 'paginate']);

Route::get('/companies/edit/{id}', [CompanyController::class, 'edit']);


Route::get('/companies/details/{id}', [CompanyController::class, 'show']);

Route::get('/companies/create', [CompanyController::class, 'create'])->name('company.create');
Route::post('/companies/store', [CompanyController::class, 'store'])->name('company.store');


Route::post('/companiesDelete', [CompanyController::class, 'destroy']);
Route::patch('/companies/update', [CompanyController::class, 'update'])->name('company.update');





Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
