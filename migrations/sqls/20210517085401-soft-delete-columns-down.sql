/* Replace with your SQL commands */
ALTER TABLE lbstarter.auth_clients DROP COLUMN deleted_on;

ALTER TABLE lbstarter.auth_clients DROP COLUMN deleted_by;

ALTER TABLE lbstarter.roles DROP COLUMN deleted_on;

ALTER TABLE lbstarter.roles DROP COLUMN deleted_by;

ALTER TABLE lbstarter.users DROP COLUMN deleted_on;

ALTER TABLE lbstarter.users DROP COLUMN deleted_by;
