<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('autos', function (Blueprint $table) {
            $table->id();
            $table->string('marka');
            $table->string('model');
            $table->integer('godina_proizvodnje');
            $table->string('boja');
            $table->integer('broj_vrata');
            $table->string('prenos');
            $table->string('registraciona_oznaka');
            $table->date('istek_registracije');
            $table->integer('maksimalan_broj_putnika');
            $table->decimal('cena_po_danu', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('autos');
    }
};
