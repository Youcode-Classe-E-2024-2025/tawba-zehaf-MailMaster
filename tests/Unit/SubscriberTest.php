<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SubscriberTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_subscriber()
    {
        $subscriber = Subscriber::factory()->create([
            'email' => 'test@example.com',
            'status' => 'active'
        ]);

        $this->assertInstanceOf(Subscriber::class, $subscriber);
        $this->assertEquals('test@example.com', $subscriber->email);
        $this->assertEquals('active', $subscriber->status);
    }

    public function test_email_must_be_unique()
    {
        Subscriber::factory()->create(['email' => 'test@example.com']);

        $this->expectException(\Illuminate\Database\QueryException::class);

        Subscriber::factory()->create(['email' => 'test@example.com']);
    }

    public function test_status_must_be_valid()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        Subscriber::factory()->create(['status' => 'invalid_status']);
    }

    public function test_can_activate_subscriber()
    {
        $subscriber = Subscriber::factory()->create(['status' => 'inactive']);

        $subscriber->activate();

        $this->assertEquals('active', $subscriber->status);
    }

    public function test_can_deactivate_subscriber()
    {
        $subscriber = Subscriber::factory()->create(['status' => 'active']);

        $subscriber->deactivate();

        $this->assertEquals('inactive', $subscriber->status);
    }

    public function test_can_get_active_subscribers()
    {
        Subscriber::factory()->create(['status' => 'active']);
        Subscriber::factory()->create(['status' => 'active']);
        Subscriber::factory()->create(['status' => 'inactive']);

        $activeSubscribers = Subscriber::active()->get();

        $this->assertCount(2, $activeSubscribers);
        $activeSubscribers->each(function ($subscriber) {
            $this->assertEquals('active', $subscriber->status);
        });
    }
}
