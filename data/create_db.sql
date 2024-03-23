BEGIN;

DROP TABLE IF EXISTS "user", "message", "booking", "attraction", "picture", "category", "tag", "price", "attraction_has_tag";

CREATE TABLE "user" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "first_name"        VARCHAR(64) NOT NULL,
    "last_name"         VARCHAR(64) NOT NULL,
    "address"           VARCHAR(255) NOT NULL ,
    "city"              VARCHAR(64) NOT NULL,
    "country"           VARCHAR(64) NOT NULL,
    "email"             VARCHAR(255) NOT NULL UNIQUE,
    "password"          VARCHAR(255) NOT NULL,
    "role"              VARCHAR(64) NOT NULL,
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"        TIMESTAMPTZ
);

CREATE TABLE "message" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "subject"           TEXT NOT NULL,
    "content"           TEXT NOT NULL,
    "closed"            BOOLEAN NOT NULL DEFAULT FALSE,
    "sender_id"         INTEGER NOT NULL REFERENCES "user"("id"),
    "receiver_id"       INTEGER NOT NULL REFERENCES "user"("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"        TIMESTAMPTZ
);

CREATE TABLE "booking" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "start_date"        DATE NOT NULL,
    "duration"          INTEGER NOT NULL,
    "nb_people"         INTEGER NOT NULL,
    "hotel"             BOOLEAN NOT NULL,
    "total"             FLOAT NOT NULL,
    "closed"            BOOLEAN NOT NULL DEFAULT FALSE,
    "user_id"           INTEGER NOT NULL REFERENCES "user"("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"        TIMESTAMPTZ
);

CREATE TABLE "category" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"              VARCHAR(64) NOT NULL,
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"        TIMESTAMPTZ
);

CREATE TABLE "attraction" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"              VARCHAR(64) NOT NULL,
    "description"       TEXT NOT NULL,
    "category_id"       INTEGER NOT NULL REFERENCES "category"("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"        TIMESTAMPTZ
);

CREATE TABLE "picture" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "pictures_url"      TEXT NOT NULL,
    "attraction_id"     INTEGER NOT NULL REFERENCES "attraction"("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"        TIMESTAMPTZ
);

CREATE TABLE "tag" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"              VARCHAR(64) NOT NULL,
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"        TIMESTAMPTZ
);

CREATE TABLE "price" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "hotel"             BOOLEAN NOT NULL,
    "duration"          INTEGER NOT NULL,
    "price"             FLOAT NOT NULL,
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"        TIMESTAMPTZ
);

CREATE TABLE "attraction_has_tag" (
    "attraction_id"     INTEGER NOT NULL REFERENCES "attraction"("id"),
    "tag_id"            INTEGER NOT NULL REFERENCES "tag"("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"        TIMESTAMPTZ
);

COMMIT;