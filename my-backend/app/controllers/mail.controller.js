const transporter = require("../configs/mail.config");

const NewUserMail =  (toMailId,name) => {
    let NewUserMail = {
        from : 'keshavgoyal885.kg@gmail.com',
        to : toMailId,
        subject : "Thanks for Registering with us",
        html : `Hi ${name},<br><br><img src=${"https://assets.tatacliq.com/medias/sys_master/images/32013457981470.jpg"}><br><h3> Welcome to ShopQuick.in</h3><br>We Welcome you to world's largest Online Store.<br><br>Team ShopQuick,<br>Keshav Goyal(Director)`
    }
    // var res = (transporter.transporter.sendMail(NewUserMail));
    // return (res.accepted.length > 0) ? true : false ;
    transporter.transporter.sendMail(NewUserMail, function(err,info){
        if(err){
            console.error(err);
        }
        console.log("welcome email sent : "+info.response);
    });
};

const ForgotPasswordMail = async (toMailId,otp) => {
    console.log({toMailId});
    let ForgotPasswordMail = {
        from : 'keshavgoyal885.kg@gmail.com',
        to : toMailId,
        subject : "OTP for Password Recovery",
        html : '<h5> Your OTP to change pasword : '+otp+' </h5>'
    }
    
    var res = await (transporter.transporter.sendMail(ForgotPasswordMail));
    return (res.accepted.length > 0) ? true : false ;
    // transporter.transporter.sendMail(ForgotPasswordMail, function(err,info){
    //     if(err){
    //         console.error(err);
    //         return false;
    //     } 
    //     console.log("otp sent : "+info.response);
    //     return true;  
    // })
};

const PasswordUpdateMail = async (toMailId) => {
    var passwordUpdateNotification = {
        from : 'keshavgoyal885.kg@gmail.com',
        to : toMailId,
        subject : "Password Changed",
        html : "<h4>password changed successfully.</h4>"
    }
    // var res = (transporter.transporter.sendMail(passwordUpdateNotification));
    // return (res.accepted.length > 0) ? true : false ;
    transporter.transporter.sendMail(passwordUpdateNotification, function(err,info){
        if(err){
            console.error(err);
        } 
        console.log("update password mail sent : "+info.response);
    })
};

module.exports = {NewUserMail,ForgotPasswordMail,PasswordUpdateMail}