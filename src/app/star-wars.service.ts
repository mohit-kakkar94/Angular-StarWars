import { Injectable } from "@angular/core";
import { LogService } from "./log.service";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StarWarsService {

  private characters = [
    {name: 'Luke Skywalker', side: ''},
    {name: 'Darth Vader', side: ''}
  ];
  logService: LogService;
  charactersChanged = new Subject<void>();
  httpClient: HttpClient;

  constructor(logService: LogService, httpClient: HttpClient) {
    this.logService = logService;
    this.httpClient = httpClient;
  }

  fetchCharacters() {
    this.httpClient.get('https://swapi.dev/api/people')
    .subscribe(
      (response: any) => {
        this.characters = response.results;
        this.charactersChanged.next();
        console.log(this.characters);
      }
    );
  }

  getCharacters(chosenList) {

    if (chosenList === 'all') {
      return this.characters.slice();
    }

    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  onSideChosen(charInfo) {

    const pos = this.characters.findIndex((char) => {
        return char.name === charInfo.name;
      }
    );
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of ' + charInfo.name + '. Changed side = ' + charInfo.side + '!');

  }

  addCharacter(name, side) {

    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });

    if (pos !== -1) {
      return;
    }

    const newChar = {name: name, side: side};
    this.characters.push(newChar);

  }

}
