$(function(){
	var Contact = {
		firstName: "",
		lastName: "",
		phones: [],
		address: []
	}

	// an array of contacts
	// 100% perfectionist
	// MVP
	var contactsArray = [];



	// a listener to add contact info to array
	$('form').submit(function(){
		// validation();
		var firstName = $('input#first-name').val();
		var lastName = $('input#last-name').val();
		var phones = getPhones();
		var addresses = getAddresses();

		var currentContact = Object.create(Contact);
		currentContact.firstName = firstName;
		currentContact.lastName = lastName;
		currentContact.phones = phones;
		currentContact.address = addresses;

		contactsArray.push(currentContact);
		console.log(contactsArray);
		$('input').val('');

		//Display contactsArray under Contacts heading
		
		resetForm(contactsArray[contactsArray.length - 1], contactsArray.length-1, currentContact)

		return false;
	});

	var resetForm = function(temp, contactsArrayLength, currentContact){
		$('input').val('');
		$('ul.contacts-list').append('<li><a href="#" id="' + (contactsArrayLength) + '">' + temp.firstName + ' ' +  temp.lastName + '</a></li>');
		if (currentContact.address.length > 1) {
			$('.add-phone').show();
			$('.phone-group-1').remove();
		}
		if (currentContact.phones.length > 1) {
			$('.add-address').show();
			$('.address-group-1').remove();
		}
	}

	var validateForm = function(){
		validateInput('.first-name');
		validateInput('.last-name');

	}

	var getPhones = function(){
		var storeLength = $('fieldset.phone-number-group').children().length;
		var phoneList = [];
		for (var i = 0; i < storeLength; i++) {
			phoneList.push($('#phone-number-' + i).val());
		}
		return phoneList;
	}


	var getAddresses = function(){
		var storeLength = $('fieldset.address-fields').children().length;
		var addressList = [];
		for(var i = 0; i < storeLength; i++) {
			var street = $('#street-' + i).val();
			var city = $('#city-' + i).val();
			var state = $('#state-' + i).val();
			if(street || city || state !== '') {
				addressList.push(street + ', ' + city + ', ' + state);
			}
		}
		return addressList
	}

	// a way to view a single 
	// contact
	$('ul.contacts-list').on('click','a',function(){
		var id = this.id;
		var selectedContact = contactsArray[id];
		$('section.contact-info').children().remove();
		$('section.contact-info').append('<h3></h3><p>First Name: <span class="first-name"></span></p><p>Last Name: <span class="last-name"></span></p><p>Phone Numbers</p><ul class="phone-list"></ul><p>Addresses</p><ul class="address-list"></ul>')
		$('section.contact-info').show();
		$('section.contact-info h3').text(selectedContact.firstName + ' ' + selectedContact.lastName)
		$('.first-name').text(selectedContact.firstName);
		$('.last-name').text(selectedContact.lastName);
		for(var i = 0; i < selectedContact.phones.length; i++) {
			$('.phone-list').append('<li>' + selectedContact.phones[i] + '</li>');
		}
		if(selectedContact.address.length == 0){
			$('section.contact-info p:contains(Address)').hide()
		} else {
			for(var j = 0; j < selectedContact.address.length; j++) {
			$('.address-list').append('<li>' + selectedContact.address[j] + '</li>');
			}
		}
	})

	$('.add-phone').click(function(){
		event.preventDefault();
		$('.add-phone').hide()
		$('.phone-number-group').append('<div class="phone-group-1"><label for="phone-number-1">Phone Number #2</label><input type="text" id="phone-number-1" maxlength="11"></div>')
	})

	$('.add-address').click(function(){
		event.preventDefault();
		$('.add-address').hide();
		$('.address-fields').append('<div class="address-group-1"><label for="street-1">Street #2</label><input type="text" id="street-1"><label for="city-1">City #2</label><input type="text" id="city-1"><label for="state-1">State #2</label><input type="text" id="state-1"></div>');
	})

	//only numbers in telephone field
	$('.phone-number-group').on('input', 'input[id*="phone-number"]', function(){
		this.value = this.value.replace(/[^0-9.]/g, ''); 
		this.value = this.value.replace(/(\..*)\./g, '$1');
	})


	// editing features


	// deletion

})