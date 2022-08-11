import Role from "../_helpers/role";

export const canMakeChange = (useRole: string) => {
  return useRole == Role.Admin;
};
