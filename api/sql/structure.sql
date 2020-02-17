CREATE EXTENSION "uuid-ossp";
CREATE EXTENSION "pgcrypto";

--------------------------------------------------------------------------------

CREATE LANGUAGE plperlu;

--------------------------------------------------------------------------------

CREATE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION check_email_address(email TEXT) RETURNS BOOLEAN AS $$
    use Email::Address;
    my @addresses = Email::Address->parse($_[0]);
    return scalar(@addresses) > 0 ? 1 : 0;
$$ LANGUAGE plperlu;

--------------------------------------------------------------------------------

CREATE DOMAIN email_address AS TEXT CHECK (
    VALUE IS NULL OR LENGTH(VALUE) <= 254 AND check_email_address(VALUE)
);

--------------------------------------------------------------------------------

CREATE TABLE member (
    member_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL CHECK (LENGTH(name) <= 30),
    email email_address NOT NULL,
    password TEXT NOT NULL,
    picture TEXT CHECK (LENGTH(picture) <= 100 OR picture IS NOT NULL AND picture ~ '^https://'),
    website TEXT CHECK (LENGTH(website) <= 50 OR website IS NOT NULL AND website ~ '^https?://'),
    quote TEXT CHECK (LENGTH(quote) <= 150),
    role TEXT NOT NULL CHECK (role IN ('user', 'moderator', 'admin')) DEFAULT 'user',
    created_at TIMESTAMPTZ(0) DEFAULT NOW(),
    updated_at TIMESTAMPTZ(0),
    deleted_at TIMESTAMPTZ(0)
);

CREATE UNIQUE INDEX member_name_unique ON member (LOWER(name)) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX member_email_unique ON member (LOWER(email)) WHERE deleted_at IS NULL;

CREATE TRIGGER member_set_updated_at
    BEFORE UPDATE ON member
    FOR EACH ROW
    EXECUTE PROCEDURE set_updated_at();

--------------------------------------------------------------------------------

CREATE TABLE chat_message (
    message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES member,
    content TEXT NOT NULL CHECK (LENGTH(content) <= 128),
    created_at TIMESTAMPTZ(0) DEFAULT NOW()
);

CREATE INDEX chat_message_member_id ON chat_message (member_id);

--------------------------------------------------------------------------------

CREATE TABLE private_message (
    message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_member_id UUID NOT NULL REFERENCES member,
    to_member_id UUID NOT NULL REFERENCES member,
    subject TEXT NOT NULL CHECK (LENGTH(subject) <= 50),
    content TEXT NOT NULL CHECK (LENGTH(content) <= 10240),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ(0) DEFAULT NOW()
);

CREATE INDEX private_message_from_member_id ON private_message (from_member_id);
CREATE INDEX private_message_to_member_id ON private_message (to_member_id);

--------------------------------------------------------------------------------

CREATE TABLE poll (
    poll_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL CHECK (LENGTH(question) <= 127),
    is_multiple BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ(0) DEFAULT NOW(),
    ended_at TIMESTAMPTZ(0) NOT NULL
);

--------------------------------------------------------------------------------

CREATE TABLE poll_option (
    option_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    poll_id UUID NOT NULL REFERENCES poll,
    label TEXT NOT NULL CHECK (LENGTH(label) <= 127)
);

CREATE INDEX poll_option_poll_id ON poll_option (poll_id);
CREATE UNIQUE INDEX poll_option_label_unique ON poll_option (poll_id, label);

--------------------------------------------------------------------------------

CREATE TABLE poll_vote (
    vote_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    option_id UUID NOT NULL REFERENCES poll_option,
    member_id UUID NOT NULL REFERENCES member,
    created_at TIMESTAMPTZ(0) DEFAULT NOW()
);

CREATE INDEX poll_vote_option_id ON poll_vote (option_id);
CREATE UNIQUE INDEX poll_vote_option_member_unique ON poll_vote (option_id, member_id);

--------------------------------------------------------------------------------

CREATE TABLE topic (
    topic_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES member,
    poll_id UUID REFERENCES poll,
    title TEXT NOT NULL CHECK (LENGTH(title) <= 32),
    is_locked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ(0) DEFAULT NOW()
);

CREATE INDEX topic_member_id ON topic (member_id);
CREATE INDEX topic_poll_id ON topic (poll_id);
CREATE INDEX topic_created_at ON topic (created_at);

--------------------------------------------------------------------------------

CREATE TABLE post (
    post_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID REFERENCES topic,
    member_id UUID REFERENCES member,
    unauthenticated_author_name TEXT CHECK (LENGTH(unauthenticated_author_name) <= 30),
    unauthenticated_author_email email_address,
    content TEXT NOT NULL CHECK (LENGTH(content) <= 10240),
    created_at TIMESTAMPTZ(0) DEFAULT NOW(),
    updated_at TIMESTAMPTZ(0),
    CONSTRAINT post_member CHECK (
        member_id IS NOT NULL AND unauthenticated_author_name IS NULL AND unauthenticated_author_email IS NULL
        OR member_id IS NULL AND unauthenticated_author_name IS NOT NULL
    )
);

CREATE INDEX post_topic_id ON post (topic_id);
CREATE INDEX post_member_id ON post (member_id);

CREATE TRIGGER post_set_updated_at
    BEFORE UPDATE ON post
    FOR EACH ROW
    EXECUTE PROCEDURE set_updated_at();

--------------------------------------------------------------------------------

CREATE TABLE announcement (
    announcement_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES member,
    title TEXT NOT NULL CHECK (LENGTH(title) <= 255),
    created_at TIMESTAMPTZ(0) DEFAULT NOW()
);

CREATE INDEX announcement_member_id ON announcement (member_id);
