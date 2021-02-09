import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module'
import { User } from '../../../shared/models/user.interface'
import { LayoutService } from '../../../services/layout.service';
import { CustomBreakpointNames } from '../../../services/breakpoints.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { DialogRolComponent } from "../dialog-rol/dialog-rol.component";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
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
export class CrudComponent {
  tipoUser: string;//variable que almacena el tipo de usuario devuelto por el dialog-rol-component
  public cambios$: Observable<Boolean>//observable que contiene el tamanio de la pantalla (Sirve para ridemsionar)
  public tiposUsers: [{ 'ADMIN': 0 }, { 'USER': 1 }, { 'CLIENT': 2 }];//diccionario para automatizar lo del usuario
  displayedColumns: string[] = ['uid', 'displayName', 'email', 'cel', 'role', 'acciones'];
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
  constructor(private layoutService: LayoutService, public dialog: MatDialog) {
    this.layoutService.subscribeToLayoutChanges().subscribe(observerResponse => {
      console.log(observerResponse)
      // You will have all matched breakpoints in observerResponse
      if (this.layoutService.isBreakpointActive(CustomBreakpointNames.extraSmall)) {
        // Do something here for extraSmall devices
        this.cambios$ = new BehaviorSubject(false);
        this.displayedColumns = ['displayName', 'email', 'acciones'];
        console.log('chica')
      }
      if (this.layoutService.isBreakpointActive(CustomBreakpointNames.extraLarge)) {
        // Do something here for extraSmall devices
        this.cambios$ = new BehaviorSubject(true);
        this.displayedColumns = ['uid', 'displayName', 'email', 'cel', 'role', 'acciones'];
        console.log('grande')
      }
    });


  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogRolComponent, {
      width: '250px',
      data: { tipoUser: this.tipoUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.tipoUser = result;
      console.log(this.tipoUser);
    });
  }

  confirmation = () =>
    this.dialog.open(ConfirmationDialogComponent, { data: 'prueba' })
      .afterClosed()
      .subscribe(result => {
        console.log(result)
        if (result == true) {
          console.log('confirmado')
          return true;
        } else return false;
      })





}
