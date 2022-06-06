const axios = require('axios')
exports.pay = async (req, res) => {
  const amount = req.body.amount
      console.log("d5alna")
      console.log(amount)
            const url = "https://developers.flouci.com/api/generate_payment";
            
            try {
                  console.log("jee hnee")
              const resp = await axios.post(url, {
                  "app_token": "e5c307d5-0b86-4a58-81f5-a5b554b9bd3a",
                  "app_secret": "872bce8e-574e-4a62-a950-04f1952f9bf9",
                  "accept_card":"true",
                  "amount":amount,
                  "success_link":  "http://localhost:3000/succes",
                  "fail_link": "http://localhost:3000/fail",
                  "session_timeout_secs": 1200,
                  "developer_tracking_id": "84af679f-2494-46be-8138-90c245196292"
                }, {
               /*  "Authorization": "Token 53300cf53245c56b10bcbfb4ca09574cd9640107", */
                "Content-Type": "application/json"
        
              });
              const link = resp.data.result
              console.log(resp.data)
              console.log("kamal hnee")
              res.status(200).json({
                  message: "finally  payement done  w  hamdoulillah",
                  link
                });
            //  console.log(CircularJSON.stringify(resp));
            } catch (err) {
          //    console.error(err);
          };
      
    };