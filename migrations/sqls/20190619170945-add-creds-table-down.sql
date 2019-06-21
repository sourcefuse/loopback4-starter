SET search_path TO lbstarter,public;

ALTER TABLE users ADD "password" varchar(60);
UPDATE users set password=user_credentials.password from (select user_id, password from user_credentials) as user_credentials where users.id = user_credentials.user_id;
ALTER TABLE users ALTER COLUMN "password" SET NOT NULL;

ALTER TABLE user_credentials DROP CONSTRAINT fk_user_credentials_users;
DROP TABLE user_credentials;
