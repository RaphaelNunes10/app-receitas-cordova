import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaskitoDirective } from '@maskito/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaskitoDirective,
    EditPageRoutingModule,
  ],
  declarations: [EditPage],
})
export class EditPageModule {}
