CREATE TABLE asset (id BIGINT AUTO_INCREMENT, asset_type_id BIGINT NOT NULL, user_id BIGINT NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255), is_active TINYINT(1) DEFAULT '0', views BIGINT, ugc TINYINT(1) DEFAULT '0', date_start DATETIME, date_end DATETIME, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, slug VARCHAR(255), INDEX is_active_idx_idx (is_active), UNIQUE INDEX asset_sluggable_idx (slug), INDEX asset_type_id_idx (asset_type_id), INDEX user_id_idx (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_answer (id BIGINT AUTO_INCREMENT, asset_id BIGINT NOT NULL, asset_question_id BIGINT NOT NULL, answer VARCHAR(255) NOT NULL, votes BIGINT, INDEX asset_id_idx (asset_id), INDEX asset_question_id_idx (asset_question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_audio (id BIGINT AUTO_INCREMENT, asset_id BIGINT NOT NULL, file VARCHAR(255) NOT NULL, original_file VARCHAR(255) NOT NULL, genre VARCHAR(255), source VARCHAR(255), author VARCHAR(255), interpret VARCHAR(255), composer VARCHAR(255), year VARCHAR(255), label VARCHAR(255), extension VARCHAR(255) NOT NULL, original_file_size VARCHAR(255) NOT NULL, duration VARCHAR(255), INDEX asset_id_idx (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_audio_gallery (id BIGINT AUTO_INCREMENT, asset_id BIGINT NOT NULL, headline VARCHAR(255), source VARCHAR(255), INDEX asset_id_idx (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_content (id BIGINT AUTO_INCREMENT, asset_id BIGINT NOT NULL, headline VARCHAR(255), content LONGBLOB, source VARCHAR(255), author VARCHAR(255), INDEX asset_id_idx (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_file (id BIGINT AUTO_INCREMENT, asset_id BIGINT NOT NULL, file VARCHAR(255) NOT NULL, genre VARCHAR(255), source VARCHAR(255), author VARCHAR(255), extension VARCHAR(255) NOT NULL, file_size VARCHAR(255) NOT NULL, INDEX asset_id_idx (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_image (id BIGINT AUTO_INCREMENT, asset_id BIGINT NOT NULL, file VARCHAR(255) NOT NULL, original_file VARCHAR(255) NOT NULL, headline VARCHAR(255), genre VARCHAR(255) NOT NULL, source VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, original_file_size VARCHAR(255) NOT NULL, width VARCHAR(255) NOT NULL, height VARCHAR(255) NOT NULL, extension VARCHAR(255) NOT NULL, INDEX asset_id_idx (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_image_gallery (id BIGINT AUTO_INCREMENT, asset_id BIGINT NOT NULL, headline VARCHAR(255), text LONGTEXT, source VARCHAR(255), INDEX asset_id_idx (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_question (id BIGINT AUTO_INCREMENT, asset_id BIGINT, asset_questionnaire_id BIGINT, question VARCHAR(255) NOT NULL, INDEX asset_id_idx (asset_id), INDEX asset_questionnaire_id_idx (asset_questionnaire_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_questionnaire (id BIGINT AUTO_INCREMENT, asset_id BIGINT NOT NULL, name VARCHAR(255) NOT NULL, headline VARCHAR(255), INDEX asset_id_idx (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_type (id BIGINT AUTO_INCREMENT, title VARCHAR(255) NOT NULL, description VARCHAR(255), model VARCHAR(255) NOT NULL, display_order BIGINT NOT NULL, is_active TINYINT(1) DEFAULT '0' NOT NULL, is_visible TINYINT(1) DEFAULT '0' NOT NULL, upload_input TINYINT(1) DEFAULT '0' NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, slug VARCHAR(255), INDEX is_active_idx_idx (is_active), INDEX upload_input_idx_idx (upload_input), INDEX is_visible_idx_idx (is_visible), UNIQUE INDEX asset_type_sluggable_idx (slug), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_video (id BIGINT AUTO_INCREMENT, asset_id BIGINT NOT NULL, youtube_id VARCHAR(255), youtube_thumb VARCHAR(255), file VARCHAR(255), original_file VARCHAR(255), headline VARCHAR(255), genre VARCHAR(255), source VARCHAR(255), author VARCHAR(255), width VARCHAR(255), height VARCHAR(255), extension VARCHAR(255), original_file_size VARCHAR(255), frame_rate VARCHAR(255), bitrate VARCHAR(255), duration VARCHAR(255), start_from VARCHAR(255), INDEX asset_id_idx (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_video_gallery (id BIGINT AUTO_INCREMENT, asset_id BIGINT NOT NULL, youtube_id VARCHAR(255), headline VARCHAR(255), source VARCHAR(255), INDEX asset_id_idx (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE asset_vote (id BIGINT AUTO_INCREMENT, asset_id BIGINT NOT NULL, ip VARCHAR(255) NOT NULL, INDEX asset_id_idx (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE chat (id BIGINT AUTO_INCREMENT, user_id BIGINT, message VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX user_id_idx (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE game (id BIGINT AUTO_INCREMENT, socket_id BIGINT, date_start DATETIME, date_end DATETIME, home_user_id BIGINT, home_team_id BIGINT, home_score BIGINT, away_user_id BIGINT, away_team_id BIGINT, away_score BIGINT, stadium_id BIGINT, access_code VARCHAR(255) NOT NULL, url VARCHAR(255) NOT NULL, status VARCHAR(255), created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX socket_id_idx (socket_id), INDEX home_user_id_idx (home_user_id), INDEX away_user_id_idx (away_user_id), INDEX home_team_id_idx (home_team_id), INDEX away_team_id_idx (away_team_id), INDEX stadium_id_idx (stadium_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE identity (id BIGINT AUTO_INCREMENT, name VARCHAR(127), user_id BIGINT, identifier VARCHAR(255), status VARCHAR(127), created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX user_id_idx (user_id), PRIMARY KEY(id)) ENGINE = INNODB;
CREATE TABLE image_usage (id BIGINT AUTO_INCREMENT, title VARCHAR(255) NOT NULL, description VARCHAR(255), width BIGINT NOT NULL, height BIGINT NOT NULL, background TINYINT(1) DEFAULT '0' NOT NULL, background_color VARCHAR(255), created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, slug VARCHAR(255), UNIQUE INDEX image_usage_sluggable_idx (slug), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE message (id BIGINT AUTO_INCREMENT, socket_id BIGINT, user_id BIGINT, socket_user_id VARCHAR(255), type VARCHAR(255), message VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX socket_id_idx (socket_id), INDEX user_id_idx (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE movement (id BIGINT AUTO_INCREMENT, game_id BIGINT, user_id BIGINT, message VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX game_id_idx (game_id), INDEX user_id_idx (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE online (id BIGINT AUTO_INCREMENT, user_id BIGINT, socket_id BIGINT, socket_user_id VARCHAR(255), status VARCHAR(255), INDEX user_id_idx (user_id), INDEX socket_id_idx (socket_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE related_asset (id BIGINT AUTO_INCREMENT, parent_asset_id BIGINT NOT NULL, asset_id BIGINT NOT NULL, type VARCHAR(255), description VARCHAR(255), is_active TINYINT(1) DEFAULT '0' NOT NULL, display_order BIGINT, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX is_active_idx_idx (is_active), INDEX asset_id_idx (asset_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE room (id BIGINT AUTO_INCREMENT, user_id BIGINT, socket_id BIGINT, title VARCHAR(255) NOT NULL, description VARCHAR(255), created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX user_id_idx (user_id), INDEX socket_id_idx (socket_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE socket (id BIGINT AUTO_INCREMENT, pid BIGINT, host VARCHAR(255), port VARCHAR(10), status VARCHAR(255), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE stadium (id BIGINT AUTO_INCREMENT, official_name VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, nickname VARCHAR(255) NOT NULL, capacity VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, inauguration VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, geo_location VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, slug VARCHAR(255), UNIQUE INDEX stadium_sluggable_idx (slug), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE tag (id BIGINT AUTO_INCREMENT, name VARCHAR(100), is_triple TINYINT(1), triple_namespace VARCHAR(100), triple_key VARCHAR(100), triple_value VARCHAR(100), INDEX name_idx (name), INDEX triple1_idx (triple_namespace), INDEX triple2_idx (triple_key), INDEX triple3_idx (triple_value), PRIMARY KEY(id)) ENGINE = INNODB;
CREATE TABLE tagging (id BIGINT AUTO_INCREMENT, tag_id BIGINT NOT NULL, taggable_model VARCHAR(30), taggable_id BIGINT, INDEX tag_idx (tag_id), INDEX taggable_idx (taggable_model, taggable_id), PRIMARY KEY(id)) ENGINE = INNODB;
CREATE TABLE team (id BIGINT AUTO_INCREMENT, official_name VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, nickname VARCHAR(255) NOT NULL, logo VARCHAR(255) NOT NULL, initials VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, is_active TINYINT(1) DEFAULT '0', created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, slug VARCHAR(255), INDEX is_active_idx_idx (is_active), UNIQUE INDEX team_sluggable_idx (slug), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE token (id BIGINT AUTO_INCREMENT, name VARCHAR(127), token_key LONGTEXT, token_secret LONGTEXT, user_id BIGINT, expire BIGINT, params LONGTEXT, identifier VARCHAR(255), status VARCHAR(127), o_auth_version SMALLINT, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX user_id_idx (user_id), PRIMARY KEY(id)) ENGINE = INNODB;
CREATE TABLE turn (id BIGINT AUTO_INCREMENT, game_id BIGINT, user_id BIGINT, message_id BIGINT, number BIGINT, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX game_id_idx (game_id), INDEX user_id_idx (user_id), INDEX message_id_idx (message_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = INNODB;
CREATE TABLE sf_guard_forgot_password (id BIGINT AUTO_INCREMENT, user_id BIGINT NOT NULL, unique_key VARCHAR(255), expires_at DATETIME NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX user_id_idx (user_id), PRIMARY KEY(id)) ENGINE = INNODB;
CREATE TABLE sf_guard_group (id BIGINT AUTO_INCREMENT, name VARCHAR(255) UNIQUE, description TEXT, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(id)) ENGINE = INNODB;
CREATE TABLE sf_guard_group_permission (group_id BIGINT, permission_id BIGINT, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(group_id, permission_id)) ENGINE = INNODB;
CREATE TABLE sf_guard_permission (id BIGINT AUTO_INCREMENT, name VARCHAR(255) UNIQUE, description TEXT, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(id)) ENGINE = INNODB;
CREATE TABLE sf_guard_remember_key (id BIGINT AUTO_INCREMENT, user_id BIGINT, remember_key VARCHAR(32), ip_address VARCHAR(50), created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX user_id_idx (user_id), PRIMARY KEY(id)) ENGINE = INNODB;
CREATE TABLE sf_guard_user (id BIGINT AUTO_INCREMENT, nickname VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255), team_id BIGINT, email_address VARCHAR(255) NOT NULL UNIQUE, phone VARCHAR(255), username VARCHAR(128) NOT NULL UNIQUE, algorithm VARCHAR(128) DEFAULT 'sha1' NOT NULL, salt VARCHAR(128), password VARCHAR(128), is_active TINYINT(1) DEFAULT '1', is_super_admin TINYINT(1) DEFAULT '0', last_login DATETIME, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX is_active_idx_idx (is_active), INDEX team_id_idx (team_id), PRIMARY KEY(id)) ENGINE = INNODB;
CREATE TABLE sf_guard_user_group (user_id BIGINT, group_id BIGINT, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(user_id, group_id)) ENGINE = INNODB;
CREATE TABLE sf_guard_user_permission (user_id BIGINT, permission_id BIGINT, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(user_id, permission_id)) ENGINE = INNODB;
ALTER TABLE asset ADD CONSTRAINT asset_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id);
ALTER TABLE asset ADD CONSTRAINT asset_asset_type_id_asset_type_id FOREIGN KEY (asset_type_id) REFERENCES asset_type(id);
ALTER TABLE asset_answer ADD CONSTRAINT asset_answer_asset_question_id_asset_question_id FOREIGN KEY (asset_question_id) REFERENCES asset_question(id);
ALTER TABLE asset_answer ADD CONSTRAINT asset_answer_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE asset_audio ADD CONSTRAINT asset_audio_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE asset_audio_gallery ADD CONSTRAINT asset_audio_gallery_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE asset_content ADD CONSTRAINT asset_content_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE asset_file ADD CONSTRAINT asset_file_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE asset_image ADD CONSTRAINT asset_image_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE asset_image_gallery ADD CONSTRAINT asset_image_gallery_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE asset_question ADD CONSTRAINT asset_question_asset_questionnaire_id_asset_questionnaire_id FOREIGN KEY (asset_questionnaire_id) REFERENCES asset_questionnaire(id);
ALTER TABLE asset_question ADD CONSTRAINT asset_question_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE asset_questionnaire ADD CONSTRAINT asset_questionnaire_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE asset_video ADD CONSTRAINT asset_video_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE asset_video_gallery ADD CONSTRAINT asset_video_gallery_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE asset_vote ADD CONSTRAINT asset_vote_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id) ON DELETE CASCADE;
ALTER TABLE chat ADD CONSTRAINT chat_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id);
ALTER TABLE game ADD CONSTRAINT game_stadium_id_stadium_id FOREIGN KEY (stadium_id) REFERENCES stadium(id);
ALTER TABLE game ADD CONSTRAINT game_socket_id_socket_id FOREIGN KEY (socket_id) REFERENCES socket(id);
ALTER TABLE game ADD CONSTRAINT game_home_user_id_sf_guard_user_id FOREIGN KEY (home_user_id) REFERENCES sf_guard_user(id);
ALTER TABLE game ADD CONSTRAINT game_home_team_id_team_id FOREIGN KEY (home_team_id) REFERENCES team(id);
ALTER TABLE game ADD CONSTRAINT game_away_user_id_sf_guard_user_id FOREIGN KEY (away_user_id) REFERENCES sf_guard_user(id);
ALTER TABLE game ADD CONSTRAINT game_away_team_id_team_id FOREIGN KEY (away_team_id) REFERENCES team(id);
ALTER TABLE identity ADD CONSTRAINT identity_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id);
ALTER TABLE message ADD CONSTRAINT message_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id);
ALTER TABLE message ADD CONSTRAINT message_socket_id_socket_id FOREIGN KEY (socket_id) REFERENCES socket(id);
ALTER TABLE movement ADD CONSTRAINT movement_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id);
ALTER TABLE movement ADD CONSTRAINT movement_game_id_game_id FOREIGN KEY (game_id) REFERENCES game(id);
ALTER TABLE online ADD CONSTRAINT online_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id);
ALTER TABLE online ADD CONSTRAINT online_socket_id_socket_id FOREIGN KEY (socket_id) REFERENCES socket(id);
ALTER TABLE related_asset ADD CONSTRAINT related_asset_asset_id_asset_id FOREIGN KEY (asset_id) REFERENCES asset(id);
ALTER TABLE room ADD CONSTRAINT room_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id);
ALTER TABLE room ADD CONSTRAINT room_socket_id_socket_id FOREIGN KEY (socket_id) REFERENCES socket(id);
ALTER TABLE token ADD CONSTRAINT token_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id);
ALTER TABLE turn ADD CONSTRAINT turn_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id);
ALTER TABLE turn ADD CONSTRAINT turn_message_id_message_id FOREIGN KEY (message_id) REFERENCES message(id);
ALTER TABLE turn ADD CONSTRAINT turn_game_id_game_id FOREIGN KEY (game_id) REFERENCES game(id);
ALTER TABLE sf_guard_forgot_password ADD CONSTRAINT sf_guard_forgot_password_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id) ON DELETE CASCADE;
ALTER TABLE sf_guard_group_permission ADD CONSTRAINT sf_guard_group_permission_permission_id_sf_guard_permission_id FOREIGN KEY (permission_id) REFERENCES sf_guard_permission(id) ON DELETE CASCADE;
ALTER TABLE sf_guard_group_permission ADD CONSTRAINT sf_guard_group_permission_group_id_sf_guard_group_id FOREIGN KEY (group_id) REFERENCES sf_guard_group(id) ON DELETE CASCADE;
ALTER TABLE sf_guard_remember_key ADD CONSTRAINT sf_guard_remember_key_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id) ON DELETE CASCADE;
ALTER TABLE sf_guard_user ADD CONSTRAINT sf_guard_user_team_id_team_id FOREIGN KEY (team_id) REFERENCES team(id);
ALTER TABLE sf_guard_user_group ADD CONSTRAINT sf_guard_user_group_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id) ON DELETE CASCADE;
ALTER TABLE sf_guard_user_group ADD CONSTRAINT sf_guard_user_group_group_id_sf_guard_group_id FOREIGN KEY (group_id) REFERENCES sf_guard_group(id) ON DELETE CASCADE;
ALTER TABLE sf_guard_user_permission ADD CONSTRAINT sf_guard_user_permission_user_id_sf_guard_user_id FOREIGN KEY (user_id) REFERENCES sf_guard_user(id) ON DELETE CASCADE;
ALTER TABLE sf_guard_user_permission ADD CONSTRAINT sf_guard_user_permission_permission_id_sf_guard_permission_id FOREIGN KEY (permission_id) REFERENCES sf_guard_permission(id) ON DELETE CASCADE;
