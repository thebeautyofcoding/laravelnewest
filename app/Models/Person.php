<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $table = 'persons';
    protected $fillable = [
        'anrede',
        'vorname',
        'nachname',
        'email',
        'telefon',
        'handy',
        'firma',
        'photo',
    ];
    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'firma');
    }

    public function photos()
    {
        return $this->belongsTo('App\Models\Photo', 'photo');
    }
}
