import { Component, EventEmitter, Output } from '@angular/core';
import { UserForm } from '../../../core/services/global/user-form';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../core/services/user';
import { Alerts } from '../../../core/services/global/alerts';
import { CommonModule } from '@angular/common';
import { IdentificationTypeInterface } from '../../../core/interfaces/global/identificationtype.interface';
import { IdentificationType } from '../../../core/services/global/identification-type';
import { GenderInterface } from '../../../core/interfaces/gender.interface';
import { Profession } from '../../../core/services/profession';
import { ProfessionInCategoryInterface } from '../../../core/interfaces/profession.interface';
import { CityInterface, CountryInterface, DepartmentInterface } from '../../../core/interfaces/global/location.interface';
import { Locations } from '../../../core/services/global/location';
import { CreateUserInterface } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-user-form-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss'
})
export class UserFormComponent {

  showPassword: boolean = false;
  loading: boolean = false;
  identificationTypes: IdentificationTypeInterface[] = [];
  professions: ProfessionInCategoryInterface[] = [];
  countries: CountryInterface[] = [];
  departments: DepartmentInterface[] = [];
  cities: CityInterface[] = [];

  genderoptions: GenderInterface[] = [
    {
      genderlabel: 'Masculino',
      gendervalue: 'M'
    },
    {
      genderlabel: 'Femenino',
      gendervalue: 'F'
    },
    {
      genderlabel: 'Otro',
      gendervalue: 'O'
    }
  ]

  userForm: FormGroup = new FormGroup({
    firstname: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    lastname: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    username: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    useremail: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.email]),
    userpassword: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
    userphone: new FormControl<string | null>(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    identificationtypeuuid: new FormControl<string | null>('', [Validators.required]),
    useridentificationnumber: new FormControl<number | null>(null, [Validators.required, Validators.minLength(10)]),
    usergender: new FormControl<string | null>(''),
    professionuuid: new FormControl<string | null>(''),
    countryuuid: new FormControl<string | null>(''),
    deptouuid: new FormControl<string | null>(''),
    cityuuid: new FormControl<string | null>(''),
    useraddress: new FormControl<string | null>(null),
    dateOfBirth: new FormControl<Date | null>(null),
    isActive: new FormControl<boolean>(true),
  });

  constructor(
    private userFormService: UserForm,
    private userService: User,
    private alertService: Alerts,
    private identificationTypeService: IdentificationType,
    private professionService: Profession,
    private locationService: Locations
  ) { }

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  isOpen: boolean = false;
  private subscription!: Subscription;

  private onConfirmCallback: () => void = () => { };
  private onCancelCallback: () => void = () => { }


  ngOnInit(): void {
    this.getIdentificationsTypes();
    this.getProfessionsByCategory();
    this.getCountries();
    this.subscription = this.userFormService.form$.subscribe(({ onConfirm, onCancel }) => {
      this.onConfirmCallback = onConfirm;
      this.onCancelCallback = onCancel;
      this.onOpen();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onOpen() {
    this.isOpen = true;
  }

  onClose() {
    this.userForm.reset();
    this.userForm.patchValue({
      countryuuid: '',
      deptouuid: '',
      cityuuid: '',
      professionuuid: '',
      usergender: '',
      identificationtypeuuid: ''
    });
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
    this.isOpen = false;
  }

  onConfirm() {
    // this.confirm.emit();
    this.addNewUser();
    this.onClose();
  }

  addNewUser() {
    this.loading = true;
    const newUserData: CreateUserInterface = {
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      username: this.userForm.value.username,
      useremail: this.userForm.value.useremail,
      userpassword: this.userForm.value.userpassword,
      userphone: this.userForm.value.userphone,
      identificationtypeuuid: this.userForm.value.identificationtypeuuid,
      useridentificationnumber: parseInt(this.userForm.value.useridentificationnumber),
      usergender: this.userForm.value.usergender,
      professionuuid: this.userForm.value.professionuuid,
      cityuuid: this.userForm.value.cityuuid,
      useraddress: this.userForm.value.useraddress,
      dateOfBirth: this.userForm.value.dateOfBirth,
      isActive: this.userForm.value.isActive || true
    };

    this.userService.addUser(newUserData).subscribe({
      next: () => {
        this.loading = false;
        this.alertService.showAlert('Usuario creado exitosamente.', 'success');
        this.onConfirmCallback();
        this.onClose();
      },
      error: (err) => {
        // Todo manejar errores específicos
        this.loading = false;
        this.alertService.showAlert('Error al crear el usuario.', 'error');
      }
    });
  }

  onCancel() {
    this.cancel.emit();
    this.onClose();
  }

  getIdentificationsTypes() {
    this.identificationTypeService.getIdentificationTypes().subscribe({
      next: (res) => {
        this.identificationTypes = res;
      },
      error: (err) => {
        this.alertService.showAlert('Error al cargar los tipos de identificación.', 'error');
      }
    });
  }

  getProfessionsByCategory() {
    this.professionService.getAllProfessions().subscribe({
      next: (res) => {
        this.professions = res;
      },
      error: (err) => {
        this.alertService.showAlert('Error al cargar las profesiones.', 'error');
      }
    });
  }

  getCountries() {
    this.locationService.getAllCountries().subscribe({
      next: (res) => {
        this.countries = res;
      },
      error: (err) => {
        this.alertService.showAlert('Error al cargar los países.', 'error');
      }
    });
  }

  getDepartmentsByCountry(countryuuid: string) {
    this.locationService.getDepartmentsByCountry(countryuuid).subscribe({
      next: (res) => {
        this.departments = res;
      },
      error: (err) => {
        this.alertService.showAlert('Error al cargar los departamentos.', 'error');
      }
    });
  }

  getCitiesByDepartment(departmentuuid: string) {
    this.locationService.getCitiesByDepartment(departmentuuid).subscribe({
      next: (res) => {
        this.cities = res;
      },
      error: (err) => {
        this.alertService.showAlert('Error al cargar las ciudades.', 'error');
      }
    });
  }


  onInputNumberOnly(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
  }

}
