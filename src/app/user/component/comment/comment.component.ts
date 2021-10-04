import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/service/userService/commentService/comment.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { Custommer } from 'src/model/custommer';
import { Comment } from 'src/model/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  commentForm!: FormGroup;
  customer = new Custommer();
  isAuthenticated!: string;
  username!: string;
  store: Storage = sessionStorage;
  comments!: Comment[];
  page = 1;
  pageSize = 4;
  totalLength: any;

  constructor(
    private commentService: CommentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.isAuthenticated = this.store.getItem('isLogin') as string;

    

    this.commentForm = this.formBuilder.group({
        content: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]]
    });

    this.getUsername();

    this.getComment();

    if(this.isAuthenticated) {
      this.commentService.findCustommerByUsername(this.username).subscribe((data:any) => {
        console.log(data);
        this.customer = data
      })
    }
  }

  getUsername() {
    let userCredentials = JSON.parse(this.store.getItem('auth-user') as string);
    this.username = userCredentials.username;
    console.log(this.username);
  }
  
  getProductId(): number {
    let productId = Number(this.activatedRoute.snapshot.paramMap.get('productId'));
    return productId;
  }

  /** Validate form field */

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  createComment() {
    if(this.commentForm.invalid) {
      Swal.fire("error!", "Order error!", "error");
      this.validateAllFormFields(this.commentForm);
      return;
    }
    
    let comment = new Comment();
    comment.content = this.commentForm.get('content')?.value;
    comment.productId = this.getProductId();
    comment.custommer = this.customer;

    this.commentService.createComment(comment).subscribe(data => {
      console.log(data);
      this.commentForm.reset();
      this.ngOnInit();
      Swal.fire("Comment successfull!", "You clicked the button!", "success");
    }, error => {
      console.log(error);
      Swal.fire("Comment error!", "System error!", "error");
    })
  }

  getComment() {
    this.commentService.getComment(this.getProductId()).subscribe((data:any) => {
      console.log(data);
      this.comments = data;
      this.totalLength = this.comments.length;
    })
  }
}
