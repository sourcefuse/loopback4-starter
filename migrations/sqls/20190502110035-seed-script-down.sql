/* Replace with your SQL commands */
SET search_path TO admin,public;

alter table user_tenants drop constraint fk_user_tenants_roles;
alter table tenants drop constraint fk_created_by;
alter table tenants drop constraint fk_modified_by;
alter table users drop constraint fk_users_tenants_default_tenant;
alter table user_tenant_permissions drop constraint fk_user_tenant_permissions;
alter table users drop constraint fk_user_user_tenant_created_by;
alter table users drop constraint fk_user_user_tenant_modified_by;
delete from roles;
delete from groups;
delete from user_tenants;
delete from user_tenant_permissions;
delete from tenants;
delete from users;
