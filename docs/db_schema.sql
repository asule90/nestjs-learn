--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-1.pgdg22.04+1)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgre
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgre;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgre
--

COMMENT ON SCHEMA public IS '';


--
-- Name: EnumBadge; Type: TYPE; Schema: public; Owner: postgre
--

CREATE TYPE public."EnumBadge" AS ENUM (
    'HOT',
    'NEW',
    'BEST_SELLER'
);


ALTER TYPE public."EnumBadge" OWNER TO postgre;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgre
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgre;

--
-- Name: gift; Type: TABLE; Schema: public; Owner: postgre
--

CREATE TABLE public.gift (
    uuid character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL,
    stock integer NOT NULL,
    price integer NOT NULL,
    review_count integer DEFAULT 0 NOT NULL,
    image_1 text NOT NULL,
    badge public."EnumBadge",
    rating numeric(2,1) DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.gift OWNER TO postgre;

--
-- Name: gift_rates; Type: TABLE; Schema: public; Owner: postgre
--

CREATE TABLE public.gift_rates (
    id integer NOT NULL,
    "giftId" character varying(255) NOT NULL,
    "userId" character varying(255) NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.gift_rates OWNER TO postgre;

--
-- Name: gift_rates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgre
--

CREATE SEQUENCE public.gift_rates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.gift_rates_id_seq OWNER TO postgre;

--
-- Name: gift_rates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgre
--

ALTER SEQUENCE public.gift_rates_id_seq OWNED BY public.gift_rates.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgre
--

CREATE TABLE public."user" (
    id character varying(255) NOT NULL,
    email character varying(100) NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."user" OWNER TO postgre;

--
-- Name: gift_rates id; Type: DEFAULT; Schema: public; Owner: postgre
--

ALTER TABLE ONLY public.gift_rates ALTER COLUMN id SET DEFAULT nextval('public.gift_rates_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgre
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
bf801b14-df50-40d7-b62b-3cfeefb81195	9bad9943e3fe0347b4b85cb53831b9e6347f4e9e826ff1b832aa1503e3a7b28f	2024-08-09 03:33:24.481404+00	20240809033324_init	\N	\N	2024-08-09 03:33:24.425641+00	1
2e85f145-0c3e-41d6-98a4-2abd1c630c6e	9a8033791b56ea41c938d257aa87d229f3066465d41360475523d05bbff79549	2024-08-09 11:13:58.312321+00	20240809111358_rating	\N	\N	2024-08-09 11:13:58.256654+00	1
a6db08a0-dd45-4a83-baa2-afb174a03ca6	4dd01c3e0e15d4aaf4cdba1a8d0b1d343e29c5750b11690c5cbbba3e4f7610fa	2024-08-09 11:16:56.629813+00	20240809111656_table_name	\N	\N	2024-08-09 11:16:56.535638+00	1
aecca685-f17c-4b0d-b61d-74a421423293	a51cca1e06438dc705b2014d1e8a4f2a3381380b04549eadf1540d8fc3ae121e	2024-08-09 14:21:49.207007+00	20240809142149_gift_rate_relation_column	\N	\N	2024-08-09 14:21:49.176137+00	1
13eba0a2-8153-4d25-84d5-d693bf4e7182	660f45ea9d342727252201d080b3839cde72fbf2b330a30d3428596e07a0a648	2024-08-09 16:29:33.114774+00	20240809162933_gift_rview_count	\N	\N	2024-08-09 16:29:33.10133+00	1
932b9a9f-2b92-4175-8a86-4b8ccadba0db	2f19abc94ef1971dd15e772699da7f41404febb998fcb52836b062932a0657c2	2024-08-09 17:02:04.791758+00	20240809170204_gift_rating_default	\N	\N	2024-08-09 17:02:04.780319+00	1
\.


--
-- Data for Name: gift; Type: TABLE DATA; Schema: public; Owner: postgre
--

COPY public.gift (uuid, name, description, stock, price, review_count, image_1, badge, rating, created_at, updated_at) FROM stdin;
f87e7694-7e07-4541-bf65-fa9e2686d83e	Electronic Granite Chips	Sophismata contego distinctio bene libero desipio. Ver vulgo odit tempore impedit universe audentia statua speculum convoco. Antea comminor assumenda numquam titulus capitulus.	41	21674598	0	https://loremflickr.com/640/480?lock=4984293380063232	NEW	0.0	2024-08-09 11:18:26.835	2024-08-09 11:18:26.835
ba2411a3-ac0e-47da-aec3-1d9731686d17	Incredible Steel Chair	Suasoria trans rerum temperantia uter optio titulus. Contigo cura creta vester. Pecto comis absum aspernatur paulatim.	4	15438877	0	https://loremflickr.com/640/480?lock=8460602737426432	NEW	0.0	2024-08-09 11:18:13.846	2024-08-09 11:18:13.846
7da92793-ce08-4454-b38f-503db2f570bf	Handmade Granite Cheese	Speculum taceo repellendus cunctatio antepono uredo suppellex dolorem admiratio. Ut eligendi verbera turpis iste. Carbo vacuus adhuc patria tener caute accusamus.	70	25750419	3	https://loremflickr.com/640/480?lock=4953157373263872	BEST_SELLER	3.5	2024-08-09 11:18:11.828	2024-08-09 11:18:11.828
9d4998eb-84fd-410b-9128-9796903d7b44	Tasty Frozen Chicken	Ut sequi crustulum excepturi accusantium. Cauda desolo cras brevis tergeo. Ancilla tristis cetera.	22	27874260	0	https://picsum.photos/seed/F45U2J7c/640/480	NEW	0.0	2024-08-09 16:59:16.827	2024-08-09 16:59:16.827
eeda25e3-80ed-4ae9-ab2c-31ae2e1fd72f	Bespoke Granite Keyboard	Cunabula tametsi adstringo debeo denique vereor nam cunae alius vehemens. Agnosco cibo teres tabernus et commemoro voro error spero. Ter canonicus stella.	62	15602486	1	https://loremflickr.com/640/480?lock=36276570947584	NEW	2.0	2024-08-09 16:59:43.671	2024-08-09 16:59:43.671
\.


--
-- Data for Name: gift_rates; Type: TABLE DATA; Schema: public; Owner: postgre
--

COPY public.gift_rates (id, "giftId", "userId", rating, comment, created_at, updated_at) FROM stdin;
4	7da92793-ce08-4454-b38f-503db2f570bf	2bf53fbf-03ed-46fe-a6e4-ad29cce44847	4	rate	2024-08-09 16:55:56.44	2024-08-09 16:55:56.44
5	7da92793-ce08-4454-b38f-503db2f570bf	2bf53fbf-03ed-46fe-a6e4-ad29cce44847	3	rate	2024-08-09 16:55:59.321	2024-08-09 16:55:59.321
6	7da92793-ce08-4454-b38f-503db2f570bf	2bf53fbf-03ed-46fe-a6e4-ad29cce44847	4	rate	2024-08-09 16:56:03.674	2024-08-09 16:56:03.674
7	eeda25e3-80ed-4ae9-ab2c-31ae2e1fd72f	2bf53fbf-03ed-46fe-a6e4-ad29cce44847	2	rate	2024-08-09 17:03:20.811	2024-08-09 17:03:20.811
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgre
--

COPY public."user" (id, email, username, password, name, created_at, updated_at) FROM stdin;
2bf53fbf-03ed-46fe-a6e4-ad29cce44847	maria@guess.com	maria	$2b$10$IpfEFRZ32r9zTBA4bg0bWOtP4vIgx9Awsc/7f.kUlwifEJcjTPiri	maria	2024-08-09 16:12:38.323	2024-08-09 16:12:38.323
\.


--
-- Name: gift_rates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgre
--

SELECT pg_catalog.setval('public.gift_rates_id_seq', 7, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgre
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: gift gift_pkey; Type: CONSTRAINT; Schema: public; Owner: postgre
--

ALTER TABLE ONLY public.gift
    ADD CONSTRAINT gift_pkey PRIMARY KEY (uuid);


--
-- Name: gift_rates gift_rates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgre
--

ALTER TABLE ONLY public.gift_rates
    ADD CONSTRAINT gift_rates_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgre
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_email_key; Type: INDEX; Schema: public; Owner: postgre
--

CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);


--
-- Name: user_username_key; Type: INDEX; Schema: public; Owner: postgre
--

CREATE UNIQUE INDEX user_username_key ON public."user" USING btree (username);


--
-- Name: gift_rates gift_rates_giftId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgre
--

ALTER TABLE ONLY public.gift_rates
    ADD CONSTRAINT "gift_rates_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES public.gift(uuid) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: gift_rates gift_rates_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgre
--

ALTER TABLE ONLY public.gift_rates
    ADD CONSTRAINT "gift_rates_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgre
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

