--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1
-- Dumped by pg_dump version 11.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    id character varying,
    p_id integer,
    author character varying,
    text character varying
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- Name: contests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contests (
    c_id integer NOT NULL,
    c_name character varying(255) NOT NULL,
    date_con timestamp without time zone,
    start_at time without time zone,
    end_at time without time zone,
    date_start timestamp without time zone
);


ALTER TABLE public.contests OWNER TO postgres;

--
-- Name: correct; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.correct (
    u_id integer,
    p_id integer,
    c_id integer,
    score integer DEFAULT 0
);


ALTER TABLE public.correct OWNER TO postgres;

--
-- Name: google; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.google (
    email character varying NOT NULL,
    googleid character varying
);


ALTER TABLE public.google OWNER TO postgres;

--
-- Name: pass; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pass (
    email character varying NOT NULL,
    passwo character varying NOT NULL
);


ALTER TABLE public.pass OWNER TO postgres;

--
-- Name: problemset; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.problemset (
    p_id integer NOT NULL,
    c_id integer NOT NULL,
    p_name character varying(255) NOT NULL,
    question character varying NOT NULL,
    input_form character varying NOT NULL,
    output_form character varying NOT NULL,
    sample_ip character varying NOT NULL,
    sample_op character varying NOT NULL,
    actual_ip character varying NOT NULL,
    actual_op character varying NOT NULL,
    tags character varying
);


ALTER TABLE public.problemset OWNER TO postgres;

--
-- Name: register; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.register (
    u_id integer,
    c_id integer
);


ALTER TABLE public.register OWNER TO postgres;

--
-- Name: submissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.submissions (
    u_id integer,
    p_id integer,
    c_id integer,
    corr_status integer DEFAULT 0,
    score integer DEFAULT 0
);


ALTER TABLE public.submissions OWNER TO postgres;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    p_id integer,
    tag character varying(50)
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    u_id integer NOT NULL,
    u_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    handle character varying(30) NOT NULL,
    rating integer DEFAULT 1500,
    institution character varying(255) DEFAULT 'MNNIT'::character varying NOT NULL,
    joined_date timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_u_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_u_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_u_id_seq OWNER TO postgres;

--
-- Name: users_u_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_u_id_seq OWNED BY public.users.u_id;


--
-- Name: users u_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN u_id SET DEFAULT nextval('public.users_u_id_seq'::regclass);


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (id, p_id, author, text) FROM stdin;
1568438029174	21	harshaempire	hye
1568438245443	21	harshaempire	hey i m facing problem in solving this question can anyone help me
1568438298527	21	harshaempire	tuugfjdmjbdmvbdhvsd vhsgchzvcnbzvcnbsdvcnbvdncvsdhvhzvc nsbmbfmsdfsmhfdsmvfnsdvndsvfhas  jsfbjsbfmsdbfmsdbfmsdbmf
1568438462819	21	harshaempire	yeah its a tough one
1568438817605	21	harshaempire	wt to do
1568439114523	21	harshaempire	i dont know
1568439202955	21	amansharma07	any help
1568439871386	21	amansharma07	helloooo
1568440896374	20	harshaempire	helloo
1568441212415	21	harshaempire	helloo
\.


--
-- Data for Name: contests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contests (c_id, c_name, date_con, start_at, end_at, date_start) FROM stdin;
4	 Educational Round-3	2019-11-05 20:00:00	19:30:00	20:00:00	2019-11-05 19:30:00
2	 Educational Round-2	2019-09-08 22:30:00	19:30:00	22:30:00	2019-09-08 19:30:00
1	 Educational Round-1	2019-09-01 20:00:00	00:00:00	20:00:00	2019-09-01 00:00:00
5	 Educational Round-4	2019-09-14 20:00:00	00:00:00	20:00:00	2019-09-14 00:00:00
\.


--
-- Data for Name: correct; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.correct (u_id, p_id, c_id, score) FROM stdin;
1	20	1	500
3	20	1	490
2	20	1	500
2	25	2	600
2	32	4	100
2	21	1	0
\.


--
-- Data for Name: google; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.google (email, googleid) FROM stdin;
harsh48chaturvedi@gmail.com	107154411495627038605
\.


--
-- Data for Name: pass; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pass (email, passwo) FROM stdin;
amansharma@gmail.com	password1
harsharocks@gmail.com	password2
karan@gmail.com	password3
gullu@gmail.com	Password1
gullu123@gmail.com	Password14
gulluhelp@gmail.com	Password4
\.


--
-- Data for Name: problemset; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.problemset (p_id, c_id, p_name, question, input_form, output_form, sample_ip, sample_op, actual_ip, actual_op, tags) FROM stdin;
20	1	Reverse the Number	Given an Integer N, write a program to reverse the given number. 	The first line contains an integer T, total number of testcases. Then follow T lines, each line contains an integer N.	Display the reverse of the given number N.	4\\n12345\\n31203\\n2123\\n2300	54321\\n30213\\n3212\\n32	7\\n12345\\n31203\\n2123\\n2300\\n12\\n45\\n6	54321\\n30213\\n3212\\n32\\n21\\n54\\n6\\n	array
25	2	Add Two Numbers	Shivam is the youngest programmer in the world, he is just 12 years old. Shivam is learning programming and today he is writing his first program. \n\nProgram is very simple, Given two integers A and B, write a program to add these two numbers.	The first line contains an integer T, total number of test cases. Then follow T lines, each line contains two Integers A and B.	Add A and B and display it.	3\\n1 2\\n100 200\\n10 40	3\\n300\\n50	5\\n1 2\\n100 200\\n10 40\\n1000 400\\n500 600	3\\n300\\n50\\n1400\\n1100\\n	string
21	1	Hello World	The aim of this task is to check if everything works fine. Write a program to print "Hello World" on the screen.	The first line contains an integer T, total number of testcases.	Output should be Hello World	2	Hello World\\nHello World\\n	7	Hello World\\nHello World\\nHello World\\nHello World\\nHello World\\nHello World\\nHello World\\n	string dp
\.


--
-- Data for Name: register; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.register (u_id, c_id) FROM stdin;
2	1
3	1
4	1
2	2
2	4
1	4
\.


--
-- Data for Name: submissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.submissions (u_id, p_id, c_id, corr_status, score) FROM stdin;
1	20	1	1	500
3	20	1	1	490
4	20	1	0	0
3	21	1	1	0
4	21	1	1	0
1	21	1	1	0
1	21	1	1	500
2	21	1	1	0
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (p_id, tag) FROM stdin;
20	array
21	dp
25	strings
21	sum
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (u_id, u_name, email, handle, rating, institution, joined_date) FROM stdin;
1	Aman Sharma	amansharma@gmail.com	amansharma07	1700	MNNIT	2019-09-10 05:00:00
2	Harsh Chaturvedi	harsharocks@gmail.com	harshaempire	1800	MNNIT	2019-09-10 05:00:00
6	gullu	gulluhelp@gmail.com	gullugullu	1500	MNNIT	2019-09-15 01:25:43.831
11	Harsh Chaturvedi	harsh48chaturvedi@gmail.com	harshrocks	1500	MNNIT	2019-09-15 02:53:35.141
\.


--
-- Name: users_u_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_u_id_seq', 11, true);


--
-- Name: contests contests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contests
    ADD CONSTRAINT contests_pkey PRIMARY KEY (c_id);


--
-- Name: google google_googleid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google
    ADD CONSTRAINT google_googleid_key UNIQUE (googleid);


--
-- Name: google google_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google
    ADD CONSTRAINT google_pkey PRIMARY KEY (email);


--
-- Name: pass pass_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pass
    ADD CONSTRAINT pass_pkey PRIMARY KEY (email);


--
-- Name: problemset problemset_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problemset
    ADD CONSTRAINT problemset_pkey PRIMARY KEY (p_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (u_id);


--
-- PostgreSQL database dump complete
--

