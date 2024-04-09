<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dokument;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DokumentController extends Controller
{
    public function index()
    {
        $user = Auth::user(); // Dobij trenutno ulogovanog korisnika
        $dokumenti = Dokument::where('user_id', $user->id)->get();
        return response()->json(['data' => $dokumenti]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'document_type' => 'required|string',
            'document_number' => 'required|string',
            'file' => 'required|file|mimes:pdf,jpeg,png,gif,doc,docx|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = Auth::user(); // Dobij trenutno ulogovanog korisnika
        $file = $request->file('file');
        $path = $file->store('dokumenti');

        $dokument = Dokument::create([
            'user_id' => $user->id,
            'document_type' => $request->document_type,
            'document_number' => $request->document_number,
            'file_path' => $path,
        ]);

        return response()->json(['data' => $dokument], 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'document_type' => 'required|string',
            'document_number' => 'required|string',
            'file' => 'nullable|file|mimes:pdf,jpeg,png,gif,doc,docx|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dokument = Dokument::findOrFail($id);
        $dokument->update($request->only(['document_type', 'document_number']));

        if ($request->hasFile('file')) {
            Storage::delete($dokument->file_path);
            $file = $request->file('file');
            $path = $file->store('dokumenti');
            $dokument->file_path = $path;
            $dokument->save();
        }

        return response()->json(['data' => $dokument]);
    }

    public function destroy($id)
    {
        $dokument = Dokument::findOrFail($id);
        
        // Brisanje fajla iz storage-a
        Storage::delete($dokument->file_path);

        $dokument->delete();

        return response()->json(['message' => 'Document deleted successfully']);
    }
}
