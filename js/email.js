// Reads a field's value, or '' if the page's form doesn't have that field.
function getFieldValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

// Shared by the full reservation form (results.html) and the shorter quote
// forms (luxurytransfer.html, taxi-service.html), which only contain a subset
// of these fields - missing ones are sent as 'N/A' instead of blocking submission.
function sendMailTransfer() {

    let name = getFieldValue('name') || 'N/A';
    let email = getFieldValue('email');
    let phone = getFieldValue('phone-number') || 'N/A';

    const transferSelect = document.getElementById('type_transfer');
    let transferType = transferSelect ? transferSelect.options[transferSelect.selectedIndex].text : '';
    // PAGE_SOURCE_LABEL (set per page before this script loads) tags which page the enquiry came from.
    if (typeof PAGE_SOURCE_LABEL !== 'undefined' && PAGE_SOURCE_LABEL) {
        transferType = transferType ? `${PAGE_SOURCE_LABEL} - ${transferType}` : PAGE_SOURCE_LABEL;
    }
    transferType = transferType || 'N/A';

    let flight = getFieldValue('Flight') || 'N/A';

    // taxi-service.html has a separate pickup field; fold it into the location/hotel param.
    const pickup = getFieldValue('pickup-location');
    let location = getFieldValue('location');
    if (pickup) {
        location = `[Taxi Service] Pickup: ${pickup} | Drop-off: ${location || 'N/A'}`;
    }

    let date = getFieldValue('date');
    let time = getFieldValue('time') || 'N/A';
    let adult = getFieldValue('number_of_adult_passengers') || getFieldValue('number_of_passengers') || 'N/A';
    let children = document.getElementById('number_of_children_passengers') ? getFieldValue('number_of_children_passengers') : 'N/A';
    let babyseat = document.querySelector('input[name="Babyseat"]:checked')?.value || 'N/A';
    let special = getFieldValue('special-requests') || 'N/A';

    let params;

    if (email && date && (pickup || location)) {
        document.getElementById('submitBtn').innerText = "Sending your details...";
    params = {
        name: name,
        email: email,
        phone: phone,
        transferType: transferType,
        flight: flight,
        hotel: location || 'N/A',
        date: date,
        time: time,
        adult: adult,
        children: children,
        extra: special,
        babyseats: babyseat
    };

    const serviceId = "service_4mdvvnl";
    const templateId = "template_19lgqb4";
    
    emailjs.send(serviceId, templateId, params).then(
        
        res => {

                document.getElementById('submitBtn').innerText = "Details successfully sent ✓";
                window.location.href = "thankyou.html";
           
           
        }
    )
}else {
   document.getElementById('errorMsg').innerText = "Please fill in all the required fields";
}

}