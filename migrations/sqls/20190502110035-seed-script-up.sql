/* Replace with your SQL commands */
SET search_path TO lbstarter,public;

insert into roles
  (id, name, role_key, permissions)
  values
  (1, 'super_admin', 1, '{ViewOwnUser,ViewAnyUser,ViewTenantUser,CreateAnyUser,CreateTenantUser,UpdateOwnUser,UpdateTenantUser,UpdateAnyUser,DeleteTenantUser,DeleteAnyUser,ViewTenant,CreateTenant,UpdateTenant,DeleteTenant,ViewRole,CreateRole,UpdateRole,DeleteRole,ViewAudit,CreateAudit,UpdateAudit,DeleteAudit}');
insert into roles
  (id, name, role_key, permissions)
  values
  (2, 'admin', 2, '{ViewOwnUser,ViewTenantUser,CreateTenantUser,UpdateOwnUser,UpdateTenantUser,DeleteTenantUser,ViewTenant,ViewRole}');
insert into roles
  (id, name, role_key, permissions)
  values
  (3,'subscriber', 3, '{ViewOwnUser,ViewTenant,ViewRole}');

insert into tenants
  (id, name, type)
  values
  (1, 'application', 'application');

/* Password - test123!@# */
insert into users
  (id, first_name, last_name, username, password, default_tenant)
  values
  (1, 'Super', 'Admin', 'super_admin', '$2a$10$TOLMGK43MjbibS8Jap2RXeHl3.4sJcR3eFbms2dBll2LTMggSK9hG', 1);
insert into user_tenants
  (user_id, tenant_id, role_id)
  values
  (1, 1, 1);
