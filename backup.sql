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
-- Data for Name: participant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.participant (participantid, conversationid, userid, joindate, status) FROM stdin;
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
45	satto	Hoang Minh Tan	2001-06-06	2021-06-19	oks	ok	not set	not set	t	\N	public/images/avatar/c8c0a23ea3c2c717b6b2a0d4fe3c405c	male
48	satto	Hoàng Minh Tân	2001-06-06	2021-06-22	kk	kk	minhtanbg6601@gmail.com	0911896980	t	\N	public/images/avatar/049783285ae86374e15d7c2b69510a5a	male
40	satto	Hoang Minh Tan	2001-06-06	2021-06-19	ok	ok	not set	not set	t	\N	public/images/avatar/825287e991feee2345a4d2192e62ab81	male
38	hoang minh okman	hoang minh okman	1970-01-01	2021-06-19	123123s1ss231	1624123671863	\N	\N	t	123123s1ss231	img.com	not set
39	hoang minh okman	hoang minh okman	1970-01-01	2021-06-19	123123s1sss231	1624124080054	\N	\N	t	123123s1sss231	img.com	not set
47	MTP	sontung MTP	2001-06-06	2021-06-20	test	test	test@mail.com	123123123123	t	\N	\N	male
46	erk	Ericksen	2025-10-08	2021-06-20	full	full	tan@icloud.com	1234345	t	\N	public/images/avatar/avatar.jpg	male
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

SELECT pg_catalog.setval('public.conversation_id_seq', 154, true);


--
-- Name: message_conversationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_conversationid_seq', 1, false);


--
-- Name: message_messageid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_messageid_seq', 614, true);


--
-- Name: message_receiver_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_receiver_seq', 1, false);


--
-- Name: message_sender_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_sender_seq', 1, false);


--
-- Name: participant_conversationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.participant_conversationid_seq', 1, false);


--
-- Name: participant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.participant_id_seq', 1, false);


--
-- Name: participant_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.participant_userid_seq', 1, false);


--
-- Name: post_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_postid_seq', 164, true);


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

SELECT pg_catalog.setval('public.usercomment_commentid_seq', 480, true);


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

SELECT pg_catalog.setval('public.userlike_likeid_seq', 408, true);


--
-- Name: userlike_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userlike_postid_seq', 1, false);


--
-- Name: userlike_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userlike_userid_seq', 1, false);


--
-- PostgreSQL database dump complete
--

