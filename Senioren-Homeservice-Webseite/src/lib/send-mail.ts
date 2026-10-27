type MailInput = {
    to: string
    cc?: string
    replyTo?: string
    subject: string
    text: string
}

/** Versendet über die Resend-HTTP-API. Gibt false zurück, wenn nicht konfiguriert oder fehlgeschlagen. */
export async function sendMail(input: MailInput): Promise<boolean> {
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.MAIL_FROM

    if (!apiKey || !from) return false

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from,
                to: [input.to],
                cc: input.cc ? [input.cc] : undefined,
                reply_to: input.replyTo || undefined,
                subject: input.subject,
                text: input.text,
            }),
        })

        if (!response.ok) {
            console.error('Mailversand fehlgeschlagen:', response.status, await response.text())
            return false
        }
        return true
    } catch (error) {
        console.error('Mailversand fehlgeschlagen:', error)
        return false
    }
}
