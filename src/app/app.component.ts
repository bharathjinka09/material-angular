import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logData(row) {
    console.log(row);
  }

  title = 'material-angular';
  notifications = 2;
  showSpinner = false;
  opened = false;

  selectedValue: string;
  multiSelectedValue: string;

  radioButton: boolean = false;
  checkboxValue: boolean = false;
  numbers = [];

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    for (let i = 1; i <= 1000; i++) {
      this.numbers.push(i);
    }
  }

  openSnackbar(message, action) {
    this.snackBar.open(message, action);
  }

  deleteItem(message, action) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 3000 });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar dismissed');
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('Snackbar action triggered');
    });
  }

  minDate = new Date();
  maxDate = new Date(2019, 3, 10);

  dateFilter = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  options: string[] = ['Angular', 'React', 'Vue'];

  objectOptions = [
    { name: 'Angular' },
    { name: 'Angular Material' },
    { name: 'React' },
    { name: 'Vue' },
  ];

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.dataSource.sort = this.sort;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  logChange(index) {
    console.log(index);
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);
  }

  openCustomSnackbar() {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: 3000,
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogExampleComponent, {
      data: { name: 'Bharath' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'custom-snackbar',
  template: `<span style="color:orange">Custom Snackbar</span>`,
})
export class CustomSnackBarComponent {}
