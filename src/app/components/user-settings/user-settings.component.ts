import { Component, Input, OnInit } from '@angular/core';
// user-settings.component.ts
import { FormGroup, FormControl } from '@angular/forms';
// Other imports...
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import
import { EagerUserData, PrefVoice, Schools, UserData } from 'src/models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  userDataForm: FormGroup = new FormGroup({});

  @Input() userData: UserData[] = [];
  @Input() setUserData: any;
  @Input() getUserData: any;
  @Input() updateUserData: any;
  @Input() fetchUserData: any;

  ngOnInit() {
    this.initializeForm();
    this.populateForm();
  }

  initializeForm() {
    this.userDataForm = new FormGroup({
      school: new FormControl(Schools.SCHOOL1),
      classname: new FormControl(''),
      agreement: new FormControl(true),
      readingStage: new FormControl(''),
      prefVoice: new FormControl(PrefVoice.DORA),
      saveRecord: new FormControl(true),
      manualFix: new FormControl(false),
      name: new FormControl(''),
      age: new FormControl(''),
      UserScores: new FormControl([]),
    });
  }

  populateForm() {
    this.userDataForm.patchValue({
      school: this.userData[0].school,
      classname: this.userData[0].classname,
      agreement: this.userData[0].agreement,
      readingStage: this.userData[0].readingStage,
      prefVoice: this.userData[0].prefVoice,
      saveRecord: this.userData[0].saveRecord,
      manualFix: this.userData[0].manualFix,
      name: this.userData[0].name,
      age: this.userData[0].age,
    });
  }

  saveUserData() {
    this.updateUserData(this.userData[0].id, this.userDataForm.value);
  }

  resetForm() {
    this.fetchUserData().then((data: EagerUserData[]) => {
      this.userData = data;
      this.populateForm();
    });
  }

  // add functionality to delete my account from the database and cognito

  deleteAccount() {
    // delete from cognito
    // delete from database
  }

  // add confirmation modal from deleting account

  deleteAccountConfirmation() {}
}
