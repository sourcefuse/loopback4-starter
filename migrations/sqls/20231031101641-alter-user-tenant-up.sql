ALTER TABLE lbstarter.user_tenants
ADD deleted_by varchar(200);

ALTER TABLE lbstarter.user_tenants
ADD deleted_on timestamptz;
