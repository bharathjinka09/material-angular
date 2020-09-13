import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'material-angular';
  notifications = 2;
  showSpinner = false;
  opened = false;

  selectedValue: string;
  multiSelectedValue: string;

  radioButton: boolean = false;
  checkboxValue: boolean = false;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

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
    let dialogRef = this.dialog.open(DialogExampleComponent,{data:{name:'Bharath'}});

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
