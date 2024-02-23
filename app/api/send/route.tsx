import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const { name, email } = await req.json();
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'saimcishon@gmail.com',
                pass: 'cvjb wqxu gvtl ripr',
            },
        });

        const emailTemplate = `
      <div>
        <div style="text-align: center;
        padding: 30px;
        border-radius: 10px;
        background-color: #fff;">
            <img src="https://kvcvdthsaepnfxzhvtmy.supabase.co/storage/v1/object/public/imagenes/logo.png" alt="Imagen" style="width: 200px; height: auto; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h1 style="color: deepskyblue; border-top: 0;">¡Hola! <span>${name}</span></h1>
            <p style="color: black">Estas son tus credenciales de inicio de sesion:</p>
            <p style="color: black"><strong>Correo: </strong>${email}</p>
            <p style="color: black"><strong>Contraseña: </strong>${generarContrasena()}</p>
            <p style="color: black">**Te recomendamos cambiar la contraseña cuando inicies sesion**</p>
            <a href="#" style="display: inline-block; padding: 15px 30px; font-size: 18px; text-decoration: none; background-color: deepskyblue; color: #fff; border-radius: 8px; transition: background-color 0.3s ease; cursor: pointer; margin-top: 20px;" target="_blank">Haz clic aquí</a>
        </div>
      </div>
    `;

        const mailOptions = {
            from: 'saimcishon@gmail.com',
            to: email,
            subject: 'Correo de prueba',
            html: emailTemplate
        };

        // Enviar el correo electrónico
        const info = await transporter.sendMail(mailOptions);

        console.log('Correo electrónico enviado:', info);
        return Response.json(info)
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        return Response.json(error)
    }

}

const generarContrasena = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
  
    for (let i = 0; i < 6; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indiceAleatorio);
    }
  
    return resultado;
  };