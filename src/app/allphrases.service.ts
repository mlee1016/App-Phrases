import { Component,Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams,provideHttpClient } from '@angular/common/http';
import { of, throwError} from 'rxjs';
import { catchError,tap,} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AllphrasesService {

  constructor(private http: HttpClient) { 
  }

  private getStandardOptions():any{
    return {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
      })
    };
  }

  getPhrases1(){
    
    
    //Option 1
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject:{
        format: 'json'
      }
    });debugger
    //Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
    return this.http.get('assets/koreanPhrases.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers

    
  }





    
  getKoreanEntries():any{ 
    //Option 1
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject:{
        format: 'json'
      }
    });debugger
    //Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
    return this.http.get('assets/koreanEntries.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers

    
  }

  
  getKoreanPhraseword1(){
    
    
    //Option 1
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject:{
        format: 'json'
      }
    });debugger
    //Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
    return this.http.get('assets/phrasewordKorean.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers

    
  }
  getKoreanPhrases1(){
    
    
    //Option 1
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject:{
        format: 'json'
      }
    });debugger
    //Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
    return this.http.get('assets/koreanStudy.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers

    
  }
  getRussianPhrases1(){
    
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject:{
        format: 'json'
      }
    });debugger
    //Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
    return this.http.get('assets/russianPhrases.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers

  }
  
  getRuPhrases1(){
    
    
    //Option 1
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject:{
        format: 'json'
      }
    });debugger
    //Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
    return this.http.get('assets/russianStudy.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers

    
  }
  
  getRussianPhraseword1(){
    
    
    //Option 1
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject:{
        format: 'json'
      }
    });debugger
    //Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
    return this.http.get('assets/phrasewordRussian.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers

    
  }
   getGermanPhrases1(){ 
  let options = this.getStandardOptions();
  options.params = new HttpParams({
    fromObject:{
      format: 'json'
    }
  });debugger
  //Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
  return this.http.get('assets/germanPhrases.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers


} 
  getGermanStudy4(){

    
  let options = this.getStandardOptions();
  options.params = new HttpParams({
    fromObject:{
      format: 'json'
    }
  });debugger
  //Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
  return this.http.get('assets/germanStudy.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers


  }
 
getJapanesePhrases1(){ 
let options = this.getStandardOptions();
options.params = new HttpParams({
  fromObject:{
    format: 'json'
  }
});debugger
//Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
return this.http.get('assets/japanesePhrases.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers
}



getJapaneseStudy1(){

  
let options = this.getStandardOptions();
options.params = new HttpParams({
  fromObject:{
    format: 'json'
  }
});debugger
//Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
return this.http.get('assets/japaneseStudy.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers
}


  getJapanesePhraseword5(){
    
    
    //Option 1
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject:{
        format: 'json'
      }
    });debugger
    //Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
    return this.http.get('assets/phrasewordJapanese.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers

    
  }
getItalianPhrases4(){ 
let options = this.getStandardOptions();
options.params = new HttpParams({
  fromObject:{
    format: 'json'
  }
});debugger
//Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
return this.http.get('assets/italianPhrases.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers


}
getItalianStudy4(){
 let options = this.getStandardOptions();
 
options.params = new HttpParams({
  fromObject:{
    format: 'json'
  }
});debugger
//Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
return this.http.get('assets/italianStudy.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers


}
  private handleError(error: HttpErrorResponse){
    if (error.status == 0){

      console.error('Client or Network issue: ', error.error)
    }else{
      console.error('Server-side issue: ', error.error)
    }
    return throwError(() => new Error("Can't retrieve phrases from server please  "))
  }


  getItalianPhraseword4(){
    
    
    //Option 1
    let options = this.getStandardOptions();
    options.params = new HttpParams({
      fromObject:{
        format: 'json'
      }
    });debugger
    //Option 2: return this.http.get('assets/koreanPhrases.json?format=json',options)
    return this.http.get('assets/phrasewordItalian.json',options).pipe(catchError(this.handleError)) // returns a observable so not yet sent until an subscribers

    
  }
    
  
 



private cache = {
  koreanStudy: null,
  koreanPhrases: null,
  koreanPhraseword: null,

  russianStudy: null,
  russianPhrases: null,
  russianPhraseword: null,

  germanStudy: null,
  germanPhrases: null,

  japaneseStudy: null,
  japanesePhrases: null,
  japanesePhraseword: null,

  italianStudy: null,
  italianPhrases: null,
  italianPhraseword: null,
};
getKoreanStudy() {
  if (this.cache.koreanStudy) return of(this.cache.koreanStudy); // return cached
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/koreanStudy.json', options).pipe(
    tap(data => this.cache.koreanStudy = data), // store in cache
    catchError(this.handleError)
  );
}
getKoreanPhraseword() {
  if (this.cache.koreanPhraseword) return of(this.cache.koreanPhraseword);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/phrasewordKorean.json', options).pipe(
    tap(data => this.cache.koreanPhraseword = data),
    catchError(this.handleError)
  );
}
getPhrases() {
  if (this.cache.koreanPhrases) return of(this.cache.koreanPhrases);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/koreanPhrases.json', options).pipe(
    tap(data => this.cache.koreanPhrases = data),
    catchError(this.handleError)
  );
}
getRussianPhrases() {
  if (this.cache.russianPhrases) return of(this.cache.russianPhrases);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/russianPhrases.json', options).pipe(
    tap(data => this.cache.russianPhrases = data),catchError(this.handleError)
  );
}

getRussianPhraseword() {
  if (this.cache.russianPhraseword) return of(this.cache.russianPhraseword);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/phrasewordRussian.json', options).pipe(
    tap(data => this.cache.russianPhraseword = data),
    catchError(this.handleError)
  );
}





getRussianStudy() {
  if (this.cache.russianStudy) return of(this.cache.russianStudy);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/russianStudy.json', options).pipe(
    tap(data => this.cache.russianStudy = data),
    catchError(this.handleError)
  );
}

getItalianPhrases() {
  if (this.cache.italianPhrases) return of(this.cache.italianPhrases); // return cached
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/italianPhrases.json', options).pipe(
    tap(data => this.cache.italianPhrases = data), // store in cache
    catchError(this.handleError)
  ); 
}
getItalianPhraseword() {
  if (this.cache.italianPhraseword) return of(this.cache.italianPhraseword);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/phrasewordItalian.json', options).pipe(
    tap(data => this.cache.italianPhraseword = data),
    catchError(this.handleError)
  );
}
getItalianStudy() {
  if (this.cache.italianStudy) return of(this.cache.italianStudy);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/italianStudy.json', options).pipe(
    tap(data => this.cache.italianStudy = data),
    catchError(this.handleError)
  );
}
getJapanesePhrases() {
  if (this.cache.japanesePhrases) return of(this.cache.japanesePhrases);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/japanesePhrases.json', options).pipe(
    tap(data => this.cache.japanesePhrases = data),catchError(this.handleError)
  );
}

getJapanesePhraseword() {
  if (this.cache.russianPhraseword) return of(this.cache.russianPhraseword);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/phrasewordJapanese.json', options).pipe(
    tap(data => this.cache.japanesePhraseword = data),
    catchError(this.handleError)
  );
}


getJapaneseStudy() {
  if (this.cache.japaneseStudy) return of(this.cache.japaneseStudy);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/japaneseStudy.json', options).pipe(
    tap(data => this.cache.japaneseStudy = data),
    catchError(this.handleError)
  );
}


getGermanStudy() {
  if (this.cache.germanStudy) return of(this.cache.germanStudy);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/germanStudy.json', options).pipe(
    tap(data => this.cache.germanStudy = data),
    catchError(this.handleError)
  );
}


getGermanPhrases() {
  if (this.cache.germanPhrases) return of(this.cache.germanPhrases);
  let options = this.getStandardOptions();
  options.params = new HttpParams({ fromObject: { format: 'json' } });
  return this.http.get('assets/germanPhrases.json', options).pipe(
    tap(data => this.cache.germanPhrases = data),
    catchError(this.handleError)
  );
}
}