<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photo;
use App\Models\Person;
use App\Models\Company;
use Illuminate\Support\Facades\Storage;
class ImageUploadController extends Controller
{
    public function fileStore(Request $request)
    {
        $image = $request->file('file');
        $imageName = $image->getClientOriginalName();
        $image = $image->storeAs('/public/images/', $imageName);

        $photo = new Photo();
        $photo->name = $imageName;
        $imagePath = public_path() . '\storage\\' . $imageName;

        $photo->path = $imagePath;
        $photo->save();

        // $hm = $image->move(storage_path() . '\app\public\\' ;
        // dd($hm);

        return response()->json(['photoId' => Photo::all()->last()->id]);
    }
    public function fileDestroy(Request $request)
    {
        $personId = $request->get('personId');
        $person = Person::find($personId);
       
        $imageName=$person->photos->name;
        $person->photos->delete();
        
        $path = storage_path() . '\app\public\images\\' . $imageName;
        if (file_exists($path)) {
            unlink($path);
        }

      
        return $imageName;
    }
    public function show(int $personId)
    {
       
        $person = Person::find($personId);

        if (!$person->photos) {
            return response()->file(
                public_path('storage\\images\\' . 'avatar.jpg')
            );
        } else {
            return response()->file(
                public_path('storage\\images\\' . $person->photos->name)
            );
        }
    }
}
