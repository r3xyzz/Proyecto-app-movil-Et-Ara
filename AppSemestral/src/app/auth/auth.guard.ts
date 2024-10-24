import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn:'root'
})

  export class AuthGuard{
    constructor(private route:Router, private storage: Storage){
      this.init();
    }
  
    async init(){
      await this.storage.create();
    }
  
    canActivate : CanActivateFn = async(route,state) =>{
      const SessionActivate = await this.storage.get("SessionID");

      if(SessionActivate){
        return this.route.createUrlTree(['/home'])
      }else{
          return true
        }
    }

  }
  
