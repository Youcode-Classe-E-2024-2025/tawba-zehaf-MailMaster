<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $subject }}</title>
</head>
<body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #333;">{{ $subject }}</h1>
        
        <div style="margin: 20px 0; line-height: 1.6;">
            {!! nl2br(e($content)) !!}
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>You received this email because you subscribed to our newsletter.</p>
            <p>
                <a href="{{ $unsubscribeUrl }}" style="color: #666;">Unsubscribe</a> |
                <a href="{{ $preferencesUrl }}" style="color: #666;">Manage Preferences</a>
            </p>
        </div>
    </div>
</body>
</html> 