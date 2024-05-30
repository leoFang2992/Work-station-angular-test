//all module for angular material we used.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatMenuModule, MatFormFieldModule, MatCardModule, MatInputModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatNativeDateModule, MatButtonToggleModule, MatDialogModule, MatCheckboxModule, MatLabel, MatTooltipModule, MatExpansionModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatExpansionModule,
    ScrollDispatchModule
  ],
  exports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatExpansionModule,
    ScrollDispatchModule
  ],
  declarations: []
})
export class MaterialModule { }
