import { constants } from "../../../helper/constant";

export const createUserQuery = `INSERT INTO userTable 
(firstName, lastName, email, imageURL, createdBy, password, userType) 
VALUES($1, $2, $3, $4, $5, $6, $7);
`;

export const getUserAllQuery = `SELECT * FROM userTable WHERE email = $1 OR userId = $2;`;

export const getUserQuery = `SELECT userId, firstName, lastName, email, imageURL, createdAt, createdBy, deleted, deleteBy, userType 
FROM userTable WHERE deleted != TRUE AND (email = $1 OR userId = $2);`;

export const getAllUserQuery = `
SELECT userId, firstName, lastName, email, imageURL, createdAt, createdBy, deleted, deleteBy, userType
FROM userTable
WHERE deleted != TRUE LIMIT ${constants.QUERY_PAGINATION} OFFSET $1;
`;
