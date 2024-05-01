--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: admin
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO admin;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Incident; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Incident" (
    id text NOT NULL,
    description text NOT NULL,
    date_incident timestamp(3) without time zone NOT NULL,
    order_process_id text NOT NULL,
    date_resolved timestamp(3) without time zone,
    created_by text NOT NULL,
    updated_by text NOT NULL,
    created_at timestamp(3) without time zone NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Incident" OWNER TO admin;

--
-- Name: OutsourcedTransportCompany; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."OutsourcedTransportCompany" (
    id text NOT NULL,
    legal_person_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public."OutsourcedTransportCompany" OWNER TO admin;

--
-- Name: OutsourcedTransportCompanyContract; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."OutsourcedTransportCompanyContract" (
    id text NOT NULL,
    outsourced_transport_company_id text NOT NULL,
    carrier_company_id text NOT NULL,
    legal_client_order_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by text NOT NULL,
    contract_number text NOT NULL
);


ALTER TABLE public."OutsourcedTransportCompanyContract" OWNER TO admin;

--
-- Name: _VehicleBodyworkToVehicleType; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."_VehicleBodyworkToVehicleType" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_VehicleBodyworkToVehicleType" OWNER TO admin;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._prisma_migrations OWNER TO admin;

--
-- Name: carrier_companies; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.carrier_companies (
    id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL,
    legal_person_id text NOT NULL,
    rntrc text NOT NULL
);


ALTER TABLE public.carrier_companies OWNER TO admin;

--
-- Name: ciots_for_legal_clients; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.ciots_for_legal_clients (
    id text NOT NULL,
    ciot text NOT NULL,
    emission_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    legal_contract_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.ciots_for_legal_clients OWNER TO admin;

--
-- Name: company_vehicles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.company_vehicles (
    id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    vehicle_id text NOT NULL,
    updated_by text NOT NULL,
    company_id text NOT NULL,
    "orderProcessingLegalClientId" text
);


ALTER TABLE public.company_vehicles OWNER TO admin;

--
-- Name: completed_orders; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.completed_orders (
    id text NOT NULL,
    order_processing_number text NOT NULL,
    vehicle_id text NOT NULL,
    total_distance double precision NOT NULL,
    total_spend_liters double precision NOT NULL,
    total_spending_money double precision NOT NULL,
    start_at timestamp(3) without time zone NOT NULL,
    end_at timestamp(3) without time zone NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    created_at timestamp(3) without time zone NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.completed_orders OWNER TO admin;

--
-- Name: contract_outsourced_drivers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.contract_outsourced_drivers (
    id text NOT NULL,
    type text NOT NULL,
    situation text NOT NULL,
    start_at timestamp(3) without time zone NOT NULL,
    end_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    cpf text NOT NULL,
    updated_by text NOT NULL,
    outsourced_driver_id text NOT NULL,
    contract_number text NOT NULL
);


ALTER TABLE public.contract_outsourced_drivers OWNER TO admin;

--
-- Name: freight_expenses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.freight_expenses (
    id text NOT NULL,
    expense_name text NOT NULL,
    value double precision NOT NULL,
    legal_client_order_id text,
    physical_customer_id text
);


ALTER TABLE public.freight_expenses OWNER TO admin;

--
-- Name: icms; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.icms (
    id text NOT NULL,
    state_orgin text NOT NULL,
    recipient_state text NOT NULL,
    aliquot double precision NOT NULL,
    effective_date timestamp(3) without time zone NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.icms OWNER TO admin;

--
-- Name: legal_Contracts; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."legal_Contracts" (
    id text NOT NULL,
    legal_client_id text NOT NULL,
    carrier_company_id text NOT NULL,
    contract_number text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    delivery_conditions character varying(500) NOT NULL,
    effective_date timestamp(3) without time zone NOT NULL,
    observations character varying(500),
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public."legal_Contracts" OWNER TO admin;

--
-- Name: legal_client_cte; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.legal_client_cte (
    id text NOT NULL,
    order_id text NOT NULL,
    access_key text NOT NULL,
    type_cte text NOT NULL,
    observations text NOT NULL,
    cte_number text NOT NULL
);


ALTER TABLE public.legal_client_cte OWNER TO admin;

--
-- Name: legal_client_quote; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.legal_client_quote (
    id text NOT NULL,
    cod_quote text NOT NULL,
    recipient_id text NOT NULL,
    sender_id text NOT NULL,
    who_pays text NOT NULL,
    postal_cod_origin text NOT NULL,
    postal_cod_destiny text NOT NULL,
    type_merchandise text NOT NULL,
    amount integer NOT NULL,
    description text NOT NULL,
    mass double precision NOT NULL,
    volume double precision NOT NULL,
    nf_value double precision NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.legal_client_quote OWNER TO admin;

--
-- Name: legal_clients; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.legal_clients (
    id text NOT NULL,
    branch text NOT NULL,
    legal_person_id text NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.legal_clients OWNER TO admin;

--
-- Name: legal_orders; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.legal_orders (
    id text NOT NULL,
    "order" text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL,
    legal_contract_id text NOT NULL,
    order_processing_id text,
    completed_orders_id text,
    quote_table_id text NOT NULL,
    carrier_id text NOT NULL
);


ALTER TABLE public.legal_orders OWNER TO admin;

--
-- Name: legal_people; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.legal_people (
    id text NOT NULL,
    fantasy_name text NOT NULL,
    cnpj text NOT NULL,
    state_registration text NOT NULL,
    corporate_name text NOT NULL,
    public_place text NOT NULL,
    address_number text NOT NULL,
    neighborhood text NOT NULL,
    complement text,
    city text NOT NULL,
    uf text NOT NULL,
    first_phone text NOT NULL,
    second_phone text,
    third_phone text,
    email text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.legal_people OWNER TO admin;

--
-- Name: maintenance; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.maintenance (
    id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by text NOT NULL,
    maintenance_company_id text NOT NULL,
    finished_at timestamp(3) without time zone,
    type_of_maintenance_id text NOT NULL,
    vehicle_id text NOT NULL
);


ALTER TABLE public.maintenance OWNER TO admin;

--
-- Name: maintenance_companies; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.maintenance_companies (
    id text NOT NULL,
    specialty_maintenance text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by text NOT NULL,
    legal_person_id text NOT NULL
);


ALTER TABLE public.maintenance_companies OWNER TO admin;

--
-- Name: natural_people; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.natural_people (
    id text NOT NULL,
    name text NOT NULL,
    date_birth timestamp(3) without time zone NOT NULL,
    gender text NOT NULL,
    cpf text NOT NULL,
    rg text NOT NULL,
    cep text NOT NULL,
    public_place text NOT NULL,
    address_number text NOT NULL,
    neighborhood text NOT NULL,
    complement text,
    city text NOT NULL,
    uf text NOT NULL,
    first_phone text NOT NULL,
    second_phone text,
    third_phone text,
    email text NOT NULL,
    nationality text NOT NULL
);


ALTER TABLE public.natural_people OWNER TO admin;

--
-- Name: order_procesing; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.order_procesing (
    id text NOT NULL,
    order_processing_number text NOT NULL,
    vehicle_id text NOT NULL,
    total_distance double precision NOT NULL,
    total_spend_liters double precision NOT NULL,
    total_spending_money double precision NOT NULL,
    start_at timestamp(3) without time zone NOT NULL,
    end_at timestamp(3) without time zone,
    updated_at timestamp(3) without time zone NOT NULL,
    created_at timestamp(3) without time zone NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL,
    status text DEFAULT 'created'::text NOT NULL
);


ALTER TABLE public.order_procesing OWNER TO admin;

--
-- Name: outsourcedT_transport_company_driver; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."outsourcedT_transport_company_driver" (
    id text NOT NULL,
    cnh text NOT NULL,
    cnh_expiration timestamp(3) without time zone NOT NULL,
    course_mopp boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL,
    natural_person_id text NOT NULL,
    outsourced_transport_company_id text NOT NULL,
    cnh_category text NOT NULL
);


ALTER TABLE public."outsourcedT_transport_company_driver" OWNER TO admin;

--
-- Name: outsourced_drivers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.outsourced_drivers (
    id text NOT NULL,
    cnh text NOT NULL,
    cnh_expiration timestamp(3) without time zone NOT NULL,
    course_mopp boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    outsourced_vehicle_id text,
    updated_by text NOT NULL,
    natural_person_id text NOT NULL,
    cnh_category text NOT NULL,
    company_vehicle_id text
);


ALTER TABLE public.outsourced_drivers OWNER TO admin;

--
-- Name: outsourced_transport_vehicle; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.outsourced_transport_vehicle (
    id text NOT NULL,
    outsourced_company_id text NOT NULL,
    vehicle_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.outsourced_transport_vehicle OWNER TO admin;

--
-- Name: outsourced_vehicles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.outsourced_vehicles (
    id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    vehicle_id text NOT NULL,
    order_processing_id text,
    updated_by text NOT NULL,
    "orderProcessingLegalClientId" text
);


ALTER TABLE public.outsourced_vehicles OWNER TO admin;

--
-- Name: own_drivers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.own_drivers (
    id text NOT NULL,
    cnh text NOT NULL,
    cnh_expiration timestamp(3) without time zone NOT NULL,
    company_vehicle boolean DEFAULT false NOT NULL,
    course_mopp boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL,
    natural_person_id text NOT NULL,
    cnh_category text NOT NULL
);


ALTER TABLE public.own_drivers OWNER TO admin;

--
-- Name: physical_customer_cte; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.physical_customer_cte (
    id text NOT NULL,
    order_id text NOT NULL,
    access_key text NOT NULL,
    type_cte text NOT NULL,
    observations text NOT NULL,
    cte_number text NOT NULL
);


ALTER TABLE public.physical_customer_cte OWNER TO admin;

--
-- Name: physical_customer_quote; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.physical_customer_quote (
    id text NOT NULL,
    cod_quote text NOT NULL,
    recipient_id text NOT NULL,
    "senderId" text NOT NULL,
    who_pays text NOT NULL,
    postal_cod_origin text NOT NULL,
    postal_cod_destiny text NOT NULL,
    type_merchandise text NOT NULL,
    amount integer NOT NULL,
    description text NOT NULL,
    mass double precision NOT NULL,
    volume double precision NOT NULL,
    nf_value double precision NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.physical_customer_quote OWNER TO admin;

--
-- Name: physical_customers; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.physical_customers (
    id text NOT NULL,
    branch text,
    created_by text NOT NULL,
    updated_by text NOT NULL,
    natural_person_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.physical_customers OWNER TO admin;

--
-- Name: physical_orders; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.physical_orders (
    id text NOT NULL,
    "order" text NOT NULL,
    updated_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    physical_customer_id text NOT NULL,
    "completedOrdersId" text,
    order_processing_id text,
    quote_table_id text NOT NULL,
    carrier_id text NOT NULL
);


ALTER TABLE public.physical_orders OWNER TO admin;

--
-- Name: recipient; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.recipient (
    id text NOT NULL,
    legal_person_id text,
    natural_person_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.recipient OWNER TO admin;

--
-- Name: sender; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.sender (
    id text NOT NULL,
    legal_person_id text,
    natural_person_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.sender OWNER TO admin;

--
-- Name: types_of_maintenances; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.types_of_maintenances (
    id text NOT NULL,
    description text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by text NOT NULL,
    "typeMaintenance" text NOT NULL
);


ALTER TABLE public.types_of_maintenances OWNER TO admin;

--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role text NOT NULL,
    avatar_url text
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: vehicle_bodyworks; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.vehicle_bodyworks (
    id text NOT NULL,
    name text NOT NULL,
    axles integer NOT NULL,
    mass double precision NOT NULL,
    volume double precision NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.vehicle_bodyworks OWNER TO admin;

--
-- Name: vehicle_brands; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.vehicle_brands (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.vehicle_brands OWNER TO admin;

--
-- Name: vehicle_models; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.vehicle_models (
    id text NOT NULL,
    name text NOT NULL,
    weight double precision NOT NULL,
    capacity_max double precision NOT NULL,
    axles integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    brand_id text NOT NULL,
    type_id text NOT NULL,
    capacity_per_axle integer,
    updated_by text NOT NULL
);


ALTER TABLE public.vehicle_models OWNER TO admin;

--
-- Name: vehicle_types; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.vehicle_types (
    id text NOT NULL,
    name text NOT NULL,
    bodywork boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by text NOT NULL,
    updated_by text NOT NULL
);


ALTER TABLE public.vehicle_types OWNER TO admin;

--
-- Name: vehicles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.vehicles (
    id text NOT NULL,
    plate text NOT NULL,
    year text NOT NULL,
    color text NOT NULL,
    renavam text NOT NULL,
    model_id text NOT NULL,
    antt text NOT NULL,
    is_ipva_paid boolean NOT NULL,
    registration timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.vehicles OWNER TO admin;

--
-- Data for Name: Incident; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Incident" (id, description, date_incident, order_process_id, date_resolved, created_by, updated_by, created_at, updated_at) FROM stdin;
ca5557fe-0550-4b67-8ab5-1e94c3ae24a3	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:15.888	2024-04-25 23:06:15.888
3689b656-5fb5-43b2-80dd-3a9669e949f0	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:18.263	2024-04-25 23:06:18.263
fb10357a-c8b6-43a2-99d1-3ce210554347	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:18.906	2024-04-25 23:06:18.906
53c49e2a-7745-4c12-a3b2-6fb6b1edbf23	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:19.406	2024-04-25 23:06:19.406
551786ae-6892-420a-be9b-c3edd9565191	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:19.863	2024-04-25 23:06:19.863
26d857c3-d85c-4544-9009-d28229098744	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:20.802	2024-04-25 23:06:20.802
d9ed0ef5-8fbd-4d67-b3fe-28dbf1a03642	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:21.093	2024-04-25 23:06:21.093
49726d48-42e7-4aef-a0ab-dd5db0f8b85c	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:21.273	2024-04-25 23:06:21.273
e8db7f0a-6e6b-4fb2-a634-a29d8fac2f9f	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:21.502	2024-04-25 23:06:21.502
cb52912f-a5e4-42d0-8838-8a6cd0b56161	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:21.602	2024-04-25 23:06:21.602
2d7d108a-f6a6-44a5-917f-8a0bd4ec6131	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:21.758	2024-04-25 23:06:21.758
9e2c3b40-2c5d-4b5e-bbc6-7300da232f3a	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:21.933	2024-04-25 23:06:21.933
c5ddfdb5-263d-4023-927b-2d4562588570	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:22.082	2024-04-25 23:06:22.082
c4395936-8e54-4883-af86-055e09ad505e	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:22.242	2024-04-25 23:06:22.242
62ae3146-4217-41e7-8c98-728e4b9f9e80	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:22.401	2024-04-25 23:06:22.401
beb6b230-2ed1-4562-95f7-0457913f3a40	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:22.591	2024-04-25 23:06:22.591
8963474f-8dd3-44f0-aee2-ca01b34fcacd	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:22.752	2024-04-25 23:06:22.752
d121766b-4735-4afe-ac19-979eb51b7e30	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:22.899	2024-04-25 23:06:22.899
5b89812b-31a6-465c-b4ea-7260a526c42f	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:23.054	2024-04-25 23:06:23.054
cf700905-c91c-49a8-ba64-072d69c755ea	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:23.151	2024-04-25 23:06:23.151
1ed9bbc4-ba1d-4e28-b71a-8edfdfa076b0	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:23.311	2024-04-25 23:06:23.311
73003aab-0e73-48e3-9243-ae6f70e46a88	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:23.481	2024-04-25 23:06:23.481
ea69c569-65e8-4e71-a3a0-8885bb7aa35b	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:23.652	2024-04-25 23:06:23.652
c1546047-a274-4768-a65f-68252d24321b	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:23.892	2024-04-25 23:06:23.892
305bf500-c4c8-4ed9-9d84-a8cf40455534	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:24.191	2024-04-25 23:06:24.191
4d97f47d-8f08-4c2a-811d-abfc591ec4aa	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:24.331	2024-04-25 23:06:24.331
8ca44084-54ec-42d3-8a96-540e82bb34ed	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:24.481	2024-04-25 23:06:24.481
b5e1ab0a-6cf4-4c4c-a388-e0c80ae17b1f	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:24.621	2024-04-25 23:06:24.621
472f501d-5c39-428a-b965-de86b03af9d6	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:24.771	2024-04-25 23:06:24.771
65ab0d8c-5437-4efa-b57a-88e5dfb78338	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:24.931	2024-04-25 23:06:24.931
9496dcc5-2c45-46c2-abe9-aaea6e150928	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:25.084	2024-04-25 23:06:25.084
7734a541-b2a8-48ac-b846-36612d85e32a	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:25.221	2024-04-25 23:06:25.221
c5ab9600-4bb6-4b81-8bd3-c6ac6f360ac8	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:25.361	2024-04-25 23:06:25.361
c90b3c20-7d03-4202-aaf3-f0ee9526b9dd	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:25.521	2024-04-25 23:06:25.521
ab17944e-7d35-499d-9ccb-a6b5c8748101	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:25.681	2024-04-25 23:06:25.681
bd31bca8-ca40-436a-b2e0-d94644580f9d	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:25.841	2024-04-25 23:06:25.841
838a2587-c892-44b0-8a22-3d5793eba5b9	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:26.002	2024-04-25 23:06:26.002
7554cb1f-d233-47af-876d-8c767b7f4aa3	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:26.161	2024-04-25 23:06:26.161
8ea90c2f-668f-4477-ba39-4c9012322e04	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:26.311	2024-04-25 23:06:26.311
d4be9848-1a1a-4853-b41f-05eeddba98ad	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:26.461	2024-04-25 23:06:26.461
83bf5264-105b-4a19-abee-04bf905f04d3	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:26.611	2024-04-25 23:06:26.611
88f5bc1c-6c45-4df6-8e44-cfe141186475	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:26.761	2024-04-25 23:06:26.761
a4671558-f32d-4f48-9db6-775c812776e6	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:26.921	2024-04-25 23:06:26.921
eee19a3d-f312-4cd7-975d-0b1b843f2bf1	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:27.082	2024-04-25 23:06:27.082
2a1d7b29-634a-472c-9163-9774263e5d82	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:27.221	2024-04-25 23:06:27.221
2f6140de-8ed3-462f-a5f3-cc34c1717e38	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:27.361	2024-04-25 23:06:27.361
e847cd33-9109-4baa-837d-43e2459c2508	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:27.531	2024-04-25 23:06:27.531
d624b780-8474-4c75-aca9-db7f2764b821	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:27.683	2024-04-25 23:06:27.683
585acb9f-1118-43ee-880d-f1eb5f9368f3	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:27.872	2024-04-25 23:06:27.872
6c90d39f-a353-4a56-97b7-9ee8940de401	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:27.971	2024-04-25 23:06:27.971
196d831a-efab-4107-ba08-d20e00b64bff	TTE	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:24.032	2024-04-25 23:20:02.757
28608229-79c7-4ec9-a4ed-03899cc454e0	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:28.322	2024-04-25 23:06:28.322
14bcbc2a-96f7-4ff5-9796-a7d74cda4e99	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:28.484	2024-04-25 23:06:28.484
7e625d7a-a70e-4251-81e6-7c8ce202824e	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:28.631	2024-04-25 23:06:28.631
ff8b0dba-2b67-44af-9722-330d350c95b6	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:28.791	2024-04-25 23:06:28.791
834259f2-a3d2-4647-922c-e5634e178095	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:28.924	2024-04-25 23:06:28.924
f30c7ace-2120-4781-9667-d8c93b7c6d59	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:29.081	2024-04-25 23:06:29.081
f2cc415f-f086-4f78-9692-ba570eb7d9be	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:29.551	2024-04-25 23:06:29.551
a9b86bfc-286c-442f-b5ab-bc6bb2cb725b	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:29.701	2024-04-25 23:06:29.701
5b0fc440-56dd-49ba-a750-00c2dd21fca4	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:29.851	2024-04-25 23:06:29.851
db8751a2-4237-4c23-9f6e-4677158b83c6	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:30.061	2024-04-25 23:06:30.061
f9941760-a140-4c3f-aa7f-25c4abde46aa	Tesdr	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:30.141	2024-04-25 23:06:30.141
1317fc3e-1548-4d24-b560-55d6d9eda30e	Sasds	1970-01-20 20:08:00.458	1fc6f459-5fdf-4db8-a859-ed65a340da6d	\N	123	123	2024-04-25 23:06:20.372	2024-04-25 23:20:02.757
\.


--
-- Data for Name: OutsourcedTransportCompany; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."OutsourcedTransportCompany" (id, legal_person_id, created_at, updated_at, created_by, updated_by) FROM stdin;
\.


--
-- Data for Name: OutsourcedTransportCompanyContract; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."OutsourcedTransportCompanyContract" (id, outsourced_transport_company_id, carrier_company_id, legal_client_order_id, created_at, created_by, updated_at, updated_by, contract_number) FROM stdin;
\.


--
-- Data for Name: _VehicleBodyworkToVehicleType; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."_VehicleBodyworkToVehicleType" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
86f97020-8108-4e9e-8666-0fb7c1d01be4	45431af10c9cd3c2c808a4db361262f7a9e15241f3e02cabd8c03790b9422b65	2024-04-06 13:52:13.750487+00	20240207230346_	\N	\N	2024-04-06 13:52:13.707158+00	1
035c2fac-7439-4b7b-b98a-9ac7af47004a	acba2316af180aaef7710a119059c0003851e91ea8c7cdbb1cc5131ce09b5fc7	2024-04-06 13:52:12.192844+00	20230609171326_init	\N	\N	2024-04-06 13:52:12.158706+00	1
b4b98278-9861-40d1-8681-7dd35d7dea96	568d8939593ff4e3131b5ba1ea6d142f639ad7985ee702d51dca014884d47a4e	2024-04-06 13:52:13.433401+00	20231123223551_	\N	\N	2024-04-06 13:52:13.424836+00	1
3b8b9bce-1b26-4d97-b6af-3ab8a433afab	87f0bda62860a1689756c82cda25bdc99fd3b7cfc362f15cf62ca553c0ed2362	2024-04-06 13:52:12.761983+00	20230820000102_	\N	\N	2024-04-06 13:52:12.196793+00	1
37648ece-f08f-4957-8e23-7216130a5a39	d9a4e20063ef26f2dccc70d99378e645092456d5883b953bc04336102f9faf29	2024-04-06 13:52:12.786274+00	20230828010254_updated_relations_and_add_colum_updated_by_in_fields	\N	\N	2024-04-06 13:52:12.764554+00	1
dd9d47be-5ec5-41b6-b902-f9960700c0cb	e0dc270780a3f856760800327b298c745b3f568608543be5afadb3e15cb3486f	2024-04-06 13:52:12.833108+00	20230910004900_add_collum_capaciy_per_axle_in_vehicle_model	\N	\N	2024-04-06 13:52:12.788884+00	1
df0f469f-6c67-440f-9bfe-cfb68e6a8e1e	ea35a2cd2680d8294c64c77919baa399708b514f24dd321e61b5d172b76cebd9	2024-04-06 13:52:13.457032+00	20231128233242_	\N	\N	2024-04-06 13:52:13.436136+00	1
ea577176-d735-4504-8dd5-cf2ca6956acc	9825c28c2661af92618bcdbf92f57b94aae7616ccf367734c4ae441de2ab2a9d	2024-04-06 13:52:12.846145+00	20230912201735_	\N	\N	2024-04-06 13:52:12.837274+00	1
9aec36be-a393-409c-a4ac-10ba8cbfce38	2a21bff14e930a4db63183cab333045f86031c4ef9073fe24462a4a0cb3500fd	2024-04-06 13:52:12.860912+00	20231007214630_	\N	\N	2024-04-06 13:52:12.850319+00	1
d9b80eb4-ebf7-46f2-842e-a4eaaaa2d08d	aa8e79339cb9b1067a8f65da6005dca8d5c8c13bda4e065ab6588882f065322f	2024-04-06 13:52:13.90455+00	20240309023509_alter_user_add_avatar_url	\N	\N	2024-04-06 13:52:13.892391+00	1
7d581197-100e-4ac6-8dad-fb972a8026fd	a2a58e276630960a219a79cc1af00cd30e2245d17a1b9e30fc47f0bd3fc1d05c	2024-04-06 13:52:12.885955+00	20231008140047_	\N	\N	2024-04-06 13:52:12.863634+00	1
b4705e33-56c8-4c5b-b1ba-f8543a23eb9a	c4f7af956fb1731c74163da6ac8590ca8ebe764ce33df1e9fcace7c9754326b5	2024-04-06 13:52:13.473465+00	20231204231759_	\N	\N	2024-04-06 13:52:13.460855+00	1
297115a3-1cd4-4a6c-9d8f-d0fa8a1b2bca	a236cd4fb43bd1b1e801808b3d41fc6b1581c55d1fc094febe6985cfe15f1e49	2024-04-06 13:52:12.911231+00	20231012185010_	\N	\N	2024-04-06 13:52:12.890024+00	1
7bea0690-0db7-4a74-b89e-461fca0b3c2c	04f690086bec157b7dc2b31f82e74acd81d65192aa4a05f78cbd48c09f956fe0	2024-04-06 13:52:12.950014+00	20231017214516_	\N	\N	2024-04-06 13:52:12.915248+00	1
b6dafbe2-9e68-44d6-8d79-75329dbd366c	0874c641a7e2895ade40edc8ce35aacdac6905a23086f646fb776c102c747618	2024-04-06 13:52:13.767414+00	20240213144500_	\N	\N	2024-04-06 13:52:13.752953+00	1
4b38609c-cdad-4b85-aed0-860a7eea22d7	9f7ae82ef8431e3c9afd90e5f9790a133952c5361684104c0144047a36d968f1	2024-04-06 13:52:12.966952+00	20231018232059_	\N	\N	2024-04-06 13:52:12.953844+00	1
8b04a995-dd48-4b1c-b0ae-cee5924f989e	ecc1d33a81024087bd391902b40f7f3f267bae8a9d1fd9d0a42601473927b599	2024-04-06 13:52:13.484662+00	20231206210538_	\N	\N	2024-04-06 13:52:13.476158+00	1
7e3c79d9-17a2-49f0-bb2b-f48385fd53af	c711294d8f228b18384079f750c5c42b08c99ec00b7dfb8b80751011a5d3ed44	2024-04-06 13:52:12.991545+00	20231022201723_	\N	\N	2024-04-06 13:52:12.97118+00	1
2ca3390f-d142-4fb8-93f5-4ff9d4541051	d892ff69e669ff9be048ecddcba48553d1f1c81216707a213028eb82947be66a	2024-04-06 13:52:13.016427+00	20231024233540_	\N	\N	2024-04-06 13:52:12.995495+00	1
cfb2b223-7e85-413e-9a5a-40df931b6070	4511c3f1e2ebd7df47a4dbdfcefe7ee7ed0dd2e0eb4ad31ddc3eda900ef98b95	2024-04-06 13:52:13.044639+00	20231025213429_	\N	\N	2024-04-06 13:52:13.020487+00	1
6cd7f4c1-e5a6-4617-a4a5-dabc56745bf6	b1a5463e7ee12eeee14daaac06347cd5adfb3f4d32cc399d9ab294d29b4ff57a	2024-04-06 13:52:13.619868+00	20231207223816_	\N	\N	2024-04-06 13:52:13.487338+00	1
cd7cbe5b-2aee-4496-bda5-a918f32d17d1	50e1710fe40d82ecf7e3b1930e7047f55ac9d01e4c59ef955d3b808b2921b44a	2024-04-06 13:52:13.422383+00	20231102204736_	\N	\N	2024-04-06 13:52:13.048991+00	1
b16f66f8-361e-4b3b-8d6a-9160d161f849	ae96487c5846ebca7011d9b32ed54819e9e00c8d5931877c8bd2d913779a08d0	2024-04-06 13:52:13.855807+00	20240307215818_ajust_physical_customer_order_name_physical_merchandise	\N	\N	2024-04-06 13:52:13.842156+00	1
5ca754cd-ba67-44bf-8936-80c970bfb743	13e387555de8213a13cb51c4bfc968db4adbc1ca91f8883b1e71c563d5ff47f1	2024-04-06 13:52:13.64265+00	20231212223708_	\N	\N	2024-04-06 13:52:13.622525+00	1
f6c6c049-2a5b-4bc4-9a02-d7cd589778b2	3e7fc3877ff9f25ac3c3db60344da39889fecdb33d59ae9800fce6340df6ddc2	2024-04-06 13:52:13.791199+00	20240306003738_add_rntc_field_in_carrier_company_table	\N	\N	2024-04-06 13:52:13.771194+00	1
3847e840-2586-4f06-92a0-7f754862dabc	cea223ee81c3c8c8203f035ac121303caca6a8709969a7dc906d00ba99b61968	2024-04-06 13:52:13.659786+00	20240103223054_	\N	\N	2024-04-06 13:52:13.646674+00	1
d167db32-9e6d-41df-9280-93785263599f	512345d7b210fcc03a1ba80fa7d8e2c968173909e89fb514055c090b91017dc9	2024-04-06 13:52:13.677612+00	20240123214447_	\N	\N	2024-04-06 13:52:13.662456+00	1
c8082c19-7d68-44b8-9e1f-206e84d71be2	0e6c4b57a15f54b6c944aca0c19ad58fee9eb3ade2debb51453ff6ba532e0761	2024-04-06 13:52:13.702903+00	20240123232954_	\N	\N	2024-04-06 13:52:13.681731+00	1
ef330ce8-fbe9-4c80-aab5-bf5b652450e2	31c71430881ced0eed19c974c519eef6ab9e8dedbc511c869af2aa8960a8de47	2024-04-06 13:52:13.804732+00	20240306202547_change_field_rntrc_expiration_for_antt_in_vehicle_table	\N	\N	2024-04-06 13:52:13.795188+00	1
0902ad20-fb16-45f2-b456-44dec60c93fc	a60bc65baede98c063337f076a4d583d39b406653df414a4a78eb19955acd3cf	2024-04-06 13:52:13.870599+00	20240307224431_	\N	\N	2024-04-06 13:52:13.859952+00	1
60bced6e-4b54-44b4-a5e7-ce551ef59a95	5bdb5270d77daddd84cc974ece77213d3b64f98367c1d3ac80d5d98447329839	2024-04-06 13:52:13.815712+00	20240306205703_add_field_registration_and_is_ipva_paid_in_vehicle	\N	\N	2024-04-06 13:52:13.807234+00	1
e8ce51eb-fb65-4eed-ae65-b745f52c20a4	dd5a2e2ac68423fbbd10290809eca4768c9217e596bed8fac3e9338b84fb8d37	2024-04-06 13:52:13.838042+00	20240307215512_	\N	\N	2024-04-06 13:52:13.818551+00	1
f2020582-0abc-4c4a-a6e1-b6b2d1d628ec	42756acc2997db4b8b29e90b5dc4400874d6aebd0bf4fa7fd1c0bddba512fb93	2024-04-06 13:52:13.888307+00	20240309010946_	\N	\N	2024-04-06 13:52:13.87333+00	1
d68571a8-aced-48e2-8bc6-cff0d818b9a0	f7f59f7bc3668f0d235bac5e6b5d76fe06fa14cb5ab36d402b0e419509784561	2024-04-06 13:52:14.098032+00	20240314203951_	\N	\N	2024-04-06 13:52:14.045754+00	1
ccd1da8e-a370-47c1-b1f8-eb975e57d21f	0cf76e44c3474d633ce5e9b56ad7811bb5bd725ad5b186f4a28aeba43006db52	2024-04-06 13:52:14.022541+00	20240309233038_	\N	\N	2024-04-06 13:52:13.908785+00	1
fa89cbce-fd10-4992-b084-c2e087d4d9b6	5c2023e3b7147bbb15ac8fce81b883d9a2a1924b5b0a85d6844ca420b9f25938	2024-04-06 13:52:14.041759+00	20240312203959_	\N	\N	2024-04-06 13:52:14.026354+00	1
98e8777f-034d-4699-a189-9119605444d2	d47d95bcc01e8a19299da996e13b27486cbb7440132df3c5bf133af2010f0423	2024-04-06 13:52:14.162124+00	20240317181959_	\N	\N	2024-04-06 13:52:14.15005+00	1
139d3df5-afb7-408b-9e91-32f8ecd5cc53	a290351ffc28d69e35c5c2db54af498fbc7d42e7bfa39f5ee65a3fa60cc468fd	2024-04-06 13:52:14.146317+00	20240317150314_	\N	\N	2024-04-06 13:52:14.101748+00	1
22b7ac84-d46a-4788-b987-1cf8111a27f0	4e1d8b23d929bee18b10a2ceb7b7244b85c8a40c070dab54769bdbfe3a8ab065	2024-04-06 13:52:14.186785+00	20240317183039_	\N	\N	2024-04-06 13:52:14.166083+00	1
a46f7ded-3fab-4f9d-a168-ea05203bb543	dff0a82a2ff2832debaa745a67ac0b2b7a815e711e08d29b242e1690b52d070a	2024-04-06 13:52:14.264106+00	20240320210539_	\N	\N	2024-04-06 13:52:14.189357+00	1
7b62022d-fda5-4e48-bd3d-870cd74a9a7d	f84aeb97c662a768ba25a4ae2ecf11a5e94d245af5637118d48c81e456d66546	2024-04-06 13:52:14.28068+00	20240320211615_	\N	\N	2024-04-06 13:52:14.267897+00	1
752e7219-d57f-4782-b5da-ca8cb5539342	7f89276b06ab582101d24d20da3b8d2373fb9e75d4d6fa8951328e1c7a0c961c	2024-04-06 13:52:14.399714+00	20240322230238_	\N	\N	2024-04-06 13:52:14.283863+00	1
0880b2b6-fbc9-4395-a24d-d23f8cf91615	65a324cfcb6798443980343aba66d07f5dbbd89923f1f5328fcbc472162940a0	2024-04-06 13:52:14.428769+00	20240328213005_	\N	\N	2024-04-06 13:52:14.402157+00	1
c4f8cb69-25c3-45a0-936b-0e1fa3041659	40fe5f3ea588b176a4f5ff14a618d0755358a485753e9eee2146fab9a65133a7	2024-04-06 13:52:14.440571+00	20240401215129_	\N	\N	2024-04-06 13:52:14.431315+00	1
cd7957f8-1d69-42dd-8644-26b6a35ea57f	1778ca6485dcbe411ae1764d2836095f4cc2938a0cf7e34e4361e358fca6bde4	2024-04-06 13:52:14.461796+00	20240405223110_	\N	\N	2024-04-06 13:52:14.443135+00	1
6abce501-8470-4039-87ff-947df176bd55	91df33b423381710351db6da2e86d85e2ddbedaaea17358b7fdbfa66b0a73e91	2024-04-06 13:52:14.484653+00	20240406132931_	\N	\N	2024-04-06 13:52:14.46564+00	1
c23c39f7-fcad-45f8-b7e2-4f3583ec9e2d	7985528159c7e73d724599a92d92061fc6d4d9dbab211c2aed528c7ad6679dbf	2024-04-06 13:52:14.495939+00	20240406135042_	\N	\N	2024-04-06 13:52:14.487204+00	1
280f2a5c-70e0-4bf7-8038-da1b40e0263d	f5b3711b14236779cdddf6e337f92643f1bba6956948e10a44b1f43b96dd3937	2024-04-06 15:32:48.743248+00	20240406153248_	\N	\N	2024-04-06 15:32:48.72288+00	1
38a13786-6462-4520-9196-d2482518bd7c	0d682df77e7a36a7988d2961ff25d34b37974a0578336a0657e559e0ae756314	2024-04-23 22:41:32.974907+00	20240423224132_add_status_in_order_processing_entity	\N	\N	2024-04-23 22:41:32.91874+00	1
\.


--
-- Data for Name: carrier_companies; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.carrier_companies (id, created_at, updated_at, created_by, updated_by, legal_person_id, rntrc) FROM stdin;
470a163e-653a-4ede-81f5-793523d012c1	2024-04-06 15:38:54.437	2024-04-07 19:16:13.352	123	123	1fe38c07-ef31-49c1-8ebd-f14cacf0383d	1452781914545
\.


--
-- Data for Name: ciots_for_legal_clients; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.ciots_for_legal_clients (id, ciot, emission_date, legal_contract_id, created_at, updated_at, created_by, updated_by) FROM stdin;
\.


--
-- Data for Name: company_vehicles; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.company_vehicles (id, created_at, updated_at, created_by, vehicle_id, updated_by, company_id, "orderProcessingLegalClientId") FROM stdin;
6dbc6ae0-c120-4dc0-bc88-ec57eb35b90f	2024-04-06 18:53:39.459	2024-04-06 18:53:39.459	123	54db2725-2297-497f-a0a0-848c57e14315	123	470a163e-653a-4ede-81f5-793523d012c1	\N
\.


--
-- Data for Name: completed_orders; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.completed_orders (id, order_processing_number, vehicle_id, total_distance, total_spend_liters, total_spending_money, start_at, end_at, updated_at, created_at, created_by, updated_by) FROM stdin;
\.


--
-- Data for Name: contract_outsourced_drivers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.contract_outsourced_drivers (id, type, situation, start_at, end_at, created_at, updated_at, created_by, cpf, updated_by, outsourced_driver_id, contract_number) FROM stdin;
f1671112-7b1a-4963-8d55-13d0c72f00b9	Temporario	ABERTO	1970-01-20 20:02:06.004	1970-01-20 20:02:06.004	2024-04-21 19:02:02.078	2024-04-21 19:02:02.078	123	14521452361	123	a64a956b-0a49-46e1-9e55-6dcee8647aa2	11012101
55b00d8c-5977-49d4-9a93-b6b455aaaac2	Temporario	Temporada	1970-01-20 20:02:06.004	1970-01-20 20:02:06.005	2024-04-21 19:22:49.821	2024-04-21 19:22:49.821	123	14521452361	123	a64a956b-0a49-46e1-9e55-6dcee8647aa2	10201000
e2181f42-2145-4229-9f60-c45e2dd39b6b	Temporario	Finalizado	1970-01-20 20:02:06.004	1970-01-20 20:02:06.005	2024-04-21 19:22:49.822	2024-04-21 19:22:49.822	123	14521452361	123	a64a956b-0a49-46e1-9e55-6dcee8647aa2	21204110
\.


--
-- Data for Name: freight_expenses; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.freight_expenses (id, expense_name, value, legal_client_order_id, physical_customer_id) FROM stdin;
be85ba9d-52c2-4735-aa43-31774f7aab3c	GASOLINA	452.4	\N	49dc129e-c222-488d-9e11-6961ef36d528
\.


--
-- Data for Name: icms; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.icms (id, state_orgin, recipient_state, aliquot, effective_date, created_at, updated_at, created_by, updated_by) FROM stdin;
f2da4c2f-be79-400d-9450-623119958e98	SP	SP	14	1970-01-20 20:08:00.459	2024-04-25 21:28:01.51	2024-04-25 21:28:01.51	123	123
\.


--
-- Data for Name: legal_Contracts; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."legal_Contracts" (id, legal_client_id, carrier_company_id, contract_number, created_at, created_by, delivery_conditions, effective_date, observations, updated_at, updated_by) FROM stdin;
d9655225-b9ec-44c6-983d-d798f4d66aaf	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC11002010	2024-04-29 21:01:30.609	123	sdasd	1970-01-01 04:52:25.145	dsadsad	2024-04-29 21:01:30.609	123
714eec05-ecdc-4774-9876-1e894da57889	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC40000110	2024-04-29 22:31:44.39	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:44.39	123
7c547329-f7fe-4464-804a-ff7978bbfae3	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC00122511	2024-04-29 22:31:44.969	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:44.969	123
f0922a91-fae8-4536-866d-9a9138dd3153	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC05021742	2024-04-29 22:31:45.429	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:45.429	123
ba8129fe-f77b-4eec-b4d1-cc5a2bc92222	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC02441202	2024-04-29 22:31:45.63	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:45.63	123
ba2891c2-91e5-4dba-b401-2df5b28915ac	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC02100252	2024-04-29 22:31:46.12	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:46.12	123
e52ea003-6861-4e65-8d6c-ff3c6397e3b1	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC00000380	2024-04-29 22:31:46.251	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:46.251	123
b4736032-4bac-4d8f-bfa8-4fb9f516f12b	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC20511001	2024-04-29 22:31:46.468	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:46.468	123
8baa2319-bca2-4118-a780-ee9621b810e4	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC20200200	2024-04-29 22:31:46.681	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:46.681	123
c5b6a5e9-3fb3-4dea-8ed9-52ff5fa6e0a8	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC11007112	2024-04-29 22:31:46.829	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:46.829	123
84f1b3b0-4f96-4f11-8ef3-dc03e4ac2a5b	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC06004003	2024-04-29 22:31:46.969	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:46.969	123
c4f4d320-766b-48b1-86cb-c443596283f2	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC02180520	2024-04-29 22:31:47.131	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:47.131	123
b12d0feb-959d-469a-a036-26cc2bd8aa66	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC02111003	2024-04-29 22:31:47.45	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:47.45	123
59e1d7e2-71c5-4062-ada3-a04824e5cb26	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC12302011	2024-04-29 22:31:47.599	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:47.599	123
d315bed4-fd82-45bc-9b3e-c0d9489f3ce9	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC03110110	2024-04-29 22:31:47.739	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:47.739	123
90fc930c-a806-461d-9ffc-dc4c9e95bf55	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC00001330	2024-04-29 22:31:47.9	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:47.9	123
5d29908c-348c-4862-9a8e-7d7fdf45dae5	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC01102144	2024-04-29 22:31:48.04	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:31:48.04	123
b1268bb0-1340-4025-88b7-11ac1116dd8a	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC00424000	2024-04-29 22:32:52.24	123	11446	1970-01-02 17:04:01.456	445246456	2024-04-29 22:32:52.24	123
40e1dd30-a701-405e-8905-39f339f1575e	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC21400200	2024-04-29 22:31:47.32	123	11446	1970-01-02 17:04:01.456	AAAA	2024-04-29 22:35:10.504	123
47679f92-d415-4497-a83f-312a45d0cc73	37bedfee-082f-4d06-8798-62842276a59f	470a163e-653a-4ede-81f5-793523d012c1	CLC63702103	2024-04-29 22:31:45.801	123	11446	1970-01-02 17:04:01.456	BBBBBB	2024-04-29 22:35:10.504	123
\.


--
-- Data for Name: legal_client_cte; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.legal_client_cte (id, order_id, access_key, type_cte, observations, cte_number) FROM stdin;
\.


--
-- Data for Name: legal_client_quote; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.legal_client_quote (id, cod_quote, recipient_id, sender_id, who_pays, postal_cod_origin, postal_cod_destiny, type_merchandise, amount, description, mass, volume, nf_value, created_at, updated_at, created_by, updated_by) FROM stdin;
2bc444bc-4165-469f-8027-3b6f306d14c5	QT74550300	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:27.364	2024-04-27 15:19:27.364	123	123
be08488b-9657-45a5-a943-948f34ae7b7e	QT00160011	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:31.208	2024-04-27 15:19:31.208	123	123
81d48c7f-96c0-47e0-bbb0-beb0c5270c0c	QT05222000	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:41.417	2024-04-27 15:19:41.417	123	123
9fc1fbfd-0119-4e38-b582-e6bcbfa734d1	QT03350061	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:42.833	2024-04-27 15:19:42.833	123	123
40baeeb1-80e7-43ca-8ab3-02b350044bb9	QT00000313	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:43.253	2024-04-27 15:19:43.253	123	123
ecce88b7-b92a-4b15-93cf-6b087888f1ae	QT72030260	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:43.473	2024-04-27 15:19:43.473	123	123
ff0fedbe-b272-4b4b-bce1-5f3f0d876add	QT01212011	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:43.643	2024-04-27 15:19:43.643	123	123
8a3e6181-e687-4402-9842-3b6ec9ec08ff	QT02101130	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:43.857	2024-04-27 15:19:43.857	123	123
c841cdca-b00b-47b1-9787-1354bead5bb1	QT10204001	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:44.183	2024-04-27 15:19:44.183	123	123
774af8b5-7727-4ffa-a65d-c3d91364ba0e	QT46001310	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:44.334	2024-04-27 15:19:44.334	123	123
bcc5b815-837e-4f1d-916b-a8a650a27ac1	QT20210101	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:44.473	2024-04-27 15:19:44.473	123	123
1c22018f-1269-4755-b172-355a14ceb166	QT00031041	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:44.602	2024-04-27 15:19:44.602	123	123
1a8ccea5-083c-47aa-94eb-806e08c5b575	QT11201001	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:44.867	2024-04-27 15:19:44.867	123	123
fe35057a-fe14-48ec-b8ea-e1af5876e88b	QT30103030	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:44.962	2024-04-27 15:19:44.962	123	123
5e8f7f44-9cdc-42ca-b985-5ac46dee7f9d	QT31226021	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:45.152	2024-04-27 15:19:45.152	123	123
b176f7a1-e105-49ec-bd7d-4faaf416c0b1	QT21020012	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:45.301	2024-04-27 15:19:45.301	123	123
e43ed624-9543-458b-bb5a-1d9cffc88f03	QT51052510	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:45.434	2024-04-27 15:19:45.434	123	123
4d68b92c-6604-46ae-8ea2-a6070c9084c8	QT10000002	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:45.574	2024-04-27 15:19:45.574	123	123
aa2e953c-7275-4d0c-b9ae-41556f60e4bc	QT00000032	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:45.822	2024-04-27 15:19:45.822	123	123
d224ee84-ba4f-430b-a8c0-6ac1a82f8412	QT30001211	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:45.963	2024-04-27 15:19:45.963	123	123
f205797b-4538-4841-aa45-c889322ce341	QT32090152	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:46.112	2024-04-27 15:19:46.112	123	123
ecddb122-b42b-4bb6-8fd1-f92d1bd599cb	QT51301030	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:46.423	2024-04-27 15:19:46.423	123	123
b918f148-a52c-4fbb-975a-e0ec09162600	QT13400210	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:46.563	2024-04-27 15:19:46.563	123	123
f791e669-6e07-4b5c-b17a-cd949cc54523	QT10000011	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:46.702	2024-04-27 15:19:46.702	123	123
6627d9d6-cf50-432b-93fc-9b45e0ffa3e7	QT00200112	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:46.863	2024-04-27 15:19:46.863	123	123
4dfb76d9-ef51-454e-95a1-6adbc285497e	QT93001010	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:47.002	2024-04-27 15:19:47.002	123	123
f41f8b97-fc71-475e-b492-dad1b5491042	QT10100020	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:47.152	2024-04-27 15:19:47.152	123	123
82a441f0-04aa-483f-938d-913a3719f588	QT00060100	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:47.313	2024-04-27 15:19:47.313	123	123
6b5873e3-923b-4cef-8f1a-e21ffcacb353	QT03220010	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:47.465	2024-04-27 15:19:47.465	123	123
da200013-becd-4966-a727-c6889547a733	QT24111030	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:47.622	2024-04-27 15:19:47.622	123	123
4c2ee03f-d463-4f41-a9f4-4401c516e560	QT10120001	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:47.825	2024-04-27 15:19:47.825	123	123
137fb510-bbe3-41e6-8a3a-fe7a2fdcfd06	QT01000150	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	477	2024-04-27 15:19:46.273	2024-04-27 16:49:38.005	123	123
8f6df0d6-bf4a-47f8-a110-263c2490f360	QT60412301	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:47.929	2024-04-27 15:19:47.929	123	123
3312cd1f-db8d-4bcf-a1cc-ad8556a55568	QT04000001	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:48.102	2024-04-27 15:19:48.102	123	123
a85f16e0-a6a1-4cb4-b712-16b2a292c569	QT15011120	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:48.542	2024-04-27 15:19:48.542	123	123
59e8661b-b56f-497f-ba4d-97fc53439494	QT01001601	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:48.692	2024-04-27 15:19:48.692	123	123
7d8642bb-d02e-481c-98af-33ff81a2cf83	QT00400452	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:48.847	2024-04-27 15:19:48.847	123	123
110e1e70-f3a2-42ba-8d1d-4ddd03885566	QT31005300	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:49.013	2024-04-27 15:19:49.013	123	123
304c56fa-a0cb-4b8a-8844-c76b423d57ea	QT30210011	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:49.182	2024-04-27 15:19:49.182	123	123
c48a4700-159f-4135-aab4-3aa5eba29425	QT20012010	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:49.322	2024-04-27 15:19:49.322	123	123
2a6d9849-56c2-4cb2-9b3a-fa84d7d1ed76	QT01301301	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:49.492	2024-04-27 15:19:49.492	123	123
c23364ba-c80a-42a4-a37c-4b2272374de2	QT10100250	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:49.642	2024-04-27 15:19:49.642	123	123
85c800e1-2dab-41de-b7fd-4777f04e9eaa	QT12029113	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:49.856	2024-04-27 15:19:49.856	123	123
39a20a2c-a4c5-4943-8e56-eeea05430f1b	QT11643010	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:49.965	2024-04-27 15:19:49.965	123	123
4e5309aa-1718-4a55-a71d-6ec3c5bc29e6	QT10001000	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:50.132	2024-04-27 15:19:50.132	123	123
2d66c8a0-319a-441e-acf7-34159f391b11	QT10303100	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	1524.14	2024-04-27 15:19:50.462	2024-04-27 15:19:50.462	123	123
14638bb4-1630-4237-8d95-1b33107999ea	QT40000107	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	17458525	0714527	GRÃO	25	Caixa	25.4	141	155	2024-04-27 15:19:50.303	2024-04-27 16:49:38.005	123	123
\.


--
-- Data for Name: legal_clients; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.legal_clients (id, branch, legal_person_id, created_by, updated_by) FROM stdin;
37bedfee-082f-4d06-8798-62842276a59f	Tesd	ecf45722-63cb-4322-9e53-f0fed1e370fb	123	123
\.


--
-- Data for Name: legal_orders; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.legal_orders (id, "order", created_at, updated_at, created_by, updated_by, legal_contract_id, order_processing_id, completed_orders_id, quote_table_id, carrier_id) FROM stdin;
30ed1d70-b584-4ad4-9ab0-eab4ecd1c62c	OLC01313110	2024-04-29 21:02:45.751	2024-04-29 21:02:45.751	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
cf7a660b-76a2-471f-921a-d78ba9ed283e	OLC11300212	2024-04-29 21:02:46.452	2024-04-29 21:02:46.452	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
8b57dab0-ee2a-4482-a4d6-451eaa16a8a9	OLC50111205	2024-04-29 21:02:46.974	2024-04-29 21:02:46.974	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
ffd4ac5b-a5ea-409a-b200-45a0b72e63f2	OLC52002650	2024-04-29 21:02:47.364	2024-04-29 21:02:47.364	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
76ed8d68-c22f-41e8-9801-dbd1b89d8d0f	OLC20105010	2024-04-29 21:02:47.619	2024-04-29 21:02:47.619	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
21b6cf11-7b18-40d3-b6a2-043edf54096e	OLC10013000	2024-04-29 21:02:47.851	2024-04-29 21:02:47.851	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
97eb95e9-8706-49b7-b80d-33c9ad5a6f94	OLC21306344	2024-04-29 21:02:48.066	2024-04-29 21:02:48.066	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
bf495782-640b-4987-90ef-f025a13709c3	OLC23010362	2024-04-29 21:02:48.262	2024-04-29 21:02:48.262	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
59a344f4-26ac-4cbb-8261-1a61c265eaed	OLC11106211	2024-04-29 21:02:48.412	2024-04-29 21:02:48.412	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
d1d2ba6b-ffd6-42f4-a61b-174e1de5c509	OLC12501001	2024-04-29 21:02:48.595	2024-04-29 21:02:48.595	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
7399160e-4e49-4f41-8d57-98b40099e144	OLC31100652	2024-04-29 21:02:48.78	2024-04-29 21:02:48.78	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
b3d246d2-cf18-4479-a753-c42c95f973d9	OLC10100110	2024-04-29 21:02:48.948	2024-04-29 21:02:48.948	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
5cb73d77-8ae8-4f5e-b972-5c8f297b59a2	OLC12220100	2024-04-29 21:02:49.125	2024-04-29 21:02:49.125	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
5a96785a-f212-4816-8884-bf7d7b645850	OLC00500003	2024-04-29 21:02:49.286	2024-04-29 21:02:49.286	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
42cc8db6-a1ea-4125-9351-5763f8b6478e	OLC15010400	2024-04-29 21:02:49.464	2024-04-29 21:02:49.464	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
4487a139-023d-4dbf-acde-083ac62dd31d	OLC21143423	2024-04-29 21:02:49.644	2024-04-29 21:02:49.644	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
817b65bc-6298-4a12-9501-bc34e7439938	OLC12082100	2024-04-29 21:02:49.804	2024-04-29 21:02:49.804	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
87d4957b-d5ba-4220-8aef-7af521b0d763	OLC00521183	2024-04-29 21:02:50.151	2024-04-29 21:02:50.151	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
c343243a-6fae-4259-93ba-dc69bf62cdbd	OLC01400352	2024-04-29 21:02:50.324	2024-04-29 21:02:50.324	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
fafd5343-cc8d-40c1-8031-dc8bedc8df0e	OLC11002000	2024-04-29 21:02:50.493	2024-04-29 21:02:50.493	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
aec58633-eba7-4aed-b829-6473d189db65	OLC12220004	2024-04-29 21:02:50.669	2024-04-29 21:02:50.669	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
2a5ef9e3-d7f5-4ff5-beaf-6c67011866ec	OLC00000201	2024-04-29 21:02:50.831	2024-04-29 21:02:50.831	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
bb5564ed-768c-4cd5-ab42-b788a58f33d1	OLC03120010	2024-04-29 21:02:50.99	2024-04-29 21:02:50.99	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
7fb0d687-ff81-410b-a80c-f51ed9b8f699	OLC40003021	2024-04-29 21:02:51.166	2024-04-29 21:02:51.166	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
5cc440fc-fa76-40d7-938b-eeb6835943ee	OLC23415304	2024-04-29 21:02:51.337	2024-04-29 21:02:51.337	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
b7ecb699-14a4-499f-b1e0-85b8d1917c49	OLC20011502	2024-04-29 21:02:51.47	2024-04-29 21:02:51.47	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
1e571494-d073-4049-ac89-3863eaed98e8	OLC22002100	2024-04-29 21:02:51.798	2024-04-29 21:02:51.797	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
583d8ff6-052a-4d45-907d-4c437d4679e1	OLC00105001	2024-04-29 21:02:51.969	2024-04-29 21:02:51.969	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
ab353878-f914-41a6-8cfb-67ffc2b5dd20	OLC22008211	2024-04-29 21:02:52.277	2024-04-29 21:02:52.277	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
89e5759e-d443-465e-9c17-01a8196c92cc	OLC12320020	2024-04-29 21:02:52.459	2024-04-29 21:02:52.459	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
1b6c53f3-4ae9-459b-8e0e-e76a0a7cb8f7	OLC01500711	2024-04-29 21:02:52.62	2024-04-29 21:02:52.62	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
2e05e747-4165-4892-a768-077b1a98b0b1	OLC02006111	2024-04-29 21:02:52.77	2024-04-29 21:02:52.77	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
c48b3f7f-7b05-46a5-a13a-f0f337a0c269	OLC03200800	2024-04-29 21:02:52.932	2024-04-29 21:02:52.932	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
4116390f-f122-4cb3-917f-8fa6230f91f5	OLC02430023	2024-04-29 21:02:53.099	2024-04-29 21:02:53.099	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
17a096d5-5378-49e3-aaa6-b90dbc9bf2fa	OLC41200010	2024-04-29 21:02:53.269	2024-04-29 21:02:53.269	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
fee2948b-af1e-496f-a7a2-268d0182dad7	OLC10102022	2024-04-29 21:02:53.596	2024-04-29 21:02:53.596	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
3a65e00c-87fa-441d-9e5b-b76d2dd5d725	OLC20305302	2024-04-29 21:02:53.768	2024-04-29 21:02:53.768	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
b49513aa-4adc-48a3-8a8e-962f17f2ed5a	OLC14114011	2024-04-29 21:02:53.947	2024-04-29 21:02:53.947	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
17a7674e-a67c-4bfc-b5a3-defee336f790	OLC16401101	2024-04-29 21:02:54.259	2024-04-29 21:02:54.259	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
976d6b21-d91a-410c-91f4-2b4f77f8e0ae	OLC12010111	2024-04-29 21:02:54.422	2024-04-29 21:02:54.422	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
789ef1b9-f466-45ac-a3c9-3032691e9fc8	OLC73400000	2024-04-29 21:02:54.584	2024-04-29 21:02:54.584	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
9b4438a7-3331-40bc-a009-8bf30257d9fe	OLC00024111	2024-04-29 21:02:54.751	2024-04-29 21:02:54.751	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
0df52267-6594-463e-b70e-8aab17b66719	OLC21152003	2024-04-29 21:02:54.904	2024-04-29 21:02:54.904	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
d0ec612a-72bc-44bc-8cc0-b58c7112e905	OLC30655260	2024-04-29 21:02:55.085	2024-04-29 21:02:55.085	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
8bd0de97-d893-44f3-8e8f-e2b8d92b2bd9	OLC51030030	2024-04-29 21:02:55.246	2024-04-29 21:02:55.246	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
1ef0be39-a36a-4a4b-9974-8967949d1776	OLC13500003	2024-04-29 21:02:55.392	2024-04-29 21:02:55.392	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
fb63037e-1dcd-4a8f-b44c-c211dc818629	OLC10332001	2024-04-29 21:02:55.567	2024-04-29 21:02:55.567	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
e844580a-9513-4b10-9a04-8beae761fc77	OLC20001141	2024-04-29 21:02:55.732	2024-04-29 21:02:55.732	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
d558a4d1-3308-4912-8400-38c1c002f532	OLC10200063	2024-04-29 21:02:55.896	2024-04-29 21:02:55.896	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
b39a9b2e-6f27-44fe-83bc-676a2b6f6abe	OLC73001103	2024-04-29 21:18:12.491	2024-04-29 21:18:12.491	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
0a13fba5-2876-40fe-8ad2-8f1519e765dc	OLC02012111	2024-04-29 21:02:53.432	2024-04-29 21:32:18.247	123	123	d9655225-b9ec-44c6-983d-d798f4d66aaf	\N	\N	110e1e70-f3a2-42ba-8d1d-4ddd03885566	470a163e-653a-4ede-81f5-793523d012c1
\.


--
-- Data for Name: legal_people; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.legal_people (id, fantasy_name, cnpj, state_registration, corporate_name, public_place, address_number, neighborhood, complement, city, uf, first_phone, second_phone, third_phone, email, created_at, updated_at) FROM stdin;
ecf45722-63cb-4322-9e53-f0fed1e370fb	Sdsadas	14521412541245	14512541474	sdasdasd	asdsadas	1254	fsdf	ASDASDSAD	sdas	UF	12345645124	14521451251	\N	SADASD@asdsad	2024-04-29 21:01:10.518	2024-04-29 21:01:10.518
1fe38c07-ef31-49c1-8ebd-f14cacf0383d	TLS	12345678910254	1452314781	TLS LTDA	RUA 2	451	LAPA	\N	São Paulo	RJ	12047845124	\N	\N	Mainteadsd@test	2024-04-07 19:16:13.352	2024-05-01 01:07:20.533
ab36a21a-f786-4745-bd00-47e302ac36e3	sdasdasd	14521210147854	1474125214	asadsf	nullsdasdas	98749	asdasdas	\N	dasdsa	SP	145214785414	\N	\N	sdsad@fsfas	2024-05-01 01:10:05.89	2024-05-01 01:10:05.89
9ab7c52f-c148-4db2-acf6-0c1c7542df75	sdasdas1d	14521211147854	1471125214	as1adsf	nullsdasdas	98749	asdasdas	\N	dasdsa	SP	147214785414	\N	\N	sdsad@fsfas	2024-05-01 01:10:34.517	2024-05-01 01:10:34.517
6dcc0516-ebcd-4348-be65-30247dfb5804	sd2sdas1d	14521221147854	1471225214	a21adsf	nullsdasdas	98749	asdasdas	\N	dasdsa	SP	147214785414	\N	\N	sdsad@fsfas	2024-05-01 01:10:53.166	2024-05-01 01:10:53.166
\.


--
-- Data for Name: maintenance; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.maintenance (id, created_at, created_by, updated_at, updated_by, maintenance_company_id, finished_at, type_of_maintenance_id, vehicle_id) FROM stdin;
76bc24b2-049f-475c-b8d2-aea31214360c	2024-04-06 18:55:45.314	123	2024-04-06 18:55:45.314	123	4c8a6e47-0e0d-451f-950d-d8ea42a029e6	\N	a2c78f83-b59b-4e52-bbf0-cbc8b048bed0	54db2725-2297-497f-a0a0-848c57e14315
\.


--
-- Data for Name: maintenance_companies; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.maintenance_companies (id, specialty_maintenance, created_at, created_by, updated_at, updated_by, legal_person_id) FROM stdin;
4c8a6e47-0e0d-451f-950d-d8ea42a029e6	Test	2024-04-06 13:59:17.305	123	2024-04-06 13:59:17.305	123	1fe38c07-ef31-49c1-8ebd-f14cacf0383d
4c16ec7c-1165-4f99-a894-1bca035d34c4	sdasad	2024-05-01 01:10:05.892	123	2024-05-01 01:10:05.892	123	ab36a21a-f786-4745-bd00-47e302ac36e3
26fb2dc4-05db-45fc-bdec-6ff417a1b81b	sdasad	2024-05-01 01:10:34.519	123	2024-05-01 01:10:34.519	123	9ab7c52f-c148-4db2-acf6-0c1c7542df75
\.


--
-- Data for Name: natural_people; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.natural_people (id, name, date_birth, gender, cpf, rg, cep, public_place, address_number, neighborhood, complement, city, uf, first_phone, second_phone, third_phone, email, nationality) FROM stdin;
e39d4ab2-58e0-4b3c-8df1-41420bb0c233	John Kennedy	1970-01-20 19:41:44.726	MASC	14785436521	147152365	1478523	Asuia	205	Albany	\N	teresinha	US	145247541254	\N	\N	john@test	RUSSIAN
a612681f-15af-4dc5-bbc2-a45b9d30f379	John Kennedy	1970-01-20 19:41:44.726	MASC	14785236521	147852365	1478523	Asuia	205	Albany	123	teresinha	US	145247541254	\N	\N	john@test	RUSSIAN
46fac594-30d5-4d96-9e6a-aace32ed529b	JÃO	1970-01-20 19:57:57.071	MASC	14141414141	1414141414	07142090	SRW TEST	144	TEST WSS	\N	GUA	SP	14247845741	\N	\N	SDASd@sfs	BRASIL
3b11a7c4-1c0c-4d29-b350-df48d08712c2	JÃO	1970-01-20 19:57:57.071	MASC	15151515151	1515151515	07142090	SRW TEST	487	TEST WSS	\N	GUA	SP	14247845741	\N	\N	SDASd@sfs	BRASIL
ea7cbad6-bfe3-4d10-b7b1-7457b954a91f	TIO PAULO	1970-01-20 20:02:05.749	MASC	14521452361	1026587412	0741025	ddgsdg	2145	Sdadsa		GRU	SP	1478541254	\N	\N	Fsfs@ets	Brasileiro
\.


--
-- Data for Name: order_procesing; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.order_procesing (id, order_processing_number, vehicle_id, total_distance, total_spend_liters, total_spending_money, start_at, end_at, updated_at, created_at, created_by, updated_by, status) FROM stdin;
1fc6f459-5fdf-4db8-a859-ed65a340da6d	OP15012041	54db2725-2297-497f-a0a0-848c57e14315	25	5	20	1970-01-20 20:05:11.979	\N	2024-04-23 23:19:38.249	2024-04-23 23:19:38.249	123	123	CREATED
\.


--
-- Data for Name: outsourcedT_transport_company_driver; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."outsourcedT_transport_company_driver" (id, cnh, cnh_expiration, course_mopp, created_at, updated_at, created_by, updated_by, natural_person_id, outsourced_transport_company_id, cnh_category) FROM stdin;
\.


--
-- Data for Name: outsourced_drivers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.outsourced_drivers (id, cnh, cnh_expiration, course_mopp, created_at, updated_at, created_by, outsourced_vehicle_id, updated_by, natural_person_id, cnh_category, company_vehicle_id) FROM stdin;
a64a956b-0a49-46e1-9e55-6dcee8647aa2	14147851254	1970-01-20 20:02:05.749	t	2024-04-21 19:00:24.692	2024-04-21 19:00:24.692	123	\N	123	ea7cbad6-bfe3-4d10-b7b1-7457b954a91f	B	6dbc6ae0-c120-4dc0-bc88-ec57eb35b90f
\.


--
-- Data for Name: outsourced_transport_vehicle; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.outsourced_transport_vehicle (id, outsourced_company_id, vehicle_id, created_at, updated_at, created_by, updated_by) FROM stdin;
\.


--
-- Data for Name: outsourced_vehicles; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.outsourced_vehicles (id, created_at, updated_at, created_by, vehicle_id, order_processing_id, updated_by, "orderProcessingLegalClientId") FROM stdin;
\.


--
-- Data for Name: own_drivers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.own_drivers (id, cnh, cnh_expiration, company_vehicle, course_mopp, created_at, updated_at, created_by, updated_by, natural_person_id, cnh_category) FROM stdin;
91e23780-a5a9-4a67-a85e-d7117f649e6b	14512478541	1970-01-20 19:41:44.726	t	t	2024-04-07 16:35:40.439	2024-04-07 16:35:40.439	123	123	e39d4ab2-58e0-4b3c-8df1-41420bb0c233	A
7553ec92-f532-4e2c-9259-76cb1e4e1565	14524478141	1970-01-20 19:41:44.726	t	t	2024-04-07 18:47:18.335	2024-04-07 18:47:18.335	123	123	a612681f-15af-4dc5-bbc2-a45b9d30f379	B
\.


--
-- Data for Name: physical_customer_cte; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.physical_customer_cte (id, order_id, access_key, type_cte, observations, cte_number) FROM stdin;
\.


--
-- Data for Name: physical_customer_quote; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.physical_customer_quote (id, cod_quote, recipient_id, "senderId", who_pays, postal_cod_origin, postal_cod_destiny, type_merchandise, amount, description, mass, volume, nf_value, created_at, updated_at, created_by, updated_by) FROM stdin;
1aa86854-2304-40c5-83fc-ef047f23a6c3	QT06004031	5e12366b-6bed-487a-bf7d-09dfeabe7799	b3034daa-e9a3-4864-bf99-c10a7514eca0	CIF	0741414	1415474	TEST	45	Arroz	4115	4500	10000	2024-04-18 22:00:21.773	2024-04-18 22:00:21.773	123	123
\.


--
-- Data for Name: physical_customers; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.physical_customers (id, branch, created_by, updated_by, natural_person_id, created_at, updated_at) FROM stdin;
682f2c0d-90ac-431a-b6b9-0d2f38be6411	\N	123	123	a612681f-15af-4dc5-bbc2-a45b9d30f379	2024-04-18 22:13:00.586	2024-04-18 22:13:00.586
\.


--
-- Data for Name: physical_orders; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.physical_orders (id, "order", updated_by, created_at, updated_at, created_by, physical_customer_id, "completedOrdersId", order_processing_id, quote_table_id, carrier_id) FROM stdin;
49dc129e-c222-488d-9e11-6961ef36d528	OR04001035	123	2024-04-18 22:13:32.569	2024-04-18 22:13:32.569	123	682f2c0d-90ac-431a-b6b9-0d2f38be6411	\N	1fc6f459-5fdf-4db8-a859-ed65a340da6d	1aa86854-2304-40c5-83fc-ef047f23a6c3	470a163e-653a-4ede-81f5-793523d012c1
\.


--
-- Data for Name: recipient; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.recipient (id, legal_person_id, natural_person_id, created_at, updated_at, created_by, updated_by) FROM stdin;
5e12366b-6bed-487a-bf7d-09dfeabe7799	\N	3b11a7c4-1c0c-4d29-b350-df48d08712c2	2024-04-18 21:54:08.486	2024-04-18 21:54:08.486	123	123
\.


--
-- Data for Name: sender; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.sender (id, legal_person_id, natural_person_id, created_at, updated_at, created_by, updated_by) FROM stdin;
b3034daa-e9a3-4864-bf99-c10a7514eca0	\N	46fac594-30d5-4d96-9e6a-aace32ed529b	2024-04-18 21:52:24.129	2024-04-18 21:52:24.129	123	123
\.


--
-- Data for Name: types_of_maintenances; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.types_of_maintenances (id, description, created_at, created_by, updated_at, updated_by, "typeMaintenance") FROM stdin;
a2c78f83-b59b-4e52-bbf0-cbc8b048bed0	Troca de Oléo	2024-04-06 15:36:10.324	123	2024-04-06 15:36:10.323	123	MANUTENÇÃO PREDITIVA
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, name, username, email, password, created_at, updated_at, role, avatar_url) FROM stdin;
123	test	test	test@test	$2b$10$MlfwVUV79ZON9/EcD08PKef4RofumOuOsKEmz7niXqefMZx0A0u7m	2024-04-06 13:57:19.391	2024-04-06 13:57:19.391	ADMIN	\N
\.


--
-- Data for Name: vehicle_bodyworks; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.vehicle_bodyworks (id, name, axles, mass, volume, created_at, updated_at, created_by, updated_by) FROM stdin;
\.


--
-- Data for Name: vehicle_brands; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.vehicle_brands (id, name, created_at, updated_at, created_by, updated_by) FROM stdin;
59ae26e5-f966-49b4-aea4-7708325de9fd	FORD	2024-04-06 18:34:50.402	2024-04-06 18:34:50.402	123	123
\.


--
-- Data for Name: vehicle_models; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.vehicle_models (id, name, weight, capacity_max, axles, created_at, updated_at, created_by, brand_id, type_id, capacity_per_axle, updated_by) FROM stdin;
f9d23e17-ae1f-48cc-b687-6d8be4e275d6	FORD K	45.4	500.5	4	2024-04-06 18:49:20.548	2024-04-06 18:49:20.548	123	59ae26e5-f966-49b4-aea4-7708325de9fd	bbe91666-6a4b-4349-9fd9-695c69b96e05	4	123
\.


--
-- Data for Name: vehicle_types; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.vehicle_types (id, name, bodywork, created_at, updated_at, created_by, updated_by) FROM stdin;
bbe91666-6a4b-4349-9fd9-695c69b96e05	SD	f	2024-04-06 18:44:47.942	2024-04-06 18:44:47.942	123	123
\.


--
-- Data for Name: vehicles; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.vehicles (id, plate, year, color, renavam, model_id, antt, is_ipva_paid, registration) FROM stdin;
54db2725-2297-497f-a0a0-848c57e14315	cgs1414	2024	VERDE	str145212	f9d23e17-ae1f-48cc-b687-6d8be4e275d6	TSD1245	t	1970-01-20 19:40:29.557
\.


--
-- Name: Incident Incident_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Incident"
    ADD CONSTRAINT "Incident_pkey" PRIMARY KEY (id);


--
-- Name: OutsourcedTransportCompanyContract OutsourcedTransportCompanyContract_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."OutsourcedTransportCompanyContract"
    ADD CONSTRAINT "OutsourcedTransportCompanyContract_pkey" PRIMARY KEY (id);


--
-- Name: OutsourcedTransportCompany OutsourcedTransportCompany_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."OutsourcedTransportCompany"
    ADD CONSTRAINT "OutsourcedTransportCompany_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: carrier_companies carrier_companies_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.carrier_companies
    ADD CONSTRAINT carrier_companies_pkey PRIMARY KEY (id);


--
-- Name: ciots_for_legal_clients ciots_for_legal_clients_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ciots_for_legal_clients
    ADD CONSTRAINT ciots_for_legal_clients_pkey PRIMARY KEY (id);


--
-- Name: company_vehicles company_vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company_vehicles
    ADD CONSTRAINT company_vehicles_pkey PRIMARY KEY (id);


--
-- Name: completed_orders completed_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.completed_orders
    ADD CONSTRAINT completed_orders_pkey PRIMARY KEY (id);


--
-- Name: contract_outsourced_drivers contract_outsourced_drivers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.contract_outsourced_drivers
    ADD CONSTRAINT contract_outsourced_drivers_pkey PRIMARY KEY (id);


--
-- Name: freight_expenses freight_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.freight_expenses
    ADD CONSTRAINT freight_expenses_pkey PRIMARY KEY (id);


--
-- Name: icms icms_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.icms
    ADD CONSTRAINT icms_pkey PRIMARY KEY (id);


--
-- Name: legal_Contracts legal_Contracts_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."legal_Contracts"
    ADD CONSTRAINT "legal_Contracts_pkey" PRIMARY KEY (id);


--
-- Name: legal_client_cte legal_client_cte_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_client_cte
    ADD CONSTRAINT legal_client_cte_pkey PRIMARY KEY (id);


--
-- Name: legal_client_quote legal_client_quote_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_client_quote
    ADD CONSTRAINT legal_client_quote_pkey PRIMARY KEY (id);


--
-- Name: legal_clients legal_clients_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_clients
    ADD CONSTRAINT legal_clients_pkey PRIMARY KEY (id);


--
-- Name: legal_orders legal_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_orders
    ADD CONSTRAINT legal_orders_pkey PRIMARY KEY (id);


--
-- Name: legal_people legal_people_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_people
    ADD CONSTRAINT legal_people_pkey PRIMARY KEY (id);


--
-- Name: maintenance_companies maintenance_companies_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.maintenance_companies
    ADD CONSTRAINT maintenance_companies_pkey PRIMARY KEY (id);


--
-- Name: maintenance maintenance_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_pkey PRIMARY KEY (id);


--
-- Name: natural_people natural_people_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.natural_people
    ADD CONSTRAINT natural_people_pkey PRIMARY KEY (id);


--
-- Name: order_procesing order_procesing_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.order_procesing
    ADD CONSTRAINT order_procesing_pkey PRIMARY KEY (id);


--
-- Name: outsourcedT_transport_company_driver outsourcedT_transport_company_driver_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."outsourcedT_transport_company_driver"
    ADD CONSTRAINT "outsourcedT_transport_company_driver_pkey" PRIMARY KEY (id);


--
-- Name: outsourced_drivers outsourced_drivers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_drivers
    ADD CONSTRAINT outsourced_drivers_pkey PRIMARY KEY (id);


--
-- Name: outsourced_transport_vehicle outsourced_transport_vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_transport_vehicle
    ADD CONSTRAINT outsourced_transport_vehicle_pkey PRIMARY KEY (id);


--
-- Name: outsourced_vehicles outsourced_vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_vehicles
    ADD CONSTRAINT outsourced_vehicles_pkey PRIMARY KEY (id);


--
-- Name: own_drivers own_drivers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.own_drivers
    ADD CONSTRAINT own_drivers_pkey PRIMARY KEY (id);


--
-- Name: physical_customer_cte physical_customer_cte_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_customer_cte
    ADD CONSTRAINT physical_customer_cte_pkey PRIMARY KEY (id);


--
-- Name: physical_customer_quote physical_customer_quote_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_customer_quote
    ADD CONSTRAINT physical_customer_quote_pkey PRIMARY KEY (id);


--
-- Name: physical_customers physical_customers_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_customers
    ADD CONSTRAINT physical_customers_pkey PRIMARY KEY (id);


--
-- Name: physical_orders physical_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_orders
    ADD CONSTRAINT physical_orders_pkey PRIMARY KEY (id);


--
-- Name: recipient recipient_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.recipient
    ADD CONSTRAINT recipient_pkey PRIMARY KEY (id);


--
-- Name: sender sender_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sender
    ADD CONSTRAINT sender_pkey PRIMARY KEY (id);


--
-- Name: types_of_maintenances types_of_maintenances_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.types_of_maintenances
    ADD CONSTRAINT types_of_maintenances_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vehicle_bodyworks vehicle_bodyworks_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_bodyworks
    ADD CONSTRAINT vehicle_bodyworks_pkey PRIMARY KEY (id);


--
-- Name: vehicle_brands vehicle_brands_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_brands
    ADD CONSTRAINT vehicle_brands_pkey PRIMARY KEY (id);


--
-- Name: vehicle_models vehicle_models_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_models
    ADD CONSTRAINT vehicle_models_pkey PRIMARY KEY (id);


--
-- Name: vehicle_types vehicle_types_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_types
    ADD CONSTRAINT vehicle_types_pkey PRIMARY KEY (id);


--
-- Name: vehicles vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (id);


--
-- Name: OutsourcedTransportCompanyContract_contract_number_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "OutsourcedTransportCompanyContract_contract_number_key" ON public."OutsourcedTransportCompanyContract" USING btree (contract_number);


--
-- Name: OutsourcedTransportCompanyContract_legal_client_order_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "OutsourcedTransportCompanyContract_legal_client_order_id_key" ON public."OutsourcedTransportCompanyContract" USING btree (legal_client_order_id);


--
-- Name: OutsourcedTransportCompany_legal_person_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "OutsourcedTransportCompany_legal_person_id_key" ON public."OutsourcedTransportCompany" USING btree (legal_person_id);


--
-- Name: _VehicleBodyworkToVehicleType_AB_unique; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "_VehicleBodyworkToVehicleType_AB_unique" ON public."_VehicleBodyworkToVehicleType" USING btree ("A", "B");


--
-- Name: _VehicleBodyworkToVehicleType_B_index; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "_VehicleBodyworkToVehicleType_B_index" ON public."_VehicleBodyworkToVehicleType" USING btree ("B");


--
-- Name: carrier_companies_legal_person_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX carrier_companies_legal_person_id_key ON public.carrier_companies USING btree (legal_person_id);


--
-- Name: carrier_companies_rntrc_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX carrier_companies_rntrc_key ON public.carrier_companies USING btree (rntrc);


--
-- Name: ciots_for_legal_clients_ciot_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX ciots_for_legal_clients_ciot_key ON public.ciots_for_legal_clients USING btree (ciot);


--
-- Name: company_vehicles_vehicle_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX company_vehicles_vehicle_id_key ON public.company_vehicles USING btree (vehicle_id);


--
-- Name: completed_orders_vehicle_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX completed_orders_vehicle_id_key ON public.completed_orders USING btree (vehicle_id);


--
-- Name: contract_outsourced_drivers_contract_number_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX contract_outsourced_drivers_contract_number_key ON public.contract_outsourced_drivers USING btree (contract_number);


--
-- Name: icms_state_orgin_recipient_state_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX icms_state_orgin_recipient_state_key ON public.icms USING btree (state_orgin, recipient_state);


--
-- Name: legal_Contracts_contract_number_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "legal_Contracts_contract_number_key" ON public."legal_Contracts" USING btree (contract_number);


--
-- Name: legal_client_cte_order_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX legal_client_cte_order_id_key ON public.legal_client_cte USING btree (order_id);


--
-- Name: legal_clients_legal_person_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX legal_clients_legal_person_id_key ON public.legal_clients USING btree (legal_person_id);


--
-- Name: legal_orders_order_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX legal_orders_order_key ON public.legal_orders USING btree ("order");


--
-- Name: legal_people_cnpj_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX legal_people_cnpj_key ON public.legal_people USING btree (cnpj);


--
-- Name: legal_people_state_registration_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX legal_people_state_registration_key ON public.legal_people USING btree (state_registration);


--
-- Name: maintenance_companies_legal_person_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX maintenance_companies_legal_person_id_key ON public.maintenance_companies USING btree (legal_person_id);


--
-- Name: natural_people_cpf_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX natural_people_cpf_key ON public.natural_people USING btree (cpf);


--
-- Name: natural_people_rg_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX natural_people_rg_key ON public.natural_people USING btree (rg);


--
-- Name: order_procesing_order_processing_number_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX order_procesing_order_processing_number_key ON public.order_procesing USING btree (order_processing_number);


--
-- Name: order_procesing_vehicle_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX order_procesing_vehicle_id_key ON public.order_procesing USING btree (vehicle_id);


--
-- Name: outsourcedT_transport_company_driver_cnh_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "outsourcedT_transport_company_driver_cnh_key" ON public."outsourcedT_transport_company_driver" USING btree (cnh);


--
-- Name: outsourcedT_transport_company_driver_natural_person_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "outsourcedT_transport_company_driver_natural_person_id_key" ON public."outsourcedT_transport_company_driver" USING btree (natural_person_id);


--
-- Name: outsourced_drivers_cnh_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX outsourced_drivers_cnh_key ON public.outsourced_drivers USING btree (cnh);


--
-- Name: outsourced_drivers_company_vehicle_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX outsourced_drivers_company_vehicle_id_key ON public.outsourced_drivers USING btree (company_vehicle_id);


--
-- Name: outsourced_drivers_natural_person_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX outsourced_drivers_natural_person_id_key ON public.outsourced_drivers USING btree (natural_person_id);


--
-- Name: outsourced_drivers_outsourced_vehicle_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX outsourced_drivers_outsourced_vehicle_id_key ON public.outsourced_drivers USING btree (outsourced_vehicle_id);


--
-- Name: outsourced_transport_vehicle_vehicle_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX outsourced_transport_vehicle_vehicle_id_key ON public.outsourced_transport_vehicle USING btree (vehicle_id);


--
-- Name: outsourced_vehicles_vehicle_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX outsourced_vehicles_vehicle_id_key ON public.outsourced_vehicles USING btree (vehicle_id);


--
-- Name: own_drivers_cnh_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX own_drivers_cnh_key ON public.own_drivers USING btree (cnh);


--
-- Name: physical_customer_cte_order_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX physical_customer_cte_order_id_key ON public.physical_customer_cte USING btree (order_id);


--
-- Name: physical_customer_quote_postal_cod_destiny_postal_cod_origi_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX physical_customer_quote_postal_cod_destiny_postal_cod_origi_key ON public.physical_customer_quote USING btree (postal_cod_destiny, postal_cod_origin);


--
-- Name: physical_customers_natural_person_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX physical_customers_natural_person_id_key ON public.physical_customers USING btree (natural_person_id);


--
-- Name: physical_orders_order_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX physical_orders_order_key ON public.physical_orders USING btree ("order");


--
-- Name: recipient_legal_person_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX recipient_legal_person_id_key ON public.recipient USING btree (legal_person_id);


--
-- Name: recipient_natural_person_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX recipient_natural_person_id_key ON public.recipient USING btree (natural_person_id);


--
-- Name: sender_legal_person_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX sender_legal_person_id_key ON public.sender USING btree (legal_person_id);


--
-- Name: sender_natural_person_id_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX sender_natural_person_id_key ON public.sender USING btree (natural_person_id);


--
-- Name: types_of_maintenances_description_typeMaintenance_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "types_of_maintenances_description_typeMaintenance_key" ON public.types_of_maintenances USING btree (description, "typeMaintenance");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: vehicle_brands_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX vehicle_brands_name_key ON public.vehicle_brands USING btree (name);


--
-- Name: vehicle_types_name_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX vehicle_types_name_key ON public.vehicle_types USING btree (name);


--
-- Name: vehicles_plate_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX vehicles_plate_key ON public.vehicles USING btree (plate);


--
-- Name: Incident Incident_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Incident"
    ADD CONSTRAINT "Incident_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Incident Incident_order_process_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Incident"
    ADD CONSTRAINT "Incident_order_process_id_fkey" FOREIGN KEY (order_process_id) REFERENCES public.order_procesing(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Incident Incident_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Incident"
    ADD CONSTRAINT "Incident_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OutsourcedTransportCompanyContract OutsourcedTransportCompanyContract_carrier_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."OutsourcedTransportCompanyContract"
    ADD CONSTRAINT "OutsourcedTransportCompanyContract_carrier_company_id_fkey" FOREIGN KEY (carrier_company_id) REFERENCES public.carrier_companies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OutsourcedTransportCompanyContract OutsourcedTransportCompanyContract_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."OutsourcedTransportCompanyContract"
    ADD CONSTRAINT "OutsourcedTransportCompanyContract_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OutsourcedTransportCompanyContract OutsourcedTransportCompanyContract_legal_client_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."OutsourcedTransportCompanyContract"
    ADD CONSTRAINT "OutsourcedTransportCompanyContract_legal_client_order_id_fkey" FOREIGN KEY (legal_client_order_id) REFERENCES public.legal_orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OutsourcedTransportCompanyContract OutsourcedTransportCompanyContract_outsourced_transport_co_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."OutsourcedTransportCompanyContract"
    ADD CONSTRAINT "OutsourcedTransportCompanyContract_outsourced_transport_co_fkey" FOREIGN KEY (outsourced_transport_company_id) REFERENCES public."OutsourcedTransportCompany"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OutsourcedTransportCompanyContract OutsourcedTransportCompanyContract_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."OutsourcedTransportCompanyContract"
    ADD CONSTRAINT "OutsourcedTransportCompanyContract_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OutsourcedTransportCompany OutsourcedTransportCompany_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."OutsourcedTransportCompany"
    ADD CONSTRAINT "OutsourcedTransportCompany_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OutsourcedTransportCompany OutsourcedTransportCompany_legal_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."OutsourcedTransportCompany"
    ADD CONSTRAINT "OutsourcedTransportCompany_legal_person_id_fkey" FOREIGN KEY (legal_person_id) REFERENCES public.legal_people(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OutsourcedTransportCompany OutsourcedTransportCompany_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."OutsourcedTransportCompany"
    ADD CONSTRAINT "OutsourcedTransportCompany_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _VehicleBodyworkToVehicleType _VehicleBodyworkToVehicleType_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_VehicleBodyworkToVehicleType"
    ADD CONSTRAINT "_VehicleBodyworkToVehicleType_A_fkey" FOREIGN KEY ("A") REFERENCES public.vehicle_bodyworks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _VehicleBodyworkToVehicleType _VehicleBodyworkToVehicleType_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."_VehicleBodyworkToVehicleType"
    ADD CONSTRAINT "_VehicleBodyworkToVehicleType_B_fkey" FOREIGN KEY ("B") REFERENCES public.vehicle_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: carrier_companies carrier_companies_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.carrier_companies
    ADD CONSTRAINT carrier_companies_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: carrier_companies carrier_companies_legal_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.carrier_companies
    ADD CONSTRAINT carrier_companies_legal_person_id_fkey FOREIGN KEY (legal_person_id) REFERENCES public.legal_people(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: carrier_companies carrier_companies_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.carrier_companies
    ADD CONSTRAINT carrier_companies_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ciots_for_legal_clients ciots_for_legal_clients_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ciots_for_legal_clients
    ADD CONSTRAINT ciots_for_legal_clients_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ciots_for_legal_clients ciots_for_legal_clients_legal_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ciots_for_legal_clients
    ADD CONSTRAINT ciots_for_legal_clients_legal_contract_id_fkey FOREIGN KEY (legal_contract_id) REFERENCES public."legal_Contracts"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ciots_for_legal_clients ciots_for_legal_clients_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ciots_for_legal_clients
    ADD CONSTRAINT ciots_for_legal_clients_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: company_vehicles company_vehicles_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company_vehicles
    ADD CONSTRAINT company_vehicles_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.carrier_companies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: company_vehicles company_vehicles_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company_vehicles
    ADD CONSTRAINT company_vehicles_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: company_vehicles company_vehicles_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company_vehicles
    ADD CONSTRAINT company_vehicles_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: company_vehicles company_vehicles_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company_vehicles
    ADD CONSTRAINT company_vehicles_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: completed_orders completed_orders_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.completed_orders
    ADD CONSTRAINT completed_orders_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: contract_outsourced_drivers contract_outsourced_drivers_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.contract_outsourced_drivers
    ADD CONSTRAINT contract_outsourced_drivers_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: contract_outsourced_drivers contract_outsourced_drivers_outsourced_driver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.contract_outsourced_drivers
    ADD CONSTRAINT contract_outsourced_drivers_outsourced_driver_id_fkey FOREIGN KEY (outsourced_driver_id) REFERENCES public.outsourced_drivers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: contract_outsourced_drivers contract_outsourced_drivers_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.contract_outsourced_drivers
    ADD CONSTRAINT contract_outsourced_drivers_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: freight_expenses freight_expenses_physical_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.freight_expenses
    ADD CONSTRAINT freight_expenses_physical_customer_id_fkey FOREIGN KEY (physical_customer_id) REFERENCES public.physical_orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: icms icms_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.icms
    ADD CONSTRAINT icms_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: icms icms_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.icms
    ADD CONSTRAINT icms_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_Contracts legal_Contracts_carrier_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."legal_Contracts"
    ADD CONSTRAINT "legal_Contracts_carrier_company_id_fkey" FOREIGN KEY (carrier_company_id) REFERENCES public.carrier_companies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_Contracts legal_Contracts_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."legal_Contracts"
    ADD CONSTRAINT "legal_Contracts_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_Contracts legal_Contracts_legal_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."legal_Contracts"
    ADD CONSTRAINT "legal_Contracts_legal_client_id_fkey" FOREIGN KEY (legal_client_id) REFERENCES public.legal_clients(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_Contracts legal_Contracts_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."legal_Contracts"
    ADD CONSTRAINT "legal_Contracts_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_client_cte legal_client_cte_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_client_cte
    ADD CONSTRAINT legal_client_cte_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.legal_orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: freight_expenses legal_client_order_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.freight_expenses
    ADD CONSTRAINT legal_client_order_fk FOREIGN KEY (legal_client_order_id) REFERENCES public.legal_orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: legal_client_quote legal_client_quote_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_client_quote
    ADD CONSTRAINT legal_client_quote_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_client_quote legal_client_quote_recipient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_client_quote
    ADD CONSTRAINT legal_client_quote_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES public.recipient(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_client_quote legal_client_quote_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_client_quote
    ADD CONSTRAINT legal_client_quote_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.sender(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_client_quote legal_client_quote_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_client_quote
    ADD CONSTRAINT legal_client_quote_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_clients legal_clients_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_clients
    ADD CONSTRAINT legal_clients_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_clients legal_clients_legal_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_clients
    ADD CONSTRAINT legal_clients_legal_person_id_fkey FOREIGN KEY (legal_person_id) REFERENCES public.legal_people(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_clients legal_clients_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_clients
    ADD CONSTRAINT legal_clients_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_orders legal_orders_carrier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_orders
    ADD CONSTRAINT legal_orders_carrier_id_fkey FOREIGN KEY (carrier_id) REFERENCES public.carrier_companies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_orders legal_orders_completed_orders_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_orders
    ADD CONSTRAINT legal_orders_completed_orders_id_fkey FOREIGN KEY (completed_orders_id) REFERENCES public.completed_orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: legal_orders legal_orders_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_orders
    ADD CONSTRAINT legal_orders_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_orders legal_orders_legal_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_orders
    ADD CONSTRAINT legal_orders_legal_contract_id_fkey FOREIGN KEY (legal_contract_id) REFERENCES public."legal_Contracts"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_orders legal_orders_order_processing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_orders
    ADD CONSTRAINT legal_orders_order_processing_id_fkey FOREIGN KEY (order_processing_id) REFERENCES public.order_procesing(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: legal_orders legal_orders_quote_table_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_orders
    ADD CONSTRAINT legal_orders_quote_table_id_fkey FOREIGN KEY (quote_table_id) REFERENCES public.legal_client_quote(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: legal_orders legal_orders_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.legal_orders
    ADD CONSTRAINT legal_orders_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: maintenance_companies maintenance_companies_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.maintenance_companies
    ADD CONSTRAINT maintenance_companies_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: maintenance_companies maintenance_companies_legal_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.maintenance_companies
    ADD CONSTRAINT maintenance_companies_legal_person_id_fkey FOREIGN KEY (legal_person_id) REFERENCES public.legal_people(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: maintenance_companies maintenance_companies_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.maintenance_companies
    ADD CONSTRAINT maintenance_companies_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: maintenance maintenance_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: maintenance maintenance_maintenance_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_maintenance_company_id_fkey FOREIGN KEY (maintenance_company_id) REFERENCES public.maintenance_companies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: maintenance maintenance_type_of_maintenance_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_type_of_maintenance_id_fkey FOREIGN KEY (type_of_maintenance_id) REFERENCES public.types_of_maintenances(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: maintenance maintenance_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: maintenance maintenance_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.maintenance
    ADD CONSTRAINT maintenance_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: order_procesing order_procesing_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.order_procesing
    ADD CONSTRAINT order_procesing_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourcedT_transport_company_driver outsourcedT_transport_company_driver_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."outsourcedT_transport_company_driver"
    ADD CONSTRAINT "outsourcedT_transport_company_driver_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourcedT_transport_company_driver outsourcedT_transport_company_driver_natural_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."outsourcedT_transport_company_driver"
    ADD CONSTRAINT "outsourcedT_transport_company_driver_natural_person_id_fkey" FOREIGN KEY (natural_person_id) REFERENCES public.natural_people(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourcedT_transport_company_driver outsourcedT_transport_company_driver_outsourced_transport__fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."outsourcedT_transport_company_driver"
    ADD CONSTRAINT "outsourcedT_transport_company_driver_outsourced_transport__fkey" FOREIGN KEY (outsourced_transport_company_id) REFERENCES public."OutsourcedTransportCompany"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourcedT_transport_company_driver outsourcedT_transport_company_driver_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."outsourcedT_transport_company_driver"
    ADD CONSTRAINT "outsourcedT_transport_company_driver_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourced_drivers outsourced_drivers_company_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_drivers
    ADD CONSTRAINT outsourced_drivers_company_vehicle_id_fkey FOREIGN KEY (company_vehicle_id) REFERENCES public.company_vehicles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: outsourced_drivers outsourced_drivers_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_drivers
    ADD CONSTRAINT outsourced_drivers_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourced_drivers outsourced_drivers_natural_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_drivers
    ADD CONSTRAINT outsourced_drivers_natural_person_id_fkey FOREIGN KEY (natural_person_id) REFERENCES public.natural_people(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourced_drivers outsourced_drivers_outsourced_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_drivers
    ADD CONSTRAINT outsourced_drivers_outsourced_vehicle_id_fkey FOREIGN KEY (outsourced_vehicle_id) REFERENCES public.outsourced_vehicles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: outsourced_drivers outsourced_drivers_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_drivers
    ADD CONSTRAINT outsourced_drivers_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourced_transport_vehicle outsourced_transport_vehicle_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_transport_vehicle
    ADD CONSTRAINT outsourced_transport_vehicle_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourced_transport_vehicle outsourced_transport_vehicle_outsourced_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_transport_vehicle
    ADD CONSTRAINT outsourced_transport_vehicle_outsourced_company_id_fkey FOREIGN KEY (outsourced_company_id) REFERENCES public."OutsourcedTransportCompany"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourced_transport_vehicle outsourced_transport_vehicle_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_transport_vehicle
    ADD CONSTRAINT outsourced_transport_vehicle_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourced_transport_vehicle outsourced_transport_vehicle_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_transport_vehicle
    ADD CONSTRAINT outsourced_transport_vehicle_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourced_vehicles outsourced_vehicles_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_vehicles
    ADD CONSTRAINT outsourced_vehicles_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourced_vehicles outsourced_vehicles_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_vehicles
    ADD CONSTRAINT outsourced_vehicles_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: outsourced_vehicles outsourced_vehicles_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.outsourced_vehicles
    ADD CONSTRAINT outsourced_vehicles_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: own_drivers own_drivers_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.own_drivers
    ADD CONSTRAINT own_drivers_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: own_drivers own_drivers_natural_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.own_drivers
    ADD CONSTRAINT own_drivers_natural_person_id_fkey FOREIGN KEY (natural_person_id) REFERENCES public.natural_people(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: own_drivers own_drivers_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.own_drivers
    ADD CONSTRAINT own_drivers_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_customer_cte physical_customer_cte_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_customer_cte
    ADD CONSTRAINT physical_customer_cte_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.physical_orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_customer_quote physical_customer_quote_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_customer_quote
    ADD CONSTRAINT physical_customer_quote_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_customer_quote physical_customer_quote_recipient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_customer_quote
    ADD CONSTRAINT physical_customer_quote_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES public.recipient(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_customer_quote physical_customer_quote_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_customer_quote
    ADD CONSTRAINT "physical_customer_quote_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public.sender(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_customer_quote physical_customer_quote_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_customer_quote
    ADD CONSTRAINT physical_customer_quote_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_customers physical_customers_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_customers
    ADD CONSTRAINT physical_customers_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_customers physical_customers_natural_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_customers
    ADD CONSTRAINT physical_customers_natural_person_id_fkey FOREIGN KEY (natural_person_id) REFERENCES public.natural_people(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_customers physical_customers_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_customers
    ADD CONSTRAINT physical_customers_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_orders physical_orders_carrier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_orders
    ADD CONSTRAINT physical_orders_carrier_id_fkey FOREIGN KEY (carrier_id) REFERENCES public.carrier_companies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_orders physical_orders_completedOrdersId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_orders
    ADD CONSTRAINT "physical_orders_completedOrdersId_fkey" FOREIGN KEY ("completedOrdersId") REFERENCES public.completed_orders(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: physical_orders physical_orders_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_orders
    ADD CONSTRAINT physical_orders_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_orders physical_orders_order_processing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_orders
    ADD CONSTRAINT physical_orders_order_processing_id_fkey FOREIGN KEY (order_processing_id) REFERENCES public.order_procesing(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: physical_orders physical_orders_physical_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_orders
    ADD CONSTRAINT physical_orders_physical_customer_id_fkey FOREIGN KEY (physical_customer_id) REFERENCES public.physical_customers(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_orders physical_orders_quote_table_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_orders
    ADD CONSTRAINT physical_orders_quote_table_id_fkey FOREIGN KEY (quote_table_id) REFERENCES public.physical_customer_quote(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: physical_orders physical_orders_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.physical_orders
    ADD CONSTRAINT physical_orders_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recipient recipient_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.recipient
    ADD CONSTRAINT recipient_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recipient recipient_legal_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.recipient
    ADD CONSTRAINT recipient_legal_person_id_fkey FOREIGN KEY (legal_person_id) REFERENCES public.legal_people(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: recipient recipient_natural_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.recipient
    ADD CONSTRAINT recipient_natural_person_id_fkey FOREIGN KEY (natural_person_id) REFERENCES public.natural_people(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: recipient recipient_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.recipient
    ADD CONSTRAINT recipient_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: sender sender_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sender
    ADD CONSTRAINT sender_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: sender sender_legal_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sender
    ADD CONSTRAINT sender_legal_person_id_fkey FOREIGN KEY (legal_person_id) REFERENCES public.legal_people(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: sender sender_natural_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sender
    ADD CONSTRAINT sender_natural_person_id_fkey FOREIGN KEY (natural_person_id) REFERENCES public.natural_people(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: sender sender_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sender
    ADD CONSTRAINT sender_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: types_of_maintenances types_of_maintenances_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.types_of_maintenances
    ADD CONSTRAINT types_of_maintenances_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: types_of_maintenances types_of_maintenances_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.types_of_maintenances
    ADD CONSTRAINT types_of_maintenances_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vehicle_bodyworks vehicle_bodyworks_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_bodyworks
    ADD CONSTRAINT vehicle_bodyworks_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vehicle_bodyworks vehicle_bodyworks_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_bodyworks
    ADD CONSTRAINT vehicle_bodyworks_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vehicle_brands vehicle_brands_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_brands
    ADD CONSTRAINT vehicle_brands_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vehicle_brands vehicle_brands_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_brands
    ADD CONSTRAINT vehicle_brands_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vehicle_models vehicle_models_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_models
    ADD CONSTRAINT vehicle_models_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.vehicle_brands(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vehicle_models vehicle_models_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_models
    ADD CONSTRAINT vehicle_models_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vehicle_models vehicle_models_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_models
    ADD CONSTRAINT vehicle_models_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.vehicle_types(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vehicle_models vehicle_models_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_models
    ADD CONSTRAINT vehicle_models_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vehicle_types vehicle_types_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_types
    ADD CONSTRAINT vehicle_types_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vehicle_types vehicle_types_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicle_types
    ADD CONSTRAINT vehicle_types_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vehicles vehicles_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.vehicle_models(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: admin
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

