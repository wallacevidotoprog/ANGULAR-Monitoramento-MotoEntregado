import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-dropdown-generic',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-dropdown-generic.component.html',
  styleUrl: './input-dropdown-generic.component.css',
})
export class InputDropdownGenericComponent {
  @Input() id!: number;
  @Input() label: string = 'TIPO';

  arr = ['wallace','vidoto','de','miranda']
}
