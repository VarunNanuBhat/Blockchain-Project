import { Component } from '@angular/core';

function log(target,name,descriptor) {
  console.log(target,name,descriptor)
  const original
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';
  @log
  aSimpleMethod() {
    console.log("Hey there!")
  }
}
