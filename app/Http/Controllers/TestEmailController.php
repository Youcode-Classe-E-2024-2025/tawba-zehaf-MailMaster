<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewsletterMail;

class TestEmailController extends Controller
{
    public function sendTestEmail()
    {
        try {
            $testEmail = 'test@example.com';
            $subject = 'Test Newsletter';
            $content = '<h1>Welcome to MailMaster!</h1><p>This is a test email to verify that your email configuration is working correctly.</p>';
            $unsubscribeUrl = route('unsubscribe', ['email' => $testEmail]);
            $preferencesUrl = route('preferences', ['email' => $testEmail]);

            Mail::to($testEmail)->send(new NewsletterMail(
                $subject,
                $content,
                $unsubscribeUrl,
                $preferencesUrl
            ));

            return response()->json([
                'message' => 'Test email sent successfully',
                'email' => $testEmail
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to send test email',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
