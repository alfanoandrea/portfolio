import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Funzione di utilità per eseguire l'escaping dell'HTML
function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') {
        // Assicurati che non sia null o undefined, e se non è una stringa la converti
        unsafe = String(unsafe); 
    }
    return unsafe.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
}

export async function POST(request) {
    const data = await request.json();
    
    // 1. Escaping dei dati dell'utente PRIMA dell'interpolazione
    const name = escapeHtml(data.name);
    const email = escapeHtml(data.email);
    const message = escapeHtml(data.message);

    // Configurazione del trasportatore Nodemailer
    // IMPORTANTE: Usa le variabili d'ambiente per le credenziali
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Esempio: server SMTP di Gmail
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Invia l'email a te stesso
            // Escapa anche il subject, per sicurezza, anche se Nodemailer di solito lo fa
            subject: `Nuovo messaggio da ${name}`, 
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
                    <h3 style="color: #1f2937;">Nuovo Contatto Ricevuto</h3>
                    <p style="margin-top: 15px;"><strong>Nome:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
                    <p style="margin-top: 20px;"><strong>Messaggio:</strong></p>
                    <!-- Usiamo <pre> per preservare spazi e a capo del messaggio, ma i contenuti sono già escapati -->
                    <pre style="white-space: pre-wrap; background-color: #f3f4f6; padding: 10px; border-radius: 4px; border-left: 3px solid #3b82f6; color: #1f2937;">${message}</pre>
                </div>
            `,
        };
        
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email inviata con successo' }, { status: 200 });

    } catch (error) {
        console.error("Nodemailer Error:", error);
        return NextResponse.json({ message: 'Errore nell\'invio dell\'email' }, { status: 500 });
    }
}
