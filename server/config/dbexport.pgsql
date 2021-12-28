--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

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
-- Name: account_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    grant_date timestamp without time zone
);


ALTER TABLE public.account_roles OWNER TO postgres;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    user_id integer NOT NULL,
    name character varying(250) NOT NULL,
    password character varying(250) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_login timestamp without time zone,
    avatar character(255),
    token character varying(255),
    public_key character varying(255),
    private_key character varying(255),
    account_type character varying(255),
    approved boolean DEFAULT false,
    code character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    gender_title character varying(255),
    country character varying(255),
    date_of_birth timestamp without time zone,
    main_wallet character varying(3),
    wallets text[],
    income double precision,
    recovery integer
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_user_id_seq OWNER TO postgres;

--
-- Name: accounts_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_user_id_seq OWNED BY public.accounts.user_id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    project_id integer NOT NULL,
    projectname character varying(100) NOT NULL,
    description character varying(255) NOT NULL,
    status character varying(50) NOT NULL,
    typeofinvestment character varying(50) NOT NULL,
    typeofproperty character varying(50) NOT NULL,
    project character varying(50) NOT NULL,
    term integer,
    yieldpa double precision NOT NULL,
    volumetotal double precision NOT NULL,
    volumeinvested double precision NOT NULL,
    currency character varying(50) NOT NULL,
    minimuminvestment double precision NOT NULL,
    country character varying(50) NOT NULL,
    owner_id integer NOT NULL,
    listofinvestors integer[],
    likes integer[],
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    startdate timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    closedate timestamp without time zone,
    images text[],
    long_description text,
    CONSTRAINT projects_term_check CHECK ((term > 0)),
    CONSTRAINT projects_volumetotal_check CHECK ((volumetotal > (0)::double precision))
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_project_id_seq OWNER TO postgres;

--
-- Name: projects_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_project_id_seq OWNED BY public.projects.project_id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(255) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_role_id_seq OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    tsx_id integer NOT NULL,
    from_id integer,
    to_user_id integer,
    to_project_id integer,
    amount double precision NOT NULL,
    previous_hash character varying(255) NOT NULL,
    current_hash character varying(255) NOT NULL,
    nonce integer NOT NULL,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    accounting_date timestamp without time zone,
    currency character varying(50) NOT NULL,
    description character varying(255),
    from_project_id integer,
    CONSTRAINT transactions_amount_check CHECK ((amount > (0)::double precision)),
    CONSTRAINT transactions_nonce_check CHECK ((nonce > 0))
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_tsx_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_tsx_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_tsx_id_seq OWNER TO postgres;

--
-- Name: transactions_tsx_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_tsx_id_seq OWNED BY public.transactions.tsx_id;


--
-- Name: accounts user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN user_id SET DEFAULT nextval('public.accounts_user_id_seq'::regclass);


--
-- Name: projects project_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN project_id SET DEFAULT nextval('public.projects_project_id_seq'::regclass);


--
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- Name: transactions tsx_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN tsx_id SET DEFAULT nextval('public.transactions_tsx_id_seq'::regclass);


--
-- Data for Name: account_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_roles (user_id, role_id, grant_date) FROM stdin;
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (user_id, name, password, email, created_at, last_login, avatar, token, public_key, private_key, account_type, approved, code, first_name, last_name, gender_title, country, date_of_birth, main_wallet, wallets, income, recovery) FROM stdin;
10	webshot.project	$2a$10$CcCi5kwU9CJ4Q7X8LVSqdOKIaoQe6FjWLBCj8zGxwy0L6kYSupaE6	webshot.project@gmail.com	2021-12-12 11:59:15.794516+00	2021-12-16 16:18:14.198291	https://avatars.githubusercontent.com/u/62020809?v=4                                                                                                                                                                                                           	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMH0sImlhdCI6MTYzOTY3MTQ5NCwiZXhwIjoxNjQwMDMxNDk0fQ.f4Fh5LlSsKAgFawH-Bf3PxUIjspFF9Z94uQMgIC3aTQ	047fff721f71041a85a16b672a8f4b21e8a9b392e7f5e835321910eba33647df82f33a2c77647a7b70bb7e1808e3417240aa5ad33949e9b5ddff8f052a9b7d59a1	02c6b02b5bafb9ea1e6a5dd3dc0f9a3e417c6906e2cd49d8dbcf45ce30bd6aa5	Account for free	t		Webshot	Project	Mr	Poland	1993-07-28 00:00:00	\N	{GBP}	\N	\N
1	mikey.prus	$2a$10$tIUsBDnalNIX0jD.XAm/L.Q4Pw2MY4lBeVfcaD6Bl/v/YufnZBFlK	mikey.prus@gmail.comreg	2021-12-04 15:33:00.795103+00	2021-12-17 16:19:21.577602	https://avatars.githubusercontent.com/u/62020809?v=4                                                                                                                                                                                                           	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNjM5NzU3OTYxLCJleHAiOjE2NDAxMTc5NjF9.8ZlTWeObN_HlTq91cSwxApq-7cKHmJDf6_7DiGhWCLw	04685b049e6c45c03939e084d6c3078616d6165f68058b0477efd27421b46f9d46a7c2698ab3f3dc26d9d2e24094611d9e45fcc6b1ddd5e03b3480bb7934280c96	e1073c2e0f71396233406187422ac89bd75c421a5a73f1706b9693b548fd9ee9	Account for free	t		Mikołaj	Prus	Mr	Poland	1993-07-28 00:00:00	GBP	{GBP,CZK,EUR,PLN}	15000	\N
2	mikis3	$2a$10$CTirRye1OZvi.VvaAkz4beW3pGB9B8Eb9WgTwTW/BClgzCQzXkR.G	mikey.prus@gmail.com	2021-12-09 22:24:26.144379+00	2021-12-27 15:31:03.950046	https://www.gravatar.com/avatar/330b3e7a77280f1500fb800a8422d76e?s=200&r=pg&d=mm                                                                                                                                                                               	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyfSwiaWF0IjoxNjQwNjE5MDYzLCJleHAiOjE2NDA5NzkwNjN9.P5GkCBy0Q5C3dI-V4Mk5ZMwfAhrtYg9QFRuw5Jpx_Cg	040c26534ada135503cef13367daf5d6113c449734f3e1e87e2537c89683bce39de34d2c33b3c0eb5f290c9d45238b64e0d2d39dcb97cbe164694edc1bde96865c	e18c4055e2ab754e82fd4a9e2a0c6bfb91bee7ed3a1a7fb5d979e2b7723a55c7	Account for free	t		Mikolaj	Prus	Mr	Poland	1993-07-28 00:00:00	\N	{GBP}	\N	205304
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (project_id, projectname, description, status, typeofinvestment, typeofproperty, project, term, yieldpa, volumetotal, volumeinvested, currency, minimuminvestment, country, owner_id, listofinvestors, likes, created_at, startdate, closedate, images, long_description) FROM stdin;
1	Large-scale Forest & Agricultural Land Acquisition	XYZ	FUNDED	EQUITY	LAND	EXISTING	24	7.5	100000	0	GBP	100	Russia	1	{}	\N	2021-12-07 21:39:28.937092+00	2021-12-07 00:00:00+00	2021-12-31 00:00:00	{https://crowdestor.com/uploads/web/shutterstock_1586361655_(1).jpg}	\N
27	fhtttn	thrthrt	OPEN	EQUITY	OFFICE	EXISTING	16	7	10000	0	GBP	1000	fhth	10	{}	\N	2021-12-12 13:01:35.208535+00	2021-12-15 00:00:00+00	2021-12-31 00:00:00	{poland}	htrhrt
26	fhtttn	thrthrt	UNDER_CONSIDERATION	EQUITY	OFFICE	EXISTING	\N	7	10000	0	GBP	1000	Poland	10	{}	\N	2021-12-12 13:01:35.206308+00	2021-12-16 00:00:00+00	\N	{Poland}	htrhrt
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (role_id, role_name) FROM stdin;
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (tsx_id, from_id, to_user_id, to_project_id, amount, previous_hash, current_hash, nonce, created_on, accounting_date, currency, description, from_project_id) FROM stdin;
1	1	1	\N	1000	genesis	8e860cf2dff7a8bd005632665e9dc4cb258c9730ec04ff24cc1caea767858a6f	1	2021-12-15 15:27:36.613122+00	2021-12-15 00:00:00	CZK	Transfer	\N
2	1	1	\N	1000	8e860cf2dff7a8bd005632665e9dc4cb258c9730ec04ff24cc1caea767858a6f	a2ef384b847d8719d113032f8796fab10fee1adbefabf338a5f340cc6b308471	2	2021-12-15 15:29:51.086108+00	2021-12-15 00:00:00	CZK	Transfer	\N
3	1	1	\N	1000	a2ef384b847d8719d113032f8796fab10fee1adbefabf338a5f340cc6b308471	1edc4baf4510c65253aa2241b7bb88adf1efb01249f73fd4670eeebf13876395	3	2021-12-15 15:39:51.570296+00	2021-12-15 00:00:00	CZK	Transfer	\N
4	2	\N	1	1200	1edc4baf4510c65253aa2241b7bb88adf1efb01249f73fd4670eeebf13876395	9ba61935738438dc76ac2b7e4c4f54f8b6acd43ceb5500c028ba8ff02433d616	4	2021-12-15 16:58:50.417485+00	2021-12-15 00:00:00	GBP	Investment	\N
5	2	\N	1	100000	9ba61935738438dc76ac2b7e4c4f54f8b6acd43ceb5500c028ba8ff02433d616	91c9a6786e03e0b76cd377f8f950ee4fe7f322ebee94bd3a1f2693274799afa8	5	2021-12-15 16:59:48.459384+00	2021-12-15 00:00:00	GBP	Investment	\N
6	2	\N	1	200	91c9a6786e03e0b76cd377f8f950ee4fe7f322ebee94bd3a1f2693274799afa8	7e3a2408cf2ab1740eddc8e181b2cc4a6be0732480ebb2a8e2755513d64ec955	6	2021-12-15 17:08:51.438408+00	2021-12-15 00:00:00	GBP	Investment	\N
7	2	\N	1	200	7e3a2408cf2ab1740eddc8e181b2cc4a6be0732480ebb2a8e2755513d64ec955	594f21ca3567d63d62c42f66c7938f5ba5d572da7e8c538a9bd2c0d22ee6768c	7	2021-12-15 17:09:51.247709+00	2021-12-15 00:00:00	GBP	Investment	\N
8	2	\N	1	200	594f21ca3567d63d62c42f66c7938f5ba5d572da7e8c538a9bd2c0d22ee6768c	0b0e65f25ff16bfea3b04d85c13abea46b13c59c78756b4b804bb34efcd6bb51	8	2021-12-15 17:11:20.111058+00	2021-12-15 00:00:00	GBP	Investment	\N
9	2	\N	1	1000	0b0e65f25ff16bfea3b04d85c13abea46b13c59c78756b4b804bb34efcd6bb51	8ac608b00cca26f30c9206323edf3326f4ed47f95815aa32ccfcc15e39f6847e	9	2021-12-15 17:11:39.412672+00	2021-12-15 00:00:00	GBP	Investment	\N
10	2	\N	1	1000	8ac608b00cca26f30c9206323edf3326f4ed47f95815aa32ccfcc15e39f6847e	dc2b4157db0bf5e4242c0808a92c50f25b587fbfaf261194eda34e6b309a2b2e	10	2021-12-15 17:13:04.189279+00	2021-12-15 00:00:00	GBP	Investment	\N
11	2	\N	1	1000	dc2b4157db0bf5e4242c0808a92c50f25b587fbfaf261194eda34e6b309a2b2e	26f77520861b021e6f097b044cb7f5cfda07ddb6ecd82775184e457948ea5820	11	2021-12-15 17:51:04.110175+00	2021-12-15 00:00:00	GBP	Investment	\N
12	2	\N	1	5000	26f77520861b021e6f097b044cb7f5cfda07ddb6ecd82775184e457948ea5820	0266f57a7c1111132ae559515eb3d28a48979746e6119643c3cbf7383fb8603e	12	2021-12-15 17:51:28.647125+00	2021-12-15 00:00:00	GBP	Investment	\N
13	2	\N	1	4000	0266f57a7c1111132ae559515eb3d28a48979746e6119643c3cbf7383fb8603e	b2df747bd7357097fa68bc13c333a8fd1d7378e9ff57939c3e39fd3ced75b8ed	13	2021-12-15 17:53:31.530677+00	2021-12-15 00:00:00	GBP	Investment	\N
14	2	\N	1	200	b2df747bd7357097fa68bc13c333a8fd1d7378e9ff57939c3e39fd3ced75b8ed	b2e145858eca7f92ece68c76574e37f01c53d4509588264783ba9aeaaf2248fa	14	2021-12-15 21:22:11.173362+00	2021-12-15 00:00:00	GBP	Investment	\N
\.


--
-- Name: accounts_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_user_id_seq', 10, true);


--
-- Name: projects_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_project_id_seq', 27, true);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 1, false);


--
-- Name: transactions_tsx_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_tsx_id_seq', 14, true);


--
-- Name: account_roles account_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_roles
    ADD CONSTRAINT account_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: accounts accounts_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_email_key UNIQUE (email);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (user_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (tsx_id);


--
-- Name: account_roles account_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_roles
    ADD CONSTRAINT account_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- Name: account_roles account_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_roles
    ADD CONSTRAINT account_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.accounts(user_id);


--
-- Name: transactions from_project_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT from_project_id FOREIGN KEY (from_project_id) REFERENCES public.projects(project_id);


--
-- Name: projects projects_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.accounts(user_id);


--
-- Name: transactions transactions_to_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_to_project_id_fkey FOREIGN KEY (to_project_id) REFERENCES public.projects(project_id);


--
-- Name: transactions transactions_to_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES public.accounts(user_id);


--
-- PostgreSQL database dump complete
--

