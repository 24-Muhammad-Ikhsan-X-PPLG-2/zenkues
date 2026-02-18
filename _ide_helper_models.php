<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string|null $description
 * @property string $slug
 * @property array<array-key, mixed> $content
 * @property bool $is_published
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel whereIsPublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FormsModel whereUserId($value)
 */
	class FormsModel extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string|null $avatar
 * @property string $email
 * @property string $provider
 * @property \Carbon\CarbonImmutable|null $email_verified_at
 * @property string|null $organization
 * @property string|null $bio
 * @property string $password
 * @property string $settings
 * @property string|null $remember_token
 * @property \Carbon\CarbonImmutable|null $created_at
 * @property \Carbon\CarbonImmutable|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\FormsModel> $forms
 * @property-read int|null $forms_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereBio($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereOrganization($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereProvider($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

