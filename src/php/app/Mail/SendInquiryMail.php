<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendInquiryMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $body;
    protected $name;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name,$body)
    {
        $this->name = $name;
        $this->body = $body;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Send Inquiry Mail',
            from: 'hello@example.com',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'mails.inquiry',
            with: [
                'body' => $this->body,
                'user' => $this->name,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
