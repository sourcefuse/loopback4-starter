DROP TABLE lbstarter.tenants CASCADE;

ALTER TABLE lbstarter.users ADD role_id integer DEFAULT 1 NOT NULL;
ALTER TABLE lbstarter.users ADD status varchar(50) DEFAULT 'active'::character varying NOT NULL;
ALTER TABLE lbstarter.users DROP CONSTRAINT fk_user_user_tenant_created_by;
ALTER TABLE lbstarter.users DROP CONSTRAINT fk_user_user_tenant_modified_by;
ALTER TABLE lbstarter.users ADD CONSTRAINT fk_users_users FOREIGN KEY ( created_by ) REFERENCES lbstarter.users( id );
ALTER TABLE lbstarter.users ADD CONSTRAINT fk_users_users_modified_by FOREIGN KEY ( modified_by ) REFERENCES lbstarter.users( id );
ALTER TABLE lbstarter.users ADD CONSTRAINT fk_users_roles FOREIGN KEY ( role_id ) REFERENCES lbstarter.roles( id );

ALTER TABLE lbstarter.user_tenant_permissions RENAME COLUMN user_tenant_id TO user_id;
ALTER TABLE lbstarter.user_tenant_permissions DROP CONSTRAINT fk_created_by;
ALTER TABLE lbstarter.user_tenant_permissions DROP CONSTRAINT fk_modified_by;
ALTER TABLE lbstarter.user_tenant_permissions DROP CONSTRAINT fk_user_tenant_permissions;
ALTER TABLE lbstarter.user_tenant_permissions ADD CONSTRAINT fk_created_by FOREIGN KEY ( created_by ) REFERENCES lbstarter.users( id );
ALTER TABLE lbstarter.user_tenant_permissions ADD CONSTRAINT fk_modified_by FOREIGN KEY ( modified_by ) REFERENCES lbstarter.users( id );
ALTER TABLE lbstarter.user_tenant_permissions ADD CONSTRAINT fk_user_permissions FOREIGN KEY ( user_id ) REFERENCES lbstarter.users( id );
ALTER TABLE lbstarter.user_tenant_permissions RENAME TO user_permissions;
DROP TABLE lbstarter.user_tenants CASCADE;

ALTER TABLE lbstarter.users DROP COLUMN default_tenant;
