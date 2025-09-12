export interface IRegisterShiftDTO {
  effectiveDate: string;
  terminationDate: string;
  shiftStart: string;
  shiftEnd: string;
  weekday: string;
  workplace?: string;
  employee?: string;
}
