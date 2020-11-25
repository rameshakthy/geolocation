import {Component, OnInit} from '@angular/core';
import {Appearance, GermanAddress, Location} from '@angular-material-extensions/google-maps-autocomplete';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {FormControl, FormGroup} from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'google-maps-autocomplete';

  addressFormGroup: FormGroup;

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public showAsDirective = false;
  public showAsComponent = true;

  addressValue: GermanAddress = {
    streetNumber: '100',
    streetName: 'Your StreetName',
    vicinity: 'Your vicinity',
    postalCode: 37084,
    locality: {
      long: 'your locality'
    }
  };

  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    angulartics2GoogleAnalytics.startTracking();
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAddressSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  flip() {
    this.showAsDirective = !this.showAsDirective;
    this.showAsComponent = !this.showAsDirective;
  }

  onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
  }

  ngOnInit(): void {
    this.addressFormGroup = new FormGroup({
      // address: new FormControl(this.addressValue),
      address: new FormControl(),
    });

    this.addressFormGroup.get('address').valueChanges.subscribe(value => console.log('value changed', value))
  }
}
