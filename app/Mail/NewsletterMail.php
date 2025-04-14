<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewsletterMail extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $content;
    public $unsubscribeUrl;
    public $preferencesUrl;

    public function __construct($subject, $content, $email)
    {
        $this->subject = $subject;
        $this->content = $content;
        $this->unsubscribeUrl = route('unsubscribe', ['email' => $email]);
        $this->preferencesUrl = route('preferences', ['email' => $email]);
    }

    public function envelope()
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    public function content()
    {
        return new Content(
            view: 'emails.newsletter',
            with: [
                'content' => $this->content,
                'unsubscribeUrl' => $this->unsubscribeUrl,
                'preferencesUrl' => $this->preferencesUrl,
            ],
        );
    }
}
