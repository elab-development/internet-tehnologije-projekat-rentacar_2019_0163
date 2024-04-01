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
        Schema::create('rezervacijas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('automobil_id');
            $table->date('datum_od');
            $table->date('datum_do');
            $table->boolean('osiguranje')->default(false);
            $table->decimal('cena', 10, 2);
            $table->text('napomena');
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
        Schema::dropIfExists('rezervacijas');
    }
};
