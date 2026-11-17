function sendMailTransfer() {

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone-number').value;
    let transferType = document.getElementById('type_transfer').options[document.getElementById('type_transfer').selectedIndex].text;
    let flight = document.getElementById('Flight').value;
    let location = document.getElementById('location').value;
    let date = document.getElementById('date').value;   
    let time = document.getElementById('time').value;
    let adult = document.getElementById('number_of_adult_passengers').value;
    let children = document.getElementById('number_of_children_passengers').value;
    let babyseat = document.getElementById('whatsapp rads').value;

    let special = document.getElementById('special-requests').value;

    let params;

    if (name && email && phone && transferType && flight && location && date && time && adult && children ) {
        document.getElementById('submitBtn').innerText = "Sending your details...";
    params = {
        name: name,
        email: email,
        phone: phone,
        transferType: transferType,
        flight: flight,
        hotel: location,
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