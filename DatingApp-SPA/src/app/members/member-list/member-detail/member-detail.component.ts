import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertyifyService } from 'src/app/_services/alertyify.service';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs',{static:true}) memberTabs: TabsetComponent;
  user: User;
  constructor(private usesrService: UserService, private alertify: AlertyifyService,
              private route: ActivatedRoute) { 
              }



  images: GalleryItem[];
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params =>{
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active=true;;
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


  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
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
