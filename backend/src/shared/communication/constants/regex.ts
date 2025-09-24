export const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;

export const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const hourFormatRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
