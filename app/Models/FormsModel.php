<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormsModel extends Model
{
    protected $table = 'forms';
    public $primaryKey = 'id';
    protected $fillable = [
        'title',
        'description',
        'user_id',
        'slug',
        'is_published',
        'content',
    ];
    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'content' => 'array',
        ];
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
