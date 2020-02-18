import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertyifyService } from 'src/app/_services/alertyify.service';
import { ActivatedRoute } from '@angular/router';

import { GalleryItem, ImageItem } from '@ngx-gallery/core';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(private usesrService: UserService, private alertify: AlertyifyService,
              private route: ActivatedRoute) { }



  images: GalleryItem[];
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.images = this.getImages();
  }

  getImages(){
    const imageUrls = [];
    for (const photo of this.user.photos) {

      imageUrls.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
    return imageUrls;
  }

  /*loadUser(){
    this.usesrService.getUser(+this.route.snapshot.params['id'])
    .subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertify.error(error);
    });
  }*/
}
