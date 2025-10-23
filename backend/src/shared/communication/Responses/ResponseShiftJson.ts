export default class ResponseShiftJson {
  id: string = String();
  dateInit: Date = new Date();
  dateEnd: Date = new Date();
  weekday: string = String();
  frequency: string = String();
  workplace: string = String();
  employee: string = String();
  createdBy: string | undefined;
  updatedBy: string | undefined;
}
