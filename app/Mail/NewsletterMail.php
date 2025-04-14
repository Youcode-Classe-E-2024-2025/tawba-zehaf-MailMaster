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

    public function __construct($subject, $content, $unsubscribeUrl, $preferencesUrl)
    {
        $this->subject = $subject;
        $this->content = $content;
        $this->unsubscribeUrl = $unsubscribeUrl;
        $this->preferencesUrl = $preferencesUrl;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.newsletter',
            with: [
                'subject' => $this->subject,
                'content' => $this->content,
                'unsubscribeUrl' => $this->unsubscribeUrl,
                'preferencesUrl' => $this->preferencesUrl,
            ],
        );
    }
}
