import { Component, OnInit ,Inject} from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {ApiService} from './../services/api.service';
import{MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  bookForm !:FormGroup;
  actionbtn:string="Save";

  constructor(private formBuilder:FormBuilder, private api:ApiService,@Inject(MAT_DIALOG_DATA) public editData:any, private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
      this.bookForm=this.formBuilder.group({
	  bookName :['',Validators.required],
	  year :['',Validators.required],
	  authorName: ['',Validators.required]
	  })
	  if(this.editData){
	  this.actionbtn="Update";
	  this.bookForm.controls['bookName'].setValue(this.editData.bookName);
	  this.bookForm.controls['year'].setValue(this.editData.year);
	  this.bookForm.controls['authorName'].setValue(this.editData.authorName);
	  }
  }
 addBook(){
  if(!this.editData){
   if(this.bookForm.valid){
   this.api.postBook(this.bookForm.value)
   .subscribe({
   next:(res)=>{
   alert("Book Added successfully");
   this.bookForm.reset();
   this.dialogRef.close('save');
   },
   error:()=>{
   alert("Error while adding the Book");
   }
   })
   }
 }else{
 this.updateBook();
 }
 }
 updateBook(){
 this.api.putBook(this.bookForm.value,this.editData.id)
 .subscribe({
 next:(res)=>{
 alert("Book Updated Successfully");
 this.bookForm.reset();
 this.dialogRef.close('update');
 },
 error:()=>{
 alert("Error while updating the book");
 }
 })
 }
  
}
