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
        Schema::table('users', function (Blueprint $table) {
            $table->string('jmbg')->nullable();
            $table->string('br_lk')->nullable();
            $table->string('adresa')->nullable();
            $table->string('kontakt')->nullable();
            $table->string('uloga')->default('user'); //user,admin
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('jmbg');
            $table->dropColumn('br_lk');
            $table->dropColumn('adresa');
            $table->dropColumn('kontakt');
            $table->dropColumn('uloga');
        });
    }
};
