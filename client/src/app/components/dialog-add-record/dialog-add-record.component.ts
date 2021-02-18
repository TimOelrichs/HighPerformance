import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-add-record',
  templateUrl: './dialog-add-record.component.html',
  styleUrls: ['./dialog-add-record.component.css']
})
export class DialogAddRecordComponent {

  @Output() dialogResult = new EventEmitter<String>();

  constructor(public dialog: MatDialog,) {}

    openDialog() {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      const dialogRef = this.dialog.open(DialogAddRecordContent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        //this.ratings = result;
       this.dialogResult.emit(result);
      });
    }

}



@Component({
  selector: 'dialog-add-record-content',
  templateUrl: 'dialog-add-record-content.html',
  styleUrls: ['dialog-add-record-content.css']
})
export class DialogAddRecordContent {

  public year: String;
  constructor(
    public dialogRef: MatDialogRef<DialogAddRecordContent>) {

    }

  save(): void {
    this.dialogRef.close(this.year);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


