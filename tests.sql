--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: conversation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversation (
    conversationid integer NOT NULL,
    type character varying(10),
    userid1 integer NOT NULL,
    datecreated timestamp(0) without time zone NOT NULL,
    lastactivedate timestamp(0) without time zone NOT NULL,
    userid2 integer NOT NULL,
    lastmessage text
);


ALTER TABLE public.conversation OWNER TO postgres;

--
-- Name: conversation_creatorid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.conversation_creatorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.conversation_creatorid_seq OWNER TO postgres;

--
-- Name: conversation_creatorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conversation_creatorid_seq OWNED BY public.conversation.userid1;


--
-- Name: conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.conversation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.conversation_id_seq OWNER TO postgres;

--
-- Name: conversation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conversation_id_seq OWNED BY public.conversation.conversationid;


--
-- Name: message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message (
    messageid integer NOT NULL,
    userid integer NOT NULL,
    conversationid integer NOT NULL,
    datecreated timestamp(0) without time zone NOT NULL,
    content text NOT NULL,
    isexpired boolean DEFAULT false NOT NULL,
    receiver integer NOT NULL
);


ALTER TABLE public.message OWNER TO postgres;

--
-- Name: message_conversationid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.message_conversationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_conversationid_seq OWNER TO postgres;

--
-- Name: message_conversationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_conversationid_seq OWNED BY public.message.conversationid;


--
-- Name: message_messageid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.message_messageid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_messageid_seq OWNER TO postgres;

--
-- Name: message_messageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_messageid_seq OWNED BY public.message.messageid;


--
-- Name: message_receiver_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.message_receiver_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_receiver_seq OWNER TO postgres;

--
-- Name: message_receiver_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_receiver_seq OWNED BY public.message.receiver;


--
-- Name: message_sender_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.message_sender_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_sender_seq OWNER TO postgres;

--
-- Name: message_sender_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_sender_seq OWNED BY public.message.userid;


--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    postid integer NOT NULL,
    userid integer NOT NULL,
    content text NOT NULL,
    datecreated timestamp without time zone NOT NULL,
    likecount numeric(12,0) DEFAULT 0 NOT NULL,
    media text,
    embeded text,
    commentcount character varying DEFAULT 0 NOT NULL
);


ALTER TABLE public.post OWNER TO postgres;

--
-- Name: post_postid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_postid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_postid_seq OWNER TO postgres;

--
-- Name: post_postid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_postid_seq OWNED BY public.post.postid;


--
-- Name: post_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_userid_seq OWNER TO postgres;

--
-- Name: post_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_userid_seq OWNED BY public.post.userid;


--
-- Name: reply; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reply (
    replyid integer NOT NULL,
    commentid integer NOT NULL,
    userid integer NOT NULL,
    datecreated timestamp without time zone NOT NULL,
    content text NOT NULL,
    usercommentid integer NOT NULL
);


ALTER TABLE public.reply OWNER TO postgres;

--
-- Name: reply_commentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reply_commentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reply_commentid_seq OWNER TO postgres;

--
-- Name: reply_commentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reply_commentid_seq OWNED BY public.reply.commentid;


--
-- Name: reply_replyid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reply_replyid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reply_replyid_seq OWNER TO postgres;

--
-- Name: reply_replyid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reply_replyid_seq OWNED BY public.reply.replyid;


--
-- Name: reply_usercommentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reply_usercommentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reply_usercommentid_seq OWNER TO postgres;

--
-- Name: reply_usercommentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reply_usercommentid_seq OWNED BY public.reply.usercommentid;


--
-- Name: reply_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reply_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reply_userid_seq OWNER TO postgres;

--
-- Name: reply_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reply_userid_seq OWNED BY public.reply.userid;


--
-- Name: useraccount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.useraccount (
    userid integer NOT NULL,
    userdisplayname character varying(100) NOT NULL,
    userfullname character varying(100) NOT NULL,
    dateofbirth date,
    datecreatedaccount date NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    email character varying(100),
    phone character varying(20),
    active boolean DEFAULT true NOT NULL,
    facebookid character varying(40),
    picture text,
    gender character varying(20) NOT NULL
);


ALTER TABLE public.useraccount OWNER TO postgres;

--
-- Name: useraccount_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.useraccount_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.useraccount_userid_seq OWNER TO postgres;

--
-- Name: useraccount_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.useraccount_userid_seq OWNED BY public.useraccount.userid;


--
-- Name: usercomment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usercomment (
    commentid integer NOT NULL,
    postid integer NOT NULL,
    userid integer NOT NULL,
    datecreated timestamp without time zone NOT NULL,
    content text NOT NULL
);


ALTER TABLE public.usercomment OWNER TO postgres;

--
-- Name: usercomment_commentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usercomment_commentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usercomment_commentid_seq OWNER TO postgres;

--
-- Name: usercomment_commentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usercomment_commentid_seq OWNED BY public.usercomment.commentid;


--
-- Name: usercomment_postid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usercomment_postid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usercomment_postid_seq OWNER TO postgres;

--
-- Name: usercomment_postid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usercomment_postid_seq OWNED BY public.usercomment.postid;


--
-- Name: usercomment_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usercomment_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usercomment_userid_seq OWNER TO postgres;

--
-- Name: usercomment_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usercomment_userid_seq OWNED BY public.usercomment.userid;


--
-- Name: userlike; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userlike (
    likeid integer NOT NULL,
    postid integer NOT NULL,
    userid integer NOT NULL,
    datecreated timestamp without time zone NOT NULL,
    iconcode character varying(4) NOT NULL
);


ALTER TABLE public.userlike OWNER TO postgres;

--
-- Name: userlike_likeid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.userlike_likeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userlike_likeid_seq OWNER TO postgres;

--
-- Name: userlike_likeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.userlike_likeid_seq OWNED BY public.userlike.likeid;


--
-- Name: userlike_postid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.userlike_postid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userlike_postid_seq OWNER TO postgres;

--
-- Name: userlike_postid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.userlike_postid_seq OWNED BY public.userlike.postid;


--
-- Name: userlike_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.userlike_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userlike_userid_seq OWNER TO postgres;

--
-- Name: userlike_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.userlike_userid_seq OWNED BY public.userlike.userid;


--
-- Name: conversation conversationid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation ALTER COLUMN conversationid SET DEFAULT nextval('public.conversation_id_seq'::regclass);


--
-- Name: conversation userid1; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation ALTER COLUMN userid1 SET DEFAULT nextval('public.conversation_creatorid_seq'::regclass);


--
-- Name: message messageid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message ALTER COLUMN messageid SET DEFAULT nextval('public.message_messageid_seq'::regclass);


--
-- Name: message receiver; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message ALTER COLUMN receiver SET DEFAULT nextval('public.message_receiver_seq'::regclass);


--
-- Name: post postid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN postid SET DEFAULT nextval('public.post_postid_seq'::regclass);


--
-- Name: post userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN userid SET DEFAULT nextval('public.post_userid_seq'::regclass);


--
-- Name: reply replyid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reply ALTER COLUMN replyid SET DEFAULT nextval('public.reply_replyid_seq'::regclass);


--
-- Name: reply commentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reply ALTER COLUMN commentid SET DEFAULT nextval('public.reply_commentid_seq'::regclass);


--
-- Name: reply userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reply ALTER COLUMN userid SET DEFAULT nextval('public.reply_userid_seq'::regclass);


--
-- Name: reply usercommentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reply ALTER COLUMN usercommentid SET DEFAULT nextval('public.reply_usercommentid_seq'::regclass);


--
-- Name: useraccount userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.useraccount ALTER COLUMN userid SET DEFAULT nextval('public.useraccount_userid_seq'::regclass);


--
-- Name: usercomment commentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usercomment ALTER COLUMN commentid SET DEFAULT nextval('public.usercomment_commentid_seq'::regclass);


--
-- Name: usercomment postid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usercomment ALTER COLUMN postid SET DEFAULT nextval('public.usercomment_postid_seq'::regclass);


--
-- Name: usercomment userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usercomment ALTER COLUMN userid SET DEFAULT nextval('public.usercomment_userid_seq'::regclass);


--
-- Name: userlike likeid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userlike ALTER COLUMN likeid SET DEFAULT nextval('public.userlike_likeid_seq'::regclass);


--
-- Name: userlike postid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userlike ALTER COLUMN postid SET DEFAULT nextval('public.userlike_postid_seq'::regclass);


--
-- Name: userlike userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userlike ALTER COLUMN userid SET DEFAULT nextval('public.userlike_userid_seq'::regclass);


--
-- Data for Name: conversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conversation (conversationid, type, userid1, datecreated, lastactivedate, userid2, lastmessage) FROM stdin;
\.


--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.message (messageid, userid, conversationid, datecreated, content, isexpired, receiver) FROM stdin;
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (postid, userid, content, datecreated, likecount, media, embeded, commentcount) FROM stdin;
\.


--
-- Data for Name: reply; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reply (replyid, commentid, userid, datecreated, content, usercommentid) FROM stdin;
\.


--
-- Data for Name: useraccount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.useraccount (userid, userdisplayname, userfullname, dateofbirth, datecreatedaccount, username, password, email, phone, active, facebookid, picture, gender) FROM stdin;
\.


--
-- Data for Name: usercomment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usercomment (commentid, postid, userid, datecreated, content) FROM stdin;
\.


--
-- Data for Name: userlike; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.userlike (likeid, postid, userid, datecreated, iconcode) FROM stdin;
\.


--
-- Name: conversation_creatorid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conversation_creatorid_seq', 1, false);


--
-- Name: conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conversation_id_seq', 155, true);


--
-- Name: message_conversationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_conversationid_seq', 1, false);


--
-- Name: message_messageid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_messageid_seq', 618, true);


--
-- Name: message_receiver_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_receiver_seq', 1, false);


--
-- Name: message_sender_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_sender_seq', 1, false);


--
-- Name: post_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_postid_seq', 166, true);


--
-- Name: post_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_userid_seq', 1, false);


--
-- Name: reply_commentid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reply_commentid_seq', 1, false);


--
-- Name: reply_replyid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reply_replyid_seq', 1, false);


--
-- Name: reply_usercommentid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reply_usercommentid_seq', 1, false);


--
-- Name: reply_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reply_userid_seq', 1, false);


--
-- Name: useraccount_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.useraccount_userid_seq', 48, true);


--
-- Name: usercomment_commentid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usercomment_commentid_seq', 481, true);


--
-- Name: usercomment_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usercomment_postid_seq', 1, false);


--
-- Name: usercomment_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usercomment_userid_seq', 1, false);


--
-- Name: userlike_likeid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userlike_likeid_seq', 410, true);


--
-- Name: userlike_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userlike_postid_seq', 1, false);


--
-- Name: userlike_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userlike_userid_seq', 1, false);


--
-- Name: conversation conversation_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT conversation_pk PRIMARY KEY (conversationid);


--
-- Name: conversation conversation_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT conversation_un UNIQUE (userid1, userid2);


--
-- Name: message message_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pk PRIMARY KEY (messageid);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (postid);


--
-- Name: reply reply_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reply
    ADD CONSTRAINT reply_pkey PRIMARY KEY (replyid);


--
-- Name: useraccount useraccount_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.useraccount
    ADD CONSTRAINT useraccount_pkey PRIMARY KEY (userid);


--
-- Name: useraccount useraccount_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.useraccount
    ADD CONSTRAINT useraccount_un UNIQUE (username);


--
-- Name: useraccount useraccount_un_fb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.useraccount
    ADD CONSTRAINT useraccount_un_fb UNIQUE (facebookid);


--
-- Name: usercomment usercomment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usercomment
    ADD CONSTRAINT usercomment_pkey PRIMARY KEY (commentid);


--
-- Name: userlike userlike_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userlike
    ADD CONSTRAINT userlike_pkey PRIMARY KEY (likeid);


--
-- Name: userlike userlike_un_like; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userlike
    ADD CONSTRAINT userlike_un_like UNIQUE (postid, userid);


--
-- PostgreSQL database dump complete
--

