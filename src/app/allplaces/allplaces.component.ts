import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';
@Component({
  selector: 'app-allplaces',
  templateUrl: './allplaces.component.html',
  styleUrl: './allplaces.component.css'
})
export class AllplacesComponent {


  declare paypal: any;
  private apiUrl = 'http://127.0.0.1:8000/api/protected';
  
  message = '';
  reactiveForm:FormGroup
  numberOfPhrases = 0

  constructor(private http:HttpClient,private formbuilder:FormBuilder,){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    

    this.reactiveForm = this.formbuilder.group({
      jp: '',
      kana: '',
      en: '',
      des: '',
      phrase_name:'',
      username: '',
    })





    /*this.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '10.00'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
        // Send details.orderID to Django backend for verification
          this.http.post('/api/paypal-verify/', {
            orderID: data.orderID
          }).subscribe(response => {
            console.log("Payment verified", response);
          });
        });
      }
    }).render('#paypal-button-container');*/


  }
  

  

  
  getProtectedData() {
    this.http.get(this.apiUrl).subscribe(response => {
      this.message = JSON.stringify(response);
    }, error => {
      this.message = 'Access denied!';
    });
  }

  stripeCheckout= "http://127.0.0.1:8000/api/create-checkout-session/" 
  jsonPhrase = []
  serializedUrl = "http://127.0.0.1:8000/api/phrases-serializer/"
  createSerializedUrl = "http://127.0.0.1:8000/api/create-phrases-serializer/"
  updateSerializedUrl = "http://127.0.0.1:8000/api/update-phrases-serializer/"
  createPaypalUrl = "http://127.0.0.1:8000/api/create-paypal/"

  capturePaypalUrl = "http://127.0.0.1:8000/api/capture-paypal/"


  serializePhrase(){
    this.http.get(this.serializedUrl).subscribe((phrase:any)=>{
      console.log(phrase)
      this.jsonPhrase = phrase
      console.log(this.jsonPhrase)
      alert('success') 
    })
  }


  createPhrase(){
    this.http.post(this.createSerializedUrl,this.reactiveForm.getRawValue()).subscribe((data:any)=>{

      console.log(data)
      alert('created phrase success')
    })
  }
  updatePhrase(event:any){
    
    this.reactiveForm = this.formbuilder.group({
      
      jp: event.jp,
      kana: event.kana,
      en: event.en,
      des: event.des,
      phrase_name: event.phrase_name,
      username: event.username,
    })
    
  }

  editPhrase(){
    this.http.put(this.updateSerializedUrl,this.reactiveForm.getRawValue()).subscribe((data:any)=>{

      console.log(data)
      
    

    this.reactiveForm = this.formbuilder.group({
      jp: '',
      kana: '',
      en: '',
      des: '',
      phrase_name:'',
      username: '',
    })
    })


  }

  product_id = '' 
  product_price = 0

  createSubscription() {
  // @ts-ignore
  paypal.Buttons({
    createSubscription: (data: any, actions: any) => {
      return actions.subscription.create({
        plan_id: 'P-XXXXXX' // your PayPal plan id from dashboard
      });
    },
    onApprove: (data: any, actions: any) => {
      console.log('Subscription approved', data);
      // Call backend to activate subscription in Django
      return this.http.post(this.capturePaypalUrl, { subscriptionID: data.subscriptionID }).toPromise()
        .then((res) => {
          console.log('Subscription activated', res);
        });
    },
    onError: (err: any) => {
      console.error('PayPal error', err);
    }
  }).render('#paypal-button-container');
}










  email = 's@some.com'
  async checkout() {
    const stripe = await loadStripe("pk_test_51RAZoN4Kjlo7G2b05bbmjAfPjHvZE6mBUYjkunMoM42trAPfNUNLMQ1mFNrz9eIxf0i5gpDBLekyMVYdFLobMVuq00skl2kCml"); // Your public key
    this.http.post<any>(this.stripeCheckout, {'email':this.email}).subscribe(async res => {
      console.log(res)
      const result = await stripe?.redirectToCheckout({
        sessionId: res.id,
      });
      if (result?.error) {
        console.error(result.error.message);
      }
    });
  }
}