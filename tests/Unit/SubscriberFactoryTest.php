<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

class SubscriberFactoryTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Ensure we're using the testing database
        config(['database.default' => 'testing']);
    }

    public function test_can_create_single_subscriber()
    {
        $subscriber = Subscriber::factory()->create();

        $this->assertInstanceOf(Subscriber::class, $subscriber);
        $this->assertDatabaseHas('subscribers', [
            'id' => $subscriber->id,
            'email' => $subscriber->email
        ]);
    }

    public function test_can_create_subscriber_with_specific_attributes()
    {
        $subscriber = Subscriber::factory()->create([
            'email' => 'test@example.com',
            'status' => 'active'
        ]);

        $this->assertEquals('test@example.com', $subscriber->email);
        $this->assertEquals('active', $subscriber->status);
    }

    public function test_can_create_multiple_subscribers()
    {
        $subscribers = Subscriber::factory()->count(3)->create();

        $this->assertCount(3, $subscribers);
        $this->assertDatabaseCount('subscribers', 3);
    }

    public function test_can_create_active_subscribers()
    {
        $activeSubscribers = Subscriber::factory()
            ->count(2)
            ->active()
            ->create();

        $this->assertCount(2, $activeSubscribers);
        $activeSubscribers->each(function ($subscriber) {
            $this->assertEquals('active', $subscriber->status);
        });
    }

    public function test_can_create_inactive_subscribers()
    {
        $inactiveSubscribers = Subscriber::factory()
            ->count(2)
            ->inactive()
            ->create();

        $this->assertCount(2, $inactiveSubscribers);
        $inactiveSubscribers->each(function ($subscriber) {
            $this->assertEquals('inactive', $subscriber->status);
        });
    }

    public function test_can_make_subscriber_without_saving()
    {
        $subscriber = Subscriber::factory()->make();

        $this->assertInstanceOf(Subscriber::class, $subscriber);
        $this->assertNull($subscriber->id);
        $this->assertDatabaseMissing('subscribers', [
            'email' => $subscriber->email
        ]);
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }
}
