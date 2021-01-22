import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module'
import { User } from '../../../shared/models/user.interface'

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
/*  uid: string;
  email: string;
  displayName?: string;
  emailVerified: boolean;
  password?: string;
  photoURL?: string;
  role?: Roles;*/

const ELEMENT_DATA: any[] = [
  { uid: '1', displayName: 'Hydrogen', email: "rogen@gmail.com", photoURL: 'H', cel: '00', role: 0, },
  { uid: '2', displayName: 'Helium', email: "lium@gmail.com", photoURL: 'He', cel: '00', role: 0, },
  { uid: '3', displayName: 'Lithium', email: "thium@gmail.com", photoURL: 'Li', cel: '00', role: 0, },
  { uid: '4', displayName: 'Beryllium', email: "llium@gmail.com", photoURL: 'Be', cel: '00', role: 0, },
  { uid: '5', displayName: 'Boron', email: "ron@gmail.com", photoURL: 'B', cel: '00', role: 0, },
  { uid: '6', displayName: 'Carbon', email: "bon@gmail.com", photoURL: 'C', cel: '00', role: 0, },
  { uid: '7', displayName: 'Nitrogen', email: "rogen@gmail.com", photoURL: 'N', cel: '00', role: 0, },
  { uid: '8', displayName: 'Oxygen', email: "ygen@gmail.com", photoURL: 'O', cel: '00', role: 0, },
  { uid: '9', displayName: 'Fluorine', email: "orine@gmail.com", photoURL: 'F', cel: '00', role: 0, },
  { uid: '10', displayName: 'Neon', email: "on@gmail.com", photoURL: 'Ne', cel: '00', role: 0, },
];
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['uid', 'displayName', 'email', 'photoURL', 'cel', 'role', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
