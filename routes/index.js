var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) =>{
  res.render('index', {title: "Siuvimo Kursai - RDSiuvykla.LT" });
}));

// Get gallery page
router.get('/galerija', asyncHandler(async (req, res, next) => {
  res.render('galerija',  {title: "Galerija - RDSiuvykla.LT" });
}));

// Get siuvimo-paslaugos page
router.get('/siuvimo-paslaugos', asyncHandler(async (req, res, next) => {
  res.render('siuvimo-paslaugos',  {title: "Siuvimo paslaugos - RDSiuvykla.LT" });
}));

// Get drabuziu-taisymas page
router.get('/drabuziu-taisymas', asyncHandler(async (req, res, next) => {
  res.render('drabuziu-taisymas',  {title: "Drabužių taisymas - RDSiuvykla.LT" });
}));


// Get register form page
router.get('/registruokis', asyncHandler(async (req, res, next) => {
  res.render('registruokis',  {title: "Registracija - RDSiuvykla.LT" });
}));

// Send register email to rasita@rdsiuvykla.lt
router.post('/registruokis', asyncHandler (async (req, res) => {
  const output = `
  <p> Pranešimas iš /registruokis formos. Šis žmogus užsiregistravo į kursus </p>
  <h3> Siuntėjo kontaktai:</h3>
  <ul>
    <li>Vardas: ${req.body.name} </li>
    <li>E.pašto adresas: ${req.body.email} </li>
    <li>Mob: ${req.body.number} </li>
    <li>Kursas: ${req.body.courses} </li>
  </ul>
  `;
 
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "brokolis.serveriai.lt",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'rasita@rdsiuvykla.lt', // generated ethereal user
      pass: 'Mlarris54321' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"RDSiuvykla.lt" <rasita@rdsiuvykla.lt>', // sender address
    to: "sita@splius.lt, rasita@rdsiuvykla.lt", // list of receivers
    subject: "RDSiuvykla.lt Kursai Nauja Registracija", // Subject line
    text: "Sveiki", // plain text body
    html: output // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.render('registruokis', {msg: 'Jūsų pranešimas išsiūstas. Geros dienos!'});
}));


// Get kontaktai routers
router.get('/kontaktai', asyncHandler(async (req, res, next) => {
  res.render('kontaktai',  {title: "Kontaktai - RDSiuvykla.LT" });
}));

// Send Email from kontaktai form
router.post('/kontaktai', asyncHandler (async (req, res) => {
  const output = `
  <p> Jūs turite naują pranešimą iš www.rdsiuvykla.lt/kontaktai </p>
  <h3> Siuntėjo kontaktai:</h3>
  <ul>
    <li>Vardas: ${req.body.name} </li>
    <li>E.pašto adresas: ${req.body.email} </li>
    <li>Mob: ${req.body.phoneNumber} </li>
  </ul>

  <h3>Žinutė </h3>
  <p>${req.body.textfield}</p>
  `;


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "brokolis.serveriai.lt",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'rasita@rdsiuvykla.lt', // generated ethereal user
      pass: 'Mlarris54321' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"RDsiuvykla.lt" <rasita@rdsiuvykla.lt>', // sender address
    to: "sita@splius.lt, rasita@rdsiuvykla.lt", // list of receivers
    subject: "RDsiuvykla.lt Klausimas is Kontaktai Skilties", // Subject line
    text: "Sveiki", // plain text body
    html: output // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.render('kontaktai', {msg: 'Jūsų pranešimas išsiūstas. Geros dienos!'});
}));

// Handle 404
router.use(function(req, res) {
  res.status(404);
 res.render('404', {title: '404: File Not Found'});
 });
 
 // Handle 500
 router.use(function(error, req, res, next) {
  res.status(500);
 res.render('500', {title:'500: Internal Server Error', error: error});
 });


module.exports = router;
