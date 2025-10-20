export default class ResponseGetAllShiftsJson {
  public id: string = String();
  public dateInit: Date = new Date();
  public dateEnd: Date = new Date();
  public weekday: string = String();
  public frequency: string = String();
  public workplace: string = String();
  public employee: string = String();
}
