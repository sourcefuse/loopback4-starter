/* Replace with your SQL commands */
SET search_path TO lbstarter,public;

insert into roles
  (id, name, role_key)
  values
  (1, 'super_admin', 1);
insert into roles
  (id, name, role_key)
  values
  (2, 'admin', 2);
insert into roles
  (id, name, role_key)
  values
  (3,'subscriber', 3);

insert into tenants
  (id, name, type)
  values
  (1, 'application', 'application');

/* Password - test123!@# */
insert into users
  (id, first_name, last_name, username, password, default_tenant)
  values
  (1, 'Super', 'Admin', 'super_admin', '$2b$10$rlt88JBHAUW2Ow3wV.KZYeUgd08.qXKcs4yLDaQfDFLHbGWw1f/sK', 1);
insert into user_tenants
  (user_id, tenant_id, role_id)
  values
  (1, 1, 1);
