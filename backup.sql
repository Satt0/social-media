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
-- PostgreSQL database dump complete
--

