import { Component, Inject, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocialRating } from '../../models/model';



@Component({
  selector: 'app-dialog-edit-social',
  templateUrl: './dialog-edit-social.component.html',
  styleUrls: ['./dialog-edit-social.component.css']
})
export class DialogEditSocialComponent{


  @Input() ratings: SocialRating[];
  //@Output() newItemEvent = new EventEmitter<string>();
  @Output() dialogResult = new EventEmitter<SocialRating[]>();

  constructor(public dialog: MatDialog, ) { }

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.ratings;
    const dialogRef = this.dialog.open(DialogEditSocialContent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      //this.ratings = result;
      this.dialogResult.emit(result);
    });
  }

}


@Component({
  selector: 'dialog-social-content-dialog',
  templateUrl: 'dialog-social-content-dialog.html',
  styleUrls: ['dialog-social-content-dialog.css']
})
export class DialogEditSocialContent {

  ratings: SocialRating[];

  constructor(
    public dialogRef: MatDialogRef<DialogEditSocialContent>,
    @Inject(MAT_DIALOG_DATA) public data: SocialRating[]) {
    if (!data) {
      this.ratings = [];
      this.ratings.push({});
    } else {
      this.ratings = data;
    }
    }

  addRow() {
    this.ratings.push({});
  }

  save(): void {
    this.dialogRef.close(this.ratings);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
