import multer from "multer";

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
export const converCSVToShopifyObj = (data) => {
    const metafieldData = {
        namespace: "customer",
        type: "single_line_text_field"
    }
    const shopifyObj = {
        firstName: data['First Name'],
        lastName: data['Last Name'],
        email: data['Email'],
        phone: data['Phone (phone_number)'],
        tags: data['Tags'],
        note: data['Message (custom_34)'],
        addresses: {},
        emailMarketingConsent: {},
        // smsMarketingConsent:{},
        metafields: []
    };
    shopifyObj['addresses']['address1'] = data['Address (address_line_1)']
    shopifyObj['addresses']['address2'] = data['Address Line 2 (address_line_2)']
    shopifyObj['addresses']['city'] = data['City (address_city)']
    shopifyObj['addresses']['countryCode'] = data['Country (address_country)']
    shopifyObj['addresses']['zip'] = data['Zip Code (address_zip)']
    shopifyObj['addresses']['provinceCode'] = data['State (address_state)']
    // email marketing
    shopifyObj['emailMarketingConsent']['marketingState'] = data['I agree to receive email updates (custom_6)'] == "no" ? "NOT_SUBSCRIBED" : "SUBSCRIBED"
    shopifyObj['emailMarketingConsent']['marketingOptInLevel'] = "SINGLE_OPT_IN"
    // // sms marketing
    // shopifyObj['smsMarketingConsent']['marketingState']=data['Accepts SMS Marketing'] == "no"?"NOT_SUBSCRIBED":"SUBSCRIBED"
    // shopifyObj['smsMarketingConsent']['marketingOptInLevel']="SINGLE_OPT_IN"
    // add metafield 
    if (data['My Role']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "role",
            value: data['My Role']
        })
    }
    if (data['ADD Type (custom_30)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_30",
            value: data['ADD Type (custom_30)']
        })
    }
    if (data['Business Number (business_number)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "business_number",
            value: data['Business Number (business_number)']
        })
    }
    if (data['DragonQuiz (custom_1)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_1",
            value: data['DragonQuiz (custom_1)']
        })
    }
    if (data['30DHC Oxford Day1 (custom_4)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_4",
            value: data['30DHC Oxford Day1 (custom_4)']
        })
    }
    if (data['30DHC Oxford Day30 (custom_5)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_5",
            value: data['30DHC Oxford Day30 (custom_5)']
        })
    }
    if (data['Referred by [Full Name] (custom_7)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_7",
            value: data['Referred by [Full Name] (custom_7)']
        })
    }
    if (data['Which certification are you interested in? (custom_8)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_8",
            value: data['Which certification are you interested in? (custom_8)']
        })
    }
    if (data['Please provide the name and email of the person who referred you. (custom_10)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_10",
            value: data['Please provide the name and email of the person who referred you. (custom_10)']
        })
    }
    if (data['Were you referred by a Licensed Trainer to this course? (custom_9)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_9",
            value: data['Were you referred by a Licensed Trainer to this course? (custom_9)']
        })
    }
    if (data['Share a goal you have for each of the following areas: Physical Health, Relationships, Spiritual or Fulfillment, Mindset/Attitude (custom_15)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_15",
            value: data['Share a goal you have for each of the following areas: Physical Health, Relationships, Spiritual or Fulfillment, Mindset/Attitude (custom_15)']
        })
    }
    if (data['What is your best contact phone number (custom_12)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_12",
            value: data['What is your best contact phone number (custom_12)']
        })
    }
    if (data['What timezone are you in? (custom_13)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_13",
            value: data['What timezone are you in? (custom_13)']
        })
    }
    if (data['What is your current profession and what do you enjoy most about what you do? (custom_14)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_14",
            value: data['What is your current profession and what do you enjoy most about what you do? (custom_14)']
        })
    }
    if (data['How would it benefit your family, friends, clients if you reached these goals? (custom_18)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_18",
            value: data['How would it benefit your family, friends, clients if you reached these goals? (custom_18)']
        })
    }
    if (data['On a scale of 1-10 how committed are you to reaching each of those goals? (custom_16)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_16",
            value: data['On a scale of 1-10 how committed are you to reaching each of those goals? (custom_16)']
        })
    }
    if (data['How would your life be different if you reached these? (custom_17)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_17",
            value: data['How would your life be different if you reached these? (custom_17)']
        })
    }
    if (data['Your Initials (custom_19)']) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_19",
            value: data['Your Initials (custom_19)']
        })
    }
    if (data["Today's Date [MM/DD/YYYY] (custom_20)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_20",
            value: data["Today's Date [MM/DD/YYYY] (custom_20)"]
        })
    }
    if (data["How long have you been using the subscription?  (custom_21)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_21",
            value: data["How long have you been using the subscription?  (custom_21)"]
        })
    }
    if (data["How many courses did you complete? (custom_22)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_22",
            value: data["How many courses did you complete? (custom_22)"]
        })
    }
    if (data["What is the primary reason for the cancellation?  (custom_23)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_23",
            value: data["What is the primary reason for the cancellation?  (custom_23)"]
        })
    }
    if (data["What would you recommend us for improving our service?  (custom_25)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_25",
            value: data["What would you recommend us for improving our service?  (custom_25)"]
        })
    }
    if (data["Type your question here (custom_26)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_26",
            value: data["Type your question here (custom_26)"]
        })
    }
    if (data["Select Applicable Option (custom_28)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_28",
            value: data["Select Applicable Option (custom_28)"]
        })
    }
    if (data["PDF URL (custom_31)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_31",
            value: data["PDF URL (custom_31)"]
        })
    }
    if (data["Name of Country if outside the U.S. (custom_32)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_32",
            value: data["Name of Country if outside the U.S. (custom_32)"]
        })
    }
    if (data["My Role: (custom_33)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_33",
            value: data["My Role: (custom_33)"]
        })
    }
    if (data["Email Associated with your Professional Certification (custom_35)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_35",
            value: data["Email Associated with your Professional Certification (custom_35)"]
        })
    }
    if (data["My Zip Code or Postal Code is... (custom_29)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_29",
            value: data["My Zip Code or Postal Code is... (custom_29)"]
        })
    }
    if (data["My credential(s)... (custom_27)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_27",
            value: data["My credential(s)... (custom_27)"]
        })
    }
    if (data["My #1 question about ADD is... (custom_37)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_37",
            value: data["My #1 question about ADD is... (custom_37)"]
        })
    }
    if (data["Please confirm your First and Last Name? (custom_11)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_11",
            value: data["Please confirm your First and Last Name? (custom_11)"]
        })
    }
    if (data["Add your business website (if applicable) (custom_38)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_38",
            value: data["Add your business website (if applicable) (custom_38)"]
        })
    }
    if (data["Add your LinkedIn profile (if applicable) (custom_39)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_39",
            value: data["Add your LinkedIn profile (if applicable) (custom_39)"]
        })
    }
    if (data["Confirm your best email address (custom_40)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_40",
            value: data["Confirm your best email address (custom_40)"]
        })
    }
    if (data["Support Call: Available Times (custom_36)"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "custom_36",
            value: data["Support Call: Available Times (custom_36)"]
        })
    }
    if (data["Member ID"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "MemberID",
            value: data["Member ID"]
        })
    }
    if (data["External User ID"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "ExternalUserID",
            value: data["External User ID"]
        })
    }
    if (data["Products"]) {
        shopifyObj.metafields.push({
            ...metafieldData,
            key: "ExternalUserID",
            value: data["Products"]
        })
    }
    console.log(shopifyObj.metafields.length,"qssqsqsqs")
    return { input: shopifyObj }
}