import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _user: any = {
    id: 1,
    username: "brvj",
    firstName: "Boris",
    lastName: "Jankovic",
    address: "Pezos",
    phoneNumber: "021-123-456",
    email: 'brvj@gmail.com',
    authorities: ["admin"],
    fullName: () => `Boris Jankovic`,
  };

  editMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get user() {return this._user;}

  submit(f: any) {
    console.log(this.user);
    console.log(f.value);

  }

}
