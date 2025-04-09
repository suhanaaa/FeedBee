import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter"; //Acts as a bridge between the auth nad db
import clientPromise from "./libs/mongo";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import Google from "next-auth/providers/google";

const sendVerificationRequest = ({ identifier, url }) => {
  //Transporter connects to SMTP server using env variables and send a verification email to the user with a sign-in link
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 587),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      // Allow self-signed certificates
      rejectUnauthorized: false,
    },
  });

  const { host } = new URL(url);
  return transporter.sendMail({
    from: process.env.SMTP_USER,
    to: identifier,
    subject: `Sign in to ${host}`,
    text: `Sign in to ${host}\n\n${url}\n\n`,
    html: `<p>Sign in to <b>${host}</b></p><p><a href="${url}">Click here to sign in</a></p>`,
  });
};

const config = {
  providers: [
    //EmailProvider is configured with the SMTP settings and the verification function, allowing it to handle email sign-ins and send verification requests seamlessly as part of the authentication process.
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      from: process.env.SMTP_USER,
      sendVerificationRequest,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),

  secret: process.env.AUTH_SECRET,

  //Trusted host

  trustedHosts: [
    "74.208.221.72:3079",
    "rainytools.imshine.one",
    "localhost:3079", // (optional for dev)
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);

// import NextAuth from "next-auth";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"; // bridge the gap between noth db and auth
// import clientPromise from "./libs/mongo";
// import Google from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
// import nodemailer from "nodemailer";

// const sendVerificationRequest = ({ identifier, url }) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: parseInt(process.env.SMTP_PORT, 587),
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false, // Disable certificate validation (not recommended for production)
//     },
//   });

//   const { host } = new URL(url);
//   return transporter.sendMail({
//     from: process.env.SMTP_USER,
//     to: identifier,
//     subject: `Sign in to ${host}`,
//     text: `Sign in to ${host}\n\n${url}\n\n`,
//     html: `<p>Sign in to <b>${host}</b></p><p><a href="${url}">Click here to sign in</a></p>`,
//   });
// };

// const config = {
//   providers: [
//     //EmailProvider is configured with the SMTP settings and the verification function, allowing it to handle email sign-ins and send verification requests seamlessly as part of the authentication process.
//     EmailProvider({
//       server: {
//         host: process.env.SMTP_HOST,
//         port: parseInt(process.env.SMTP_PORT, 10),
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASS,
//         },
//       },
//       from: process.env.SMTP_USER,
//       sendVerificationRequest,
//     }),
//   ],
//   adapter: MongoDBAdapter(clientPromise),

//   secret: process.env.AUTH_SECRET,
// };

// export const { handlers, signIn, signOut, auth } = NextAuth(config);
