const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const knex=require('knex')
const OAuth2 = google.auth.OAuth2;
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'user',
    database : 'oj'
  }
});

const oauth2Client = new OAuth2(
     "605819162339-jn8m2skktvou0dhnt7jss9gtic3lpadv.apps.googleusercontent.com", // ClientID
     "ejqsQ8wRim6IKW_dhOAuta8x", // Client Secret
     "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
     refresh_token: "1/CwwM94KX0W2jGD4N5DdDsOYkoyVU1FGYVPt-q_YBw9k"
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: "aman.sharma.jan2000@gmail.com", 
          clientId: "605819162339-jn8m2skktvou0dhnt7jss9gtic3lpadv.apps.googleusercontent.com",
          clientSecret: "ejqsQ8wRim6IKW_dhOAuta8x",
          refreshToken: "1/CwwM94KX0W2jGD4N5DdDsOYkoyVU1FGYVPt-q_YBw9k",
          accessToken: accessToken
     }
});

var a=new Date();
var bb=a.toISOString()
console.log(bb);
var time=`${bb.substring(0,4)}-${bb.substring(5,7)}-${bb.substring(8,10)} ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`
console.log(time);


     db('register').distinct('u_id')
        .leftJoin('contests', 'register.c_id', 'contests.c_id').where("contests.date_con",">", time)
        .then(data=>{
          console.log(data)
          const arr=[];
           for(let i=0;i<data.length;i++)
           {
                arr.push(data[i].u_id)
           }
 
          db.select('email').from('users').whereIn('u_id',arr).then(data => {
          //console.log(data);

          const arr2=[];
           for(let i=0;i<data.length;i++)
           {
                arr2.push(data[i].email)
           }
          console.log(arr2)
          const mailOptions = {
          from: "aman.sharma.jan2000@gmail.com",
          to: arr2,
          subject: "no-reply @ Cheet Code",
          generateTextFromHTML: true,
          html: "<b>Be prepared for your upcoming contest :P.</b>"
          };
          smtpTransport.sendMail(mailOptions, (error, response) => {
          error ? console.log(error) : console.log(response);
          smtpTransport.close();
          });
     })
   }).catch(err => {
          console.log("Problem fetching data");
     });