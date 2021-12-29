var nodemailer = require("nodemailer")
var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : "keshavgoyal885.kg@gmail.com",
        pass : "**********"
    }
});
module.exports = {transporter : transporter};
