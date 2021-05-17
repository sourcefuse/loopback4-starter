SET search_path TO lbstarter,public;

CREATE TABLE tenants (
	id                   integer  NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	name                 varchar(100)  NOT NULL ,
	"type"               varchar(50)  NOT NULL ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	created_by           integer   ,
	modified_by          integer   ,
	deleted              bool DEFAULT false NOT NULL ,
	address1             varchar(100)   ,
	address2             varchar(100)   ,
	address3             varchar(100)   ,
	address4             varchar(100)   ,
	city                 varchar(100)   ,
	"state"              varchar(100)   ,
	zip                  varchar(20)   ,
	country              varchar(50)   ,
	status               varchar(50) DEFAULT 'active'::character varying NOT NULL ,
	CONSTRAINT pk_tenant_id PRIMARY KEY ( id )
 );

CREATE INDEX idx_tenants_created_by ON tenants ( created_by );

CREATE INDEX idx_tenants_modified_by ON tenants ( modified_by );

ALTER TABLE users DROP CONSTRAINT fk_users_roles;

ALTER TABLE users DROP COLUMN role_id;
ALTER TABLE users DROP COLUMN status;
ALTER TABLE users DROP CONSTRAINT fk_users_users;
ALTER TABLE users DROP CONSTRAINT fk_users_users_modified_by;

CREATE TABLE user_tenants (
	id                   integer  NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	user_id              integer  NOT NULL ,
	tenant_id            integer  NOT NULL ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	deleted              bool DEFAULT false NOT NULL ,
	role_id              integer NOT NULL ,
	status               varchar(50) DEFAULT 'active'::character varying NOT NULL ,
	CONSTRAINT pk_user_tenant_id PRIMARY KEY ( id )
 );

ALTER TABLE users ADD CONSTRAINT fk_user_user_tenant_created_by FOREIGN KEY ( created_by ) REFERENCES user_tenants( id );
ALTER TABLE users ADD CONSTRAINT fk_user_user_tenant_modified_by FOREIGN KEY ( modified_by ) REFERENCES user_tenants( id );


ALTER TABLE user_permissions RENAME COLUMN user_id TO user_tenant_id;

ALTER TABLE user_permissions DROP CONSTRAINT fk_created_by;
ALTER TABLE user_permissions DROP CONSTRAINT fk_modified_by;
ALTER TABLE user_permissions DROP CONSTRAINT fk_user_permissions;

ALTER TABLE user_permissions ADD CONSTRAINT fk_created_by FOREIGN KEY ( created_by ) REFERENCES user_tenants( id );

ALTER TABLE user_permissions ADD CONSTRAINT fk_modified_by FOREIGN KEY ( modified_by ) REFERENCES user_tenants( id );

ALTER TABLE user_permissions ADD CONSTRAINT fk_user_tenant_permissions FOREIGN KEY ( user_tenant_id ) REFERENCES user_tenants( id );

ALTER TABLE user_permissions RENAME TO user_tenant_permissions;

CREATE INDEX idx_user_tenant_tenant_id ON user_tenants ( tenant_id );

CREATE INDEX idx_user_tenant_user_id ON user_tenants ( user_id );

CREATE INDEX idx_user_tenants_role_id ON user_tenants ( role_id );

insert into tenants
  (id, name, type)
  values
  (1, 'application', 'application');

ALTER TABLE users ADD default_tenant integer DEFAULT 1 NOT NULL;
insert into user_tenants
  (user_id, tenant_id, role_id)
  values
  (1, 1, 1);


