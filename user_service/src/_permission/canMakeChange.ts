import IUser from "../interfaces/user";
import Role from "../_helpers/role";

export const canMakeChange = (useRole: string) => {
  return (
    useRole == Role.Admin ||
    useRole == Role.BusinessOwner ||
    useRole == Role.BusinessOwner
  );
};
