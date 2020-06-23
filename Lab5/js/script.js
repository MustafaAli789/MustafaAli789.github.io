function clickedService(service) {
    console.log(service)
    let desc = ''
    let services = []
    $('#serviceTitle').html(service);
    if (service === 'Repair') {
        desc = 'Fix any general purpose issue with your bike ranging from drive train adjustments to suspension replacemnents.'
        services = ['Chain Repair', 'Brake Repair', 'Tire Repair']
    } else if (service === 'Accessory') {
        desc = 'Install any standard accessory such as a fender or rack or even an accessory of your choice.'
        services = ['Bell Attachment', 'Light Installation']
    } else {
        desc = 'Upgrade your bike with brake adjuments, tire upgrades, seatpost upgrades, grip installation and more.'
        services = ['Color Tune-Up', 'Oil Tune-Up']
    }
    $('#serviceDescription').html(desc);

    //reset
    $('#serviceOptions').html('');
    services.forEach((service, i) => {
        let elem = document.createElement('div');
        elem.className = 'serviceOptionDiv';
        elem.innerHTML = `
        <input class="form-check-input" type="radio" name="serviceRadios" id="serviceRadio${i}" value="${service}">
        <label class="form-check-label" for="serviceRadio${i}">
            ${service}
        </label>
        `
        $('#serviceOptions').append(elem);
    });
}


//Used https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
//for reg ex learning

//phone num of phone xxxxxxxxxx
phoneNumValidation = () => {
    let validation = /^\d{10}$/
    return validation.test($('#phoneInfo').val());
}

//credit card of form xxxx-xxxx-xxxx-xxxx
creditCardValidation  = () => {
    let validation = /^\d{4}-\d{4}-\d{4}-\d{4}$/
    return validation.test($('#creditCardInfo').val())
}

submitClicked = () => {
    if (!creditCardValidation() && !phoneNumValidation()) {
        alert("Credit card must be xxxx-xxxx-xxxx and phone number in xxxxxxxxxx (10)");
    } else if (!creditCardValidation()) {
        alert("Credit card must be xxxx-xxxx-xxxx");
    } else if (!phoneNumValidation()) {
        alert("Phone number must be xxxxxxxxxx (10)");
    } else {
        $('#portfolioModal').modal('hide')
    }

}

let disabledDays = ["07/01/2020"]

//used https://webkul.com/blog/jquery-datepicker/
//https://stackoverflow.com/questions/15400775/jquery-ui-datepicker-disable-array-of-dates
$(document).ready(function(){
    $("#dateInput").datepicker({
        changeYear: false,
        changeMonth: true,
        dateFormat: 'mm/dd/yy',
        minDate: '-0D',
        maxDate: '+1Y',
        beforeShowDay: function(date) {
            let day = date.getDay();

            var string = jQuery.datepicker.formatDate('dd/mm/yy', date);
            var isDisabled = ($.inArray(string, disabledDays) != -1);

            if ($('#professionalRadio1').is(':checked')) {
                return [day!=0 && day !=6 && day!=5 && !isDisabled]
            } else if ($('#professionalRadio2').is(':checked')){
                return [day!=0 && day !=6 && day!=1 && !isDisabled]
            } else {
                return [day!=0 && day !=6 && !isDisabled]
            }

        }
    });
});