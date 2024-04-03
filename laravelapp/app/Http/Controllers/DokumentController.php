<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dokument;
 
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DokumentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $dokumenti = Dokument::all();
        return response()->json(['data' => $dokumenti]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'document_type' => 'required|string',
            'document_number' => 'required|string',
            'file' => 'required|file|mimes:pdf,jpeg,png,gif,doc,docx|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $file = $request->file('file');
        $path = $file->store('dokumenti');

        $dokument = Dokument::create([
            'user_id' => $request->user_id,
            'document_type' => $request->document_type,
            'document_number' => $request->document_number,
            'file_path' => $path,
        ]);

        return response()->json(['data' => $dokument], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $dokument = Dokument::findOrFail($id);
        return response()->json(['data' => $dokument]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $dokument = Dokument::findOrFail($id);
        
        // Brisanje fajla iz storage-a
        Storage::delete($dokument->file_path);

        $dokument->delete();

        return response()->json(['message' => 'Document deleted successfully']);
    }
}
