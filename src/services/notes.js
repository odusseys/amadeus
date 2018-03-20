export const TOTAL_NOTES = 7;
export const TOTAL_TONES = 12;

export const DIESE = 1;
export const BECARRE = 0;
export const BEMOL = -1;

export const NOTE_NAMES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const NATURAL_TONES = [0, 2, 4, 5, 7, 9, 11];

export class Note {
  constructor(noteIndex, tone) {
    this.noteIndex = noteIndex;
    this.tone = tone;
    this.alteration = tone - NATURAL_TONES[noteIndex];
    this.name = NOTE_NAMES[noteIndex];
  }

  getTones() {
    return this.noteIndex < 3
      ? this.noteIndex * 2 + this.alteration
      : this.noteIndex * 2 - 1 + this.alteration;
  }

  toHtml(displayBecarre = false) {
    if (this.alteration === DIESE) {
      return this.name + '&#x266F';
    } else if (this.alteration === BEMOL) {
      return this.name + '&#x266D';
    } else {
      return displayBecarre ? this.name + '&#x266E' : this.name;
    }
  }

  toString(displayBecarre = false) {
    if (this.alteration === DIESE) {
      return this.name + '\u266F';
    } else if (this.alteration === BEMOL) {
      return this.name + '\u266D';
    } else {
      return displayBecarre ? this.name + '\u266E' : this.name;
    }
  }

  _transformRawAscending(notes, tones) {
    let newNote = (this.noteIndex + notes) % TOTAL_NOTES;
    let newTone = (this.tone + tones) % TOTAL_TONES;
    return new Note(newNote, newTone);
  }

  transform(interval, ascending) {
    if (ascending) {
      return this._transformRawAscending(interval.notes, interval.tones);
    } else {
      return this._transformRawAscending(
        TOTAL_NOTES - interval.notes,
        TOTAL_TONES - interval.tones
      );
    }
  }

  is(other) {
    return this.noteIndex === other.noteIndex && this.tone === other.tone;
  }

  isLike(other) {
    return this.tone === other.tone;
  }

  static random() {
    let noteIndex = Math.floor(Math.random() * TOTAL_NOTES);
    let alteration = Math.floor(Math.random() * 3) - 1;
    return Note.fromAlteration(noteIndex, alteration);
  }

  static fromAlteration(noteIndex, alteration) {
    return new Note(noteIndex, NATURAL_TONES[noteIndex] + alteration);
  }
}

/* 'tones,notes': [name, short] */
const INTERVAL_NAMES = {
  '0,0': ['unisson', '1J'],
  '1,1': ['seconde mineure', '2m'],
  '2,1': ['seconde majeure', '2M'],
  '3,2': ['tierce mineure', '3m'],
  '4,2': ['tierce majeure', '3M'],
  '4,3': ['quarte diminuée', '4d'],
  '5,3': ['quarte juste', '4J'],
  '6,3': ['quarte augmentée', '4A'],
  '6,4': ['quinte diminuée', '5d'],
  '7,4': ['quinte juste', '5J'],
  '8,4': ['quinte augmentée', '5A'],
  '8,5': ['sixte mineure', '6m'],
  '9,5': ['sixte majeure', '6M'],
  '10,6': ['septième mineure', '7m'],
  '11,6': ['septième majeure', '7M'],
  '12,7': ['octave juste', '8J']
};

export class Interval {
  constructor(tones, notes) {
    let names = INTERVAL_NAMES[`${tones},${notes}`];
    this.name = names[0];
    this.short = names[1];
    this.tones = tones;
    this.notes = notes;
  }
}

const INTERVAL_FROM_SHORT = {};
for (var code in INTERVAL_NAMES) {
  let [tone, note] = code.split(',').map(t => parseInt(t));
  let names = INTERVAL_NAMES[code];
  INTERVAL_FROM_SHORT[names[1]] = new Interval(tone, note);
}

export function getIntervalFromShort(short) {
  return INTERVAL_FROM_SHORT[short];
}

export function getNoteRank(tone) {
  return tone < 5 ? tone / 2 : (tone + 1) / 2;
}
