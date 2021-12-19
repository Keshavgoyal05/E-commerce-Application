var nodemailer = require("nodemailer")
var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : "keshavgoyal885.kg@gmail.com",
        pass : "keshugeo2105"
    }
});
module.exports = {transporter : transporter};
