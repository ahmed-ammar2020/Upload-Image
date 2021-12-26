import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService, Post } from '../post.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  postForm = new FormGroup({
    postText: new FormControl(''),
  });

  selectedFile: File;

  posts: any[] = [];

  constructor(
    private storage: AngularFireStorage,
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.postService.getPost().subscribe((posts: any) => {
      this.posts = posts;
    });
  }

  onFileSelected(e: any) {
    this.selectedFile = e.target.files[0];
  }

  post() {
    if (this.selectedFile) {
      this.uploadImage().then((imageUrl) => {
        let post = {
          username: localStorage.getItem('username'),
          imageUrl,
          text: this.postForm.value.postText,
          likes: [],
          comments: [],
        };

        this.postService.saveNewPost(post).subscribe((res) => {
          console.log(res);
        });

        this.posts.push(post);

        this.selectedFile = undefined;
      });
    } else {
      let post = {
        username: localStorage.getItem('username'),
        text: this.postForm.value.postText,
        likes: [],
        comments: [],
      };

      this.postService.saveNewPost(post).subscribe((res) => {
        console.log(res);
      });

      this.posts.push(post);
    }
  }

  uploadImage() {
    return new Promise((resolved) => {
      var n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`images/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            let imageUrl = fileRef.getDownloadURL();
            imageUrl.subscribe((url) => {
              if (url) {
                console.log(url);
                resolved(url);
              }
            });
          })
        )
        .subscribe((url) => {
          if (url) {
            console.log(url);
          }
        });
    });
  }
}
