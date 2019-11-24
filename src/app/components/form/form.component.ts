import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../api.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  @Output() apiData = new EventEmitter();

  zipForm: FormGroup;
  formattedMessage: number;
  private http: any;
  data: any;
  temperature: number = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
  }

  ngOnInit() {
    this.zipForm = this.formBuilder.group({
      zip: null
    });

    this.onChanges();
  }

  onChanges(): void {
    this.zipForm.valueChanges.subscribe(val => {
      this.formattedMessage = val.zip;
    });
  }

  logZip() {
    console.log(this.formattedMessage);

    this.apiService.getWeatherByZip(this.formattedMessage).subscribe(
      (res) => {
        console.log(res);
        this.data = res;
        this.convertTemp(this.data.main.temp);
      }
    );

    this.apiData.emit(this.data);
  }

  convertTemp(kelvin: number) {
    const celsius = kelvin - 273;
    this.temperature = Math.floor(celsius * (1.8) + 32);
  }
}
