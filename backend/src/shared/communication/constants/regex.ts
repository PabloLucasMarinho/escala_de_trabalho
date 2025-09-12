export const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const hourFormatRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
