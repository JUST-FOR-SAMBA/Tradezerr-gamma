import { v4 as uuidv4 } from "uuid";

export const uuidGenerator = () => {
  const uuid = uuidv4().split("-");
  return uuid[0];
};
