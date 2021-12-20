import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/service/loginService/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile !: any;
  constructor(private tokenStorage: TokenStorageService) { 
    
  }

  ngOnInit(): void {
    this.profile = this.tokenStorage.getUser();
    console.log(this.profile);
  }

}
