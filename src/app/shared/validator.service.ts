import {Component,OnInit} from '@angular/core';
export class ValidatorList{
    static account_validation_messages: any = {
		'username': [
		  { type: 'required', message: 'Username is required' },
		  { type: 'minlength', message: 'Username must be at least 5 characters long' },
		  { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
		  { type: 'pattern', message: 'Your username must contain only numbers and letters' },
		  { type: 'validUsername', message: 'Your username has already been taken' }
		],
		'email': [
		  { type: 'required', message: 'Email is required' },
		  { type: 'emailValidator', message: 'Enter a valid email' },
		],
		'password_confirmation': [
		  { type: 'required', message: 'Confirm password is required' },
		  { type: 'areEqual', message: 'Password mismatch' },
		  { type: 'pattern', message: 'Confirm password must be numeric'}
		],
		'confirm_password':[
			{ type: 'required', message: 'Confirm password is required' },
		  	{ type: 'areEqual', message: 'Password mismatch' },
		  	{ type: 'pattern', message: 'Confirm password must be numeric' }
		],
		'password': [
		  { type: 'required', message: 'Password is required' },
		  { type: 'minlength', message: 'Password must be at least 6 characters long' },
		  { type: 'pattern', message: 'Password must be numeric' }
		],
		'old_password': [
		  { type: 'required', message: 'Old Password is required' },
		  { type: 'minlength', message: 'Old Password must be at least 6 characters long' },
		  { type: 'pattern', message: 'Old password must be numeric' }
		],
		'terms': [
		  { type: 'pattern', message: 'You must accept terms and conditions' }
		],
		'first_name':[
			{ type: 'required', message: 'First Name is required' },
			{ type: 'pattern', message: 'First Name should contain alphabets only' },
			{ type: 'numberNotRequiredValidator', message: 'First Name should not contain numbers.' },
			{ type: 'avoidEmptyStrigs', message: 'First Name should not be empty string.' },
		],
		'last_name':[
			{ type: 'required', message: 'Last Name is required' },
			{ type: 'pattern', message: 'Last Name should contain alphabets only' },
			{ type: 'numberNotRequiredValidator', message: 'Last Name should not contain numbers.' },
			{ type: 'avoidEmptyStrigs', message: 'Last Name should not be empty string.' },
		],
		'country_code':[
			{ type: 'required', message: 'Country code is required' },
			{ type: 'pattern', message: 'Country code should contain numbers only' },
		],
		'mobile_no':[
			{ type: 'required', message: 'Mobile number is required' },
			{ type: 'pattern', message: 'Mobile number should contain numbers and special characters +, -, (, ) only' },
			{ type: 'minlength', message: 'Minimum length is 7' },
			{ type: 'maxlength', message: 'Maximum length is 15' },
		],
		'category_name':[
			{ type: 'required', message: 'Category name is required' },
			{ type: 'pattern', message: 'Special characters not allowed' },
		],
		'category_code':[
			{ type: 'required', message: 'Category code is required' },
			{ type: 'pattern', message: 'Special characters not allowed' },
		],
		'sub_category_name':[
			{ type: 'required', message: 'Sub Category name is required' },
			{ type: 'pattern', message: 'Special characters not allowed' },
		],
		'category_id':[
			{ type: 'required', message: 'Please Select Category' },
		],
		'title':[
			{ type:'required', message:'Product title is required'},
			{ type: 'pattern', message: 'Special characters not allowed' },
			{ type: 'avoidEmptyStrigs', message: 'Product title should not be empty string.' },
			{ type: 'maxlength', message: 'Product title maximum length is 255' },
		],
		'sku':[
			{ type:'required', message:'Product SKU is required'},
			{ type: 'avoidEmptyStrigs', message: 'Product SKU should not be empty string.' },
			{ type: 'maxlength', message: 'Product SKU maximum length is 255' },
		],
		'categories':[
			{ type:'required', message:'Category is required'},
		],
		'base_price':[
			{ type:'required', message:'Base Price is required'},
			{ type: 'maxlength', message: 'Base Price maximum length is 10' },
			{ type: 'avoidEmptyStrigs', message: 'Base Price should not be empty string.' },
			{ type: 'pricePattern', message: 'Invalid base Price' },
		],
		'description':[
			{ type:'required', message:'Description is required'},
		],
		'id':[
			{ type:'required', message:''},
		],
		'name':[
			{ type: 'required', message: 'Name is required' },
			{ type: 'pattern', message: 'Name should contain alphabets only' },
			{ type: 'numberNotRequiredValidator', message: 'Name should not contain numbers.' },
			{ type: 'avoidEmptyStrigs', message: 'Name should not be empty string.' },
		],
		'address_line_1':[
			{ type: 'required', message: 'Address Line 1 is required' },
			{ type: 'numberNotRequiredValidator', message: 'Address Line 1 should not contain numbers.' },
			{ type: 'avoidEmptyStrigs', message: 'Address Line 1 should not be empty string.' },
		],
		'city':[
			{ type: 'required', message: 'City is required' },
			{ type: 'numberNotRequiredValidator', message: 'City should not contain numbers.' },
			{ type: 'avoidEmptyStrigs', message: 'City should not be empty string.' },
		],
		'state':[
			{ type: 'required', message: 'State is required' },
			{ type: 'numberNotRequiredValidator', message: 'State should not contain numbers.' },
			{ type: 'avoidEmptyStrigs', message: 'State should not be empty string.' },
		],
		'country':[
			{ type: 'required', message: 'Country is required' },
		],
		'zip_code':[
			{ type: 'required', message: 'Zip Code is required' },
			{ type: 'pattern', message: 'Zip Code should contain numbers only' },
			{ type: 'minlength', message: 'Minimum length is 4' },
			{ type: 'maxlength', message: 'Maximum length is 7' },
		],
		'product_title':[
			{ type:'required', message:'Product title is required'},
			{ type: 'pattern', message: 'Special characters not allowed' },
		],
		'card_number':[
			{ type:'required', message:'Card Number is required'},
			{ type:'maxlength', message:'Maximum length is 16'},
			{ type:'minlength', message:'Minimum length is 16'},
			{ type:'pattern', message:'Only numbers are allowed'},
		],
		'card_expiry_month':[
			{ type:'required', message:'Expiry Month is required'}
		],
		'card_expiry_year':[
			{ type:'required', message:'Expiry Year is required'}
		],
		'cvv':[
			{ type:'required', message:'CVV is required'},
			{ type:'minlength', message:'Minimum length is 3'},
			{ type:'maxlength', message:'Maximum length is 4'},
			{ type:'pattern', message:'CVV should be numeric only'},
		],
		'subject':[
			{ type:'required', message:'Subject is required'},
			{ type:'numberNotRequiredValidator', message:'Subject should contain numbers only.'},
			{ type:'avoidEmptyStrigs', message:'Subject cannot be enpty.'},
		],
		'message':[
			{ type:'required', message:'Message is required'},
			{ type:'avoidEmptyStrigs', message:'Message cannot be enpty.'},
		],
		'faq_question':[
			{ type:'required', message:'FAQ Question is required'},
			{ type:'maxlength', message:'Maximum length is 255'},
		],
		'faq_answer':[
			{ type:'required', message:'FAQ Answer is required'},
			{ type:'maxlength', message:'Maximum length is 1000'},
		],
		'comment':[
			{ type:'required', message:'Comment is required'},
			{ type:'maxlength', message:'Maximum length is 1000'},
		],
		'recaptcha':[
			{ type:'required', message:'ReCaptcha is required'}
		],
		'coupan':[
			{ type:'required', message:'Coupon is required'}
		],
		'coupan_code':[
			{ type:'required', message:'Please enter coupon code.'},
			{ type: 'avoidEmptyStrigs', message: 'Invalid coupon code' },
		],
		'discount':[
			{ type:'required', message:'Discount is required'},
			{ type:'pattern', message:'Discount should be numeric'},
			{ type:'percentValidation', message:'Discount should be in between 0 and 100'},
		],
		'template':[
			{ type:'required', message:'Email template body is required'},
		],
		'display_title':[
			{ type:'required', message:'This field is required.'},
			{ type:'pattern', message:'Invalid Input.'},
			{ type:'avoidEmptyStrigs', message:'Invalid Input.'},
		],
		'content':[
			{ type:'required', message:'This field is required.'},
		],
		'template_id':[
			{ type:'required', message:'This field is required.'},
		],
		'testing_mail':[
			{ type:'required', message:'This field is required.'},
			{ type: 'emailValidator', message: 'Enter a valid email' },
		],
		'result' : [
			{ type:'required', message:'This field is required.'},
		],
		'from' : [
			{ type:'required', message:'This field is required.'},
		],
		'to' : [
			{ type:'required', message:'This field is required.'},
		],
		'amount':[
			{ type:'required', message:'This field is required'},
			{ type: 'pricePattern', message: 'Invalid Input' },
		],
	}


	static numberNotRequiredValidator(number): any {
		if (number.pristine) {
	     	return null;
	   	}
	   const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;

	   number.markAsTouched();

	   var value = number.value.trim();

	   if (NUMBER_REGEXP.test(value)) {
		   return {
		      numberNotRequiredValidator: true
		   };
	   }
	   
	   return null;
	}

	static percentValidation(number):any{
		if (number.pristine) {
			return null;
		}
		number.markAsTouched();
		var temp_number=parseInt(number.value)
		if((temp_number>100)||(temp_number<0)){
			return {
				percentValidation:true
			}
		}
		else{
			return null
		}
	}

	static avoidEmptyStrigs(value): any {
		if (value.pristine) {
	     	return null;
	   	}

	   	value.markAsTouched();

	   	if (value.value.trim() == '' && value.value.length > 0) {
			return {
				avoidEmptyStrigs: true
			};
	   	}
	   
	   	return null;
	}

	static pricePattern(value): any
	{
		if (value.pristine) {
	     	return null;
	   	}

	   	if (value.value.length == 0) {
	   		return;
	   	}

		
		const PRICE_REGEXP = /^(\d*\.)?\d+$/;
		
	   	value.markAsTouched();

	   	if (PRICE_REGEXP.test(value.value)) {
	   		return null;
	   	}
	   
	   return {
	      pricePattern: true
	   };
	}

	static emailValidator(value): any {
		
		if (value.pristine) {
	     	return null;
	   	}

	   	if (value.value.length == 0) {
	   		return;
	   	}

		
		const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
	   	value.markAsTouched();

	   	if (EMAIL_REGEXP.test(value.value)) {
	   		return null;
	   	}
	   
	   return {
	      emailValidator: true
	   };
	}

}