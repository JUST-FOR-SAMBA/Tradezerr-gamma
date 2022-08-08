import { Role } from "../models";
import Roles from "./role";

export const initial = () => {
  Role.estimatedDocumentCount((err: any, count: number) => {
    if (!err && count === 0) {
      new Role({
        name: Roles.Lender,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'lender' to roles collection");
      });

      new Role({
        name: Roles.BusinessOwner,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'business owner' to roles collection");
      });

      new Role({
        name: Roles.Admin,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};
