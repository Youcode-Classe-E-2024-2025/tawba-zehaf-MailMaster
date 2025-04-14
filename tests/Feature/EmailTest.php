<?php

namespace Tests\Feature;

use App\Mail\NewsletterMail;
use App\Models\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class EmailTest extends TestCase
{
    use RefreshDatabase;

    public function test_send_email_to_subscriber()
    {
        $subscriber = Subscriber::factory()->create([
            'email' => 'test@example.com',
            'status' => 'active'
        ]);

        $response = $this->postJson('/api/newsletters/send', [
            'subject' => 'Test Newsletter',
            'content' => 'This is a test newsletter content.'
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Newsletter sent successfully'
            ]);

        Mail::assertSent(NewsletterMail::class, function ($mail) use ($subscriber) {
            return $mail->hasTo($subscriber->email);
        });
    }

    public function test_validation_required_fields()
    {
        $response = $this->postJson('/api/newsletters/send', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['subject', 'content']);
    }

    public function test_only_sends_to_active_subscribers()
    {
        $activeSubscriber = Subscriber::factory()->create([
            'email' => 'active@example.com',
            'status' => 'active'
        ]);

        $inactiveSubscriber = Subscriber::factory()->create([
            'email' => 'inactive@example.com',
            'status' => 'inactive'
        ]);

        $response = $this->postJson('/api/newsletters/send', [
            'subject' => 'Test Newsletter',
            'content' => 'This is a test newsletter content.'
        ]);

        $response->assertStatus(200);

        Mail::assertSent(NewsletterMail::class, function ($mail) use ($activeSubscriber) {
            return $mail->hasTo($activeSubscriber->email);
        });

        Mail::assertNotSent(NewsletterMail::class, function ($mail) use ($inactiveSubscriber) {
            return $mail->hasTo($inactiveSubscriber->email);
        });
    }

    public function test_email_content_is_correct()
    {
        $subscriber = Subscriber::factory()->create([
            'email' => 'test@example.com',
            'status' => 'active'
        ]);

        $subject = 'Test Newsletter';
        $content = 'This is a test newsletter content.';

        $this->postJson('/api/newsletters/send', [
            'subject' => $subject,
            'content' => $content
        ]);

        Mail::assertSent(NewsletterMail::class, function ($mail) use ($subscriber, $subject, $content) {
            return $mail->subject === $subject &&
                $mail->content === $content &&
                $mail->hasTo($subscriber->email);
        });
    }
}
