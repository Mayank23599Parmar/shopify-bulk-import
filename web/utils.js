import multer  from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination directory for storing uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Custom filename generation
    }
  });
  // Configure Multer middleware with storage settings
export const upload = multer({ storage: storage });
export const converCSVToShopifyObj=(data)=>{
    const metafieldData={
        namespace:"customer",
        type:"single_line_text_field"
    }
    const shopifyObj={
        firstName:data['First Name'],
        lastName:data['Last Name'],
        email:data['Email'],
        phone:data['Phone'],
        tags:data['Tags'],
        note:data['Message'],
        addresses:{},
        emailMarketingConsent:{},
        smsMarketingConsent:{},
        metafields:[]
    };
    shopifyObj['addresses']['address1']=data['Address  Line 1']
    shopifyObj['addresses']['address2']=data['Address Line 2']
    shopifyObj['addresses']['city']=data['City']
    shopifyObj['addresses']['countryCode']=data['Country Code']
    shopifyObj['addresses']['zip']=data['Zip Code']
    // email marketing
    shopifyObj['emailMarketingConsent']['marketingState']=data['Accepts Email Marketing'] == "no"?"NOT_SUBSCRIBED":"SUBSCRIBED"
    shopifyObj['emailMarketingConsent']['marketingOptInLevel']="SINGLE_OPT_IN"
    // sms marketing
    shopifyObj['smsMarketingConsent']['marketingState']=data['Accepts SMS Marketing'] == "no"?"NOT_SUBSCRIBED":"SUBSCRIBED"
    shopifyObj['smsMarketingConsent']['marketingOptInLevel']="SINGLE_OPT_IN"
    // add metafield 
    if(data['My Role']){
        shopifyObj.metafields.push({
            ...metafieldData,
            key:"role",
            value:data['My Role']
        })
    }
    if(data['ADD Type']){
        shopifyObj.metafields.push({
            ...metafieldData,
            key:"type",
            value:data['ADD Type']
        })
    }
    return {input:shopifyObj}
}