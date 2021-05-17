/* Replace with your SQL commands */
ALTER TABLE lbstarter.auth_clients ADD deleted_on date   ;

ALTER TABLE lbstarter.auth_clients ADD deleted_by varchar   ;

ALTER TABLE lbstarter.roles ADD deleted_on date   ;

ALTER TABLE lbstarter.roles ADD deleted_by varchar   ;

ALTER TABLE lbstarter.users ADD deleted_on date   ;

ALTER TABLE lbstarter.users ADD deleted_by varchar   ;
