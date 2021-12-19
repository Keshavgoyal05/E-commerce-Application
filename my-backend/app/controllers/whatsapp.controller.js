const client = require("../configs/whatsapp.config");

//client.client.initialize();

const sendMsg =  async (number,message) => {
    console.log("number : "+number+"\nmessage : "+message);
    if(number!=null){
        const sanitized_number = number.toString().replace(/[- )(]/g, "");
        const final_number = `91${sanitized_number.substring(sanitized_number.lenght - 10)}`;
        const number_details = client.client.getNumberId(final_number);//get mobile number detail
        console.log("mobile no. " + final_number);
        res = (await number_details);
        console.log(res);
        if(res){
            console.log("sending msg ..");
            client.client.sendMessage(
                res._serialized,
                message
            );
            console.log("whatsapp msg sent");
        }
        else{
            console.log(final_number, "mobile number is not registered with whatsapp");
        }
    }  
};



// Getting chatId from the number.
// we have to delete "+" from the beginning and add "@c.us" at the end of the number.
//const chatId = number.substring(1) + "@c.us";


module.exports = { sendMsg };