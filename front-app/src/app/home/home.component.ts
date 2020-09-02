import {Component, OnInit} from '@angular/core';
import {AdduserService} from '../adduser.service'
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {faEdit, faSort, faTrash , faUpload,faEye} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  name: String;
  surname: String;
  email: String;
  role: String;
  arr = [];
  userId: String;
  searchText: String = '';
  config: { itemsPerPage: Number, currentPage: Number, totalItems: Number };
  uniqueRole = [];
  event: Number = 0;
  totalItems: Number = 10;
  sortCurrentState: Number = 1;
  sortCurrentName: String = 'name';
  closeResult: string;
  selectedLevel: Number = 10;
  file = [];
  controleRoleFile:String = '*'
  faEdit = faEdit;
  faSort = faSort;
  faTrash = faTrash;
  faUpload = faUpload;
  faEye = faEye;

  constructor(private router: Router,
              private userService: AdduserService,
              private flashMessages: FlashMessagesService,
              private modalService: NgbModal
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 10
    };
  }

   ngOnInit() :void {
    this.getUsertemp()
  }
  selectImage(event) {
    this.file.push(...event.addedFiles);
    console.log(this.file)

  }
  onRemove(event) {
    console.log(event);
    this.file = []
  }
  logoutUser(){
    this.userService.logout()
    this.flashMessages.show('LogOut Completed',{
      cssClass:'alert-success',
      timeout:4000
    })
    this.router.navigate(['/login'])
  }
  openFile(userId) {
     this.userId = userId
      console.log(`open file user: ${this.userId}`)
    this.userService.getFile(this.userId).subscribe(data=>{
      if (!data.success) {
        this.flashMessages.show(data.message,{
          cssClass: 'alert-danger',
          timeout:4000
        })
    }
    else {
       const path = data.data.path.split('/').pop()
       const url ="assets/uploads/"+path;
       const type = data.data.mimetype;
       const newTab = window.open('about:blank', '_blank');
       newTab.document.write("<div style='text-align: center'><object width='80%' height='800' data='" + url + "' type='"+ type +"' ></object></div>");
    }
  })
 }
  onSubmit(){
    this.userService.uploadFile(this.file[0],this.userId).subscribe(data =>{
      if(!data.success) {
        this.flashMessages.show(data.message,{
          cssClass: 'alert-danger',
          timeout:4000
        })
        this.router.navigate(['/'])
      }else {
        this.router.navigate(['/'])
      }
    })
  }
  openModalUpload(id,role){
  role = role.toLowerCase()
    const roleObject = {
      'artist' : '.pdf',
      'designer':'.doc',
      'manager' :'image/*'
    }
    if(roleObject[role]){
      this.controleRoleFile = roleObject[role]
    }else {
      this.controleRoleFile = '*'
    }
    this.userId = id
  }
  pageChanged(event): void {

    this.config.currentPage = event;
    this.event = (event - 1) * Number(this.selectedLevel)
    this.getUsertemp()

  }

  selectedChange(event) {

    this.selectedLevel = Number(event.target.value);
    this.config.itemsPerPage = this.selectedLevel;
    this.getUsertemp()
  }

  open(content) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  openModalUpdate(temp): void {

    this.name = temp.name
    this.surname = temp.surname
    this.email = temp.email
    this.role = temp.role
    this.userId = temp._id

  }

  sort(event): void {

    const target = event.target || event.srcElement || event.currentTarget;
    this.sortCurrentState = this.sortCurrentState > 0 ? -1 : 1
    this.sortCurrentName = target.innerText.toLowerCase()
    this.getUsertemp()
  }

  reset(myForm): void {
    myForm.reset()
  }

  addUsertemp(): void {
    console.log('Get Starting addUser - - -')
    const user = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      role: this.role
    }
    this.userService.addUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        })
        this.router.navigate(['/'])
      } else {
        this.router.navigate(['/'])
      }

    })

    this.getUsertemp()

  }

  getUsertemp(): void {
    console.log('Get Starting getUser - - - ')
    console.log(this.totalItems)
    this.userService.getUser(this.event, this.sortCurrentName, this.sortCurrentState, this.selectedLevel,this.searchText,this.role).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        })
      } else {
        this.arr = data.data
        this.config.totalItems = data.totalItem
        this.arr.forEach(item => {
          if (!this.uniqueRole.includes(item.role))
            this.uniqueRole.push(item.role)
        })
        this.router.navigate(['/'])
      }
    })

  }

  deleteUsertemp(userId): void {
    console.log('Starting Delete User - - -')
    this.userService.deleteUser(userId).subscribe(data => {
      if (!data.success) {
        console.log('false')
        this.flashMessages.show(data.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        })
      } else {
        this.router.navigate(['/'])
      }
    })
    this.getUsertemp()

  }

  editUser(): void {
    console.log('Starting Update User - - -')
    const user = {
      _id: this.userId,
      name: this.name,
      surname: this.surname,
      email: this.email,
      role: this.role
    }
    this.userService.updateUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        })
      } else {
        this.router.navigate(['/'])
      }
    })
    this.getUsertemp()
  }
  selectRole(event){
    this.role = event.target.value;
    this.getUsertemp()
  }
  // getUserByRole(role): void {
  //   this.userService.getRole(role).subscribe(data => {
  //     if (!data.success) {
  //       this.flashMessages.show(data.message, {
  //         cssClass: 'alert-danger',
  //         timeout: 4000
  //       })
  //     } else {
  //       this.arr = data.data
  //       this.router.navigate(['/'])
  //     }
  //   })
  // }

}

