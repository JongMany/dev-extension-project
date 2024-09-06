export default class Time {
  private id?: string;
  private readonly programDuration: number;
  private readonly programmingDate: Date;
  private readonly programDay: Date;
  private readonly apiKey: string;
  private readonly programmingLanguage: string;
  private readonly fileName: string;
  private readonly project: string[];

  constructor(
      id: string,
      programDuration: number,
      programDay: Date,
      programmingDate: Date,
      apiKey: string,
      programmingLanguage: string,
      fileName: string,
      project: string[]
  ) {
    this.id = id;
    this.programmingLanguage = programmingLanguage;
    this.programDay = programDay;
    this.programDuration = programDuration
    this.programmingDate = programmingDate;
    this.apiKey = apiKey;
    this.fileName = fileName;
    this.project = project;
  }

  getProgramDuration() {
    return this.programDuration;
  }

  getProgramDay() {
    return this.programDay;
  }


  getProgrammingDate(){
    return this.programmingDate;
  }

  getTimeObject() {
    return {
      // id: this.id,
      programmingLanguage: this.programmingLanguage,
      programDay: this.programDay,
      programDuration: this.programDuration,
      programmingTime: this.programmingDate,
      fileName: this.fileName,
      project: this.project
    }
  }
}