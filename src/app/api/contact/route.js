// src/app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { name, email, message } = await request.json();

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
      subject: `Nuovo messaggio da ${name}`,
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Messaggio:</strong> ${message}</p>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email inviata con successo' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Errore nell\'invio dell\'email' }, { status: 500 });
  }
}