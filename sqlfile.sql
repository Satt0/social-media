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
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (postid, userid, content, datecreated, likecount, media, embeded, commentcount) FROM stdin;
5	45	sdf	2021-06-20 22:26:12.586766	0	[{"path":"public/images/posts/1624202772570img-test (copy)","type":"application/octet-stream"}]		0
6	45	hello world	2021-06-20 22:32:25.08309	0	[{"path":"public/images/posts/0e900eaad08d8dae7b00f8ead9596250","type":"image/png"}]		0
7	45	A post with no media	2021-06-20 22:34:53.959763	0	[]		0
8	45	The question is in a way meaningless, she knows, but one must ask. Love in such situations is rarely real. Sex is the engine, exalting and ruining people, sex and frustration. Love is what people believe is worth the path of devastation.	2021-06-20 22:44:36.276504	0	[]		0
9	47	Hello from SONTUNGMTP	2021-06-20 23:21:39.050848	0	[]		0
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
38	hoang minh okman	hoang minh okman	1970-01-01	2021-06-19	123123s1ss231	1624123671863	\N	\N	t	123123s1ss231	img.com	not set
39	hoang minh okman	hoang minh okman	1970-01-01	2021-06-19	123123s1sss231	1624124080054	\N	\N	t	123123s1sss231	img.com	not set
40	satto	Hoang Minh Tan	2001-06-06	2021-06-19	ok	ok	not set	not set	t	\N	\N	male
45	satto	Hoang Minh Tan	2001-06-06	2021-06-19	oks	ok	not set	not set	t	\N	\N	male
46	erk	Ericksen	2025-10-08	2021-06-20	full	full	tan@icloud.com	1234345	t	\N	\N	male
47	MTP	sontung MTP	2001-06-06	2021-06-20	test	test	test@mail.com	123123123123	t	\N	\N	male
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
1	123	212	2021-06-19 15:53:23.613693	222
2	123	212	2021-06-19 15:53:27.474726	222
3	123	212	2021-06-19 15:53:28.073558	222
\.


--
-- Name: post_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_postid_seq', 9, true);


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

SELECT pg_catalog.setval('public.useraccount_userid_seq', 47, true);


--
-- Name: usercomment_commentid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usercomment_commentid_seq', 1, false);


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

SELECT pg_catalog.setval('public.userlike_likeid_seq', 3, true);


--
-- Name: userlike_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userlike_postid_seq', 1, false);


--
-- Name: userlike_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userlike_userid_seq', 1, false);


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
-- PostgreSQL database dump complete
--

