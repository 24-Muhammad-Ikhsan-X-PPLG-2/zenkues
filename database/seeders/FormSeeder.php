<?php

namespace Database\Seeders;

use App\Models\FormsModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public static function run(): void
    {
        FormsModel::query()->create([
            'title' => 'Customer Satisfaction Survey',
            'description' => 'A survey to gauge customer satisfaction levels.',
            'user_id' => 2,
            'slug' => 'customer-satisfaction-survey',
            'is_published' => true,
            'content' => [
                'questions' => [
                    [
                        'type' => 'options',
                        'question' => 'How satisfied are you with our service?',
                        'options' => [
                            'Very Satisfied',
                            'Satisfied',
                            'Neutral',
                            'Dissatisfied',
                            'Very Dissatisfied',
                        ],
                    ],
                    [
                        'type' => 'text',
                        'question' => 'What can we do to improve?',
                    ],
                ],
            ],
        ]);
    }
}
