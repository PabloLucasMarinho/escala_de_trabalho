export const checkParamsId = (paramsId: string | undefined): string => {
  if (!paramsId || typeof paramsId !== "string") {
    throw new Error("ID não informado ou inválido.");
  }

  return paramsId;
};
