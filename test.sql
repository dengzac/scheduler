PGDMP                         v        	   scheduler     10.5 (Ubuntu 10.5-1.pgdg16.04+1)     10.5 (Ubuntu 10.5-1.pgdg16.04+1) L    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �           1262    16386 	   scheduler    DATABASE     s   CREATE DATABASE scheduler WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';
    DROP DATABASE scheduler;
             zachary    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12966    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    21085    blocks    TABLE     �   CREATE TABLE public.blocks (
    id integer NOT NULL,
    teacher_id integer,
    course_id character varying(255),
    room integer,
    "time" integer
);
    DROP TABLE public.blocks;
       public         dbuser    false    3            �            1259    21083    blocks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.blocks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.blocks_id_seq;
       public       dbuser    false    211    3            �           0    0    blocks_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.blocks_id_seq OWNED BY public.blocks.id;
            public       dbuser    false    210            �            1259    20918    courses    TABLE     Z  CREATE TABLE public.courses (
    id character varying(255) NOT NULL,
    department integer,
    coursename character varying(255),
    shortname character varying(255),
    _9 integer DEFAULT 0,
    _10 integer DEFAULT 0,
    _11 integer DEFAULT 0,
    _12 integer DEFAULT 0,
    CONSTRAINT courses_id_check CHECK (((id)::text <> ''::text))
);
    DROP TABLE public.courses;
       public         dbuser    false    3            �            1259    20900    departments    TABLE     ^   CREATE TABLE public.departments (
    id integer NOT NULL,
    name character varying(255)
);
    DROP TABLE public.departments;
       public         dbuser    false    3            �            1259    21000    permissions    TABLE     v   CREATE TABLE public.permissions (
    id integer NOT NULL,
    name character varying(255),
    department integer
);
    DROP TABLE public.permissions;
       public         dbuser    false    3            �            1259    20998    permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.permissions_id_seq;
       public       dbuser    false    3    208            �           0    0    permissions_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;
            public       dbuser    false    207            �            1259    21013    role_permissions    TABLE     Y   CREATE TABLE public.role_permissions (
    role_id integer,
    permission_id integer
);
 $   DROP TABLE public.role_permissions;
       public         dbuser    false    3            �            1259    20966    roles    TABLE     p   CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255),
    department integer
);
    DROP TABLE public.roles;
       public         dbuser    false    3            �            1259    20964    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public       dbuser    false    204    3            �           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
            public       dbuser    false    203            �            1259    20892    session    TABLE     �   CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
    DROP TABLE public.session;
       public         dbuser    false    3            �            1259    20907    teachers    TABLE     �   CREATE TABLE public.teachers (
    id integer NOT NULL,
    lastname character varying(255) NOT NULL,
    department integer
);
    DROP TABLE public.teachers;
       public         dbuser    false    3            �            1259    20905    teachers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.teachers_id_seq;
       public       dbuser    false    3    199            �           0    0    teachers_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;
            public       dbuser    false    198            �            1259    20982 	   user_role    TABLE     e   CREATE TABLE public.user_role (
    id integer NOT NULL,
    user_id integer,
    role_id integer
);
    DROP TABLE public.user_role;
       public         dbuser    false    3            �            1259    20980    user_role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_role_id_seq;
       public       dbuser    false    3    206            �           0    0    user_role_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.user_role_id_seq OWNED BY public.user_role.id;
            public       dbuser    false    205            �            1259    20956    users    TABLE     Y   CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255)
);
    DROP TABLE public.users;
       public         dbuser    false    3            �            1259    20954    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public       dbuser    false    202    3            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
            public       dbuser    false    201            �
           2604    21088 	   blocks id    DEFAULT     f   ALTER TABLE ONLY public.blocks ALTER COLUMN id SET DEFAULT nextval('public.blocks_id_seq'::regclass);
 8   ALTER TABLE public.blocks ALTER COLUMN id DROP DEFAULT;
       public       dbuser    false    210    211    211            �
           2604    21003    permissions id    DEFAULT     p   ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);
 =   ALTER TABLE public.permissions ALTER COLUMN id DROP DEFAULT;
       public       dbuser    false    207    208    208            �
           2604    20969    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public       dbuser    false    203    204    204            �
           2604    20910    teachers id    DEFAULT     j   ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);
 :   ALTER TABLE public.teachers ALTER COLUMN id DROP DEFAULT;
       public       dbuser    false    198    199    199            �
           2604    20985    user_role id    DEFAULT     l   ALTER TABLE ONLY public.user_role ALTER COLUMN id SET DEFAULT nextval('public.user_role_id_seq'::regclass);
 ;   ALTER TABLE public.user_role ALTER COLUMN id DROP DEFAULT;
       public       dbuser    false    206    205    206            �
           2604    20959    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public       dbuser    false    202    201    202                      0    21085    blocks 
   TABLE DATA               I   COPY public.blocks (id, teacher_id, course_id, room, "time") FROM stdin;
    public       dbuser    false    211   5R       t          0    20918    courses 
   TABLE DATA               [   COPY public.courses (id, department, coursename, shortname, _9, _10, _11, _12) FROM stdin;
    public       dbuser    false    200   R       q          0    20900    departments 
   TABLE DATA               /   COPY public.departments (id, name) FROM stdin;
    public       dbuser    false    197   �g       |          0    21000    permissions 
   TABLE DATA               ;   COPY public.permissions (id, name, department) FROM stdin;
    public       dbuser    false    208   Yh       }          0    21013    role_permissions 
   TABLE DATA               B   COPY public.role_permissions (role_id, permission_id) FROM stdin;
    public       dbuser    false    209   ii       x          0    20966    roles 
   TABLE DATA               5   COPY public.roles (id, name, department) FROM stdin;
    public       dbuser    false    204   �j       p          0    20892    session 
   TABLE DATA               4   COPY public.session (sid, sess, expire) FROM stdin;
    public       dbuser    false    196   �j       s          0    20907    teachers 
   TABLE DATA               <   COPY public.teachers (id, lastname, department) FROM stdin;
    public       dbuser    false    199   1n       z          0    20982 	   user_role 
   TABLE DATA               9   COPY public.user_role (id, user_id, role_id) FROM stdin;
    public       dbuser    false    206   (s       v          0    20956    users 
   TABLE DATA               *   COPY public.users (id, email) FROM stdin;
    public       dbuser    false    202   Os       �           0    0    blocks_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.blocks_id_seq', 4, true);
            public       dbuser    false    210            �           0    0    permissions_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.permissions_id_seq', 52, true);
            public       dbuser    false    207            �           0    0    roles_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.roles_id_seq', 10, true);
            public       dbuser    false    203            �           0    0    teachers_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.teachers_id_seq', 134, true);
            public       dbuser    false    198            �           0    0    user_role_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.user_role_id_seq', 2, true);
            public       dbuser    false    205            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
            public       dbuser    false    201            �
           2606    21090    blocks blocks_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.blocks DROP CONSTRAINT blocks_pkey;
       public         dbuser    false    211            �
           2606    20930    courses courses_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_pkey;
       public         dbuser    false    200            �
           2606    20904    departments departments_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.departments DROP CONSTRAINT departments_pkey;
       public         dbuser    false    197            �
           2606    21007 +   permissions permissions_name_department_key 
   CONSTRAINT     r   ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_department_key UNIQUE (name, department);
 U   ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_name_department_key;
       public         dbuser    false    208    208            �
           2606    21005    permissions permissions_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_pkey;
       public         dbuser    false    208            �
           2606    21017 ;   role_permissions role_permissions_role_id_permission_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_permission_id_key UNIQUE (role_id, permission_id);
 e   ALTER TABLE ONLY public.role_permissions DROP CONSTRAINT role_permissions_role_id_permission_id_key;
       public         dbuser    false    209    209            �
           2606    20973    roles roles_name_department_key 
   CONSTRAINT     f   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_department_key UNIQUE (name, department);
 I   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_name_department_key;
       public         dbuser    false    204    204            �
           2606    20971    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public         dbuser    false    204            �
           2606    20899    session session_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public         dbuser    false    196            �
           2606    20912    teachers teachers_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teachers_pkey;
       public         dbuser    false    199            �
           2606    20987    user_role user_role_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.user_role DROP CONSTRAINT user_role_pkey;
       public         dbuser    false    206            �
           2606    20963    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public         dbuser    false    202            �
           2606    20961    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         dbuser    false    202            �
           1259    20979    roles_null_idx    INDEX     b   CREATE UNIQUE INDEX roles_null_idx ON public.roles USING btree (name) WHERE (department IS NULL);
 "   DROP INDEX public.roles_null_idx;
       public         dbuser    false    204    204            �
           2606    21096    blocks blocks_course_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id);
 F   ALTER TABLE ONLY public.blocks DROP CONSTRAINT blocks_course_id_fkey;
       public       dbuser    false    211    2777    200            �
           2606    21091    blocks blocks_teacher_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teachers(id);
 G   ALTER TABLE ONLY public.blocks DROP CONSTRAINT blocks_teacher_id_fkey;
       public       dbuser    false    199    211    2775            �
           2606    20931    courses courses_department_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_department_fkey FOREIGN KEY (department) REFERENCES public.departments(id);
 I   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_department_fkey;
       public       dbuser    false    200    197    2773            �
           2606    21008 '   permissions permissions_department_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_department_fkey FOREIGN KEY (department) REFERENCES public.departments(id);
 Q   ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_department_fkey;
       public       dbuser    false    208    197    2773            �
           2606    21023 4   role_permissions role_permissions_permission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id);
 ^   ALTER TABLE ONLY public.role_permissions DROP CONSTRAINT role_permissions_permission_id_fkey;
       public       dbuser    false    2792    209    208            �
           2606    21018 .   role_permissions role_permissions_role_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);
 X   ALTER TABLE ONLY public.role_permissions DROP CONSTRAINT role_permissions_role_id_fkey;
       public       dbuser    false    2786    204    209            �
           2606    20974    roles roles_department_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_department_fkey FOREIGN KEY (department) REFERENCES public.departments(id);
 E   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_department_fkey;
       public       dbuser    false    2773    197    204            �
           2606    20913 !   teachers teachers_department_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_department_fkey FOREIGN KEY (department) REFERENCES public.departments(id);
 K   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teachers_department_fkey;
       public       dbuser    false    199    2773    197            �
           2606    20993     user_role user_role_role_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);
 J   ALTER TABLE ONLY public.user_role DROP CONSTRAINT user_role_role_id_fkey;
       public       dbuser    false    204    206    2786            �
           2606    20988     user_role user_role_user_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 J   ALTER TABLE ONLY public.user_role DROP CONSTRAINT user_role_user_id_fkey;
       public       dbuser    false    202    206    2781               :   x�3�42�tv�q665t�4�4�2�44��8�E�9MQEL8�9�B���=... x      t      x��\_s⸲�O᧽��w� ��o�� ��!�̩��$�	5	LA�[9��tK��	ٚ���iɒ%u���D�2c)���#�u4]D �Lבl�l�I:�úb6�Ҕ�ΰ�e�U|.K�����?j�M�h�^�<ő;�C�,��&�>��0�ǻ��(��Fbt����fiOv⎸��W�ۻh�}���7|O-256��.���#M���q�D<��hy��6Ow�O��H���Fu(m�v�ؤ�31�` �}փuTc��֬�8��갽��h/��
_I�Ԏd����M��r��E�"+E��M��H���y�<�dyB��CW�S��=�(/����q�R;p�\�h.OH풖뵚7��>M����͉��Nϰ���X)��~�^^����3��E��}�E������i,ug��xɋ�Aո��K��Y1��ě��_��]uo���Z��<�E���mxl4X�gs=�hMדY��f�h
{v]�-�a��î�Kc����#��o3R�� e~�ތҙ3�*ߝ���o�g���ԁ+����{�w�:<U-�j�Q~�d�l?5����53�d�O1̑��5a�ތ�'�`zr�1t�M�Χ	�V�{_]�s1�8��^~l��p�>c��%*��U��b6Ù�Àf�Y���w���	h�Ԃ2\��ZR���.0âF�w=�^��l
�	��~B�X�Y2�=K	�g���@Go��D�t����U_�⬘ϯ�5,�X�y�-�+t%�b�`݁<Ձ<%V���(�Dr>�V�TG�"��#E�+J���	���s�T�z���X�E�i �d�5v;�����������{�}CZ ��պ����0p�q�C1otM�����&����&5�߃MgX�pV�����[S�A�l=�E�'���t���΄e��9���sЇiowձR�Бn�JQ�"��*W�ˑ`��͘T��'>���>��I�g�#���4>v����'�	q�)��>���_A�N�?�ׇ�6O]RkLm��}4��%�~�����;E�;��^7U�3{}���#*�@�F����6�\O�t���X�����0��zм��[6;@���m��1�����r,�$���&�ƽ���+ߍ��"�Vw�
0�iqRn����'��'�=��w�8�L�\4ڳY>Σϙ(�l�x�Rak�
i(_h�'���((�U�o�o�
6��j�v~�-X�4y~�U ���mw��a���=D��������.�ei|�!�/KX�	�6a��lo,ۅ�K����ļg�`���O����n|�gC��nL�[5�r
PV̢5����b�yUdS೉X��!<���{vp@OLy����|0۽��nx������m�,�QY������������/>��0�V�I
���	�ȏ����y%V�? �A CCB2G�f	�8HI:%�!�fIZKe%FG�O��y����q�R�y4prKf&5V"܅� ��Ӹ���gł�G$�X�g�t���^��
�(�=<m��57/7���� ���Z
��8���O���D�m;L��0���z[�9=cx���MY4��Ӱ���?�7+�/�3��qǴ�#}Eʥ!9]Mp�x�S\e�0��_��~�\�^�:YsRn��v[�;[G�)P 3_�/ź ܿ� =.�r�^5���>@�/en0З��<��8/��y�1�'ht|�Y���G,ᴳ��T�?�ꓩ>/�I.o	�N���o|ߎ2C�j
�Y淈eԦk1�ަ����v⑾"O�ɩXD	⻀��,�~K����4�p����_�RHF*/"��dK��Z\��A��_;��Yuph���_˵^�A�kY�34z�R�E+%�*i	3����iBH�vS���h]��C�k��L�M|1X�޻%B%��@���
:QkT�e�� �Y���������@�i*K�SCR�>]�b� ����"sM����VW�����3��땗���e����;�"Ӱ �L��8�=V��78��1�K9-�������� ���v��AQn��.��!���0�V��Ww�2�����W?v/*��{��6!`�Vb ����u.�N��(�Ӕ"k��	�x�����7���Ga#�� �f�W&`Z>�M�/d̛[M�L	�7�e{�|�oї����;�`'
�`�0���֛5�>x&$��U�!�L��BΪ�#[��ry�'�]&��IH7�uc铘���AG3�� ���XKє����ڡL� |�^�UP+:�F+��A�)��x��k���s<P
P�'9|^F(B�Z�q (�Mx�	�^_����tTPz�f{_���_���:��� uS�ڔ�4���턬L���vx��&�;3Ӑ��8v:��J�� �ʀ�w�Z�@�ulj�� 6Ƨ�a���d)�����#P��FO?�%��X��R|l.��ד�:
j���X�{��(lڰM����&h�KӔ�k�x�1�c���_㕮:HH����0��p\��DzT��b���'�""3J�Y4�u!�;*)H��tK�AѨ�@�)�utD�Aw��G�(B&��*�l�Vx2(���%5��+j�~iK��m6pRׇ�v�9x�m2�3�⓿�o��W6 �}۔�(#QF,B�� �Y=���2��u�����R�sN9y�\�Q���� O0)y|���G��$��B�)���q;C�eQ���D`���5�&�H�;d�;d�'�O븀���������>��0VoϿ���U���)0�^��yh*B�rM)f�o�sqx�O�qW�H����{1
�:H�@�W͉�K,���;��Enc����G��߸�e����D?�O&���I�g��0V����	���,�o����1��~ǋ8��\�F�?3[@=�P��S5����������h�y��4(������.A�@Q��v�u*��kI!4�$���$��f����s�F�ɣqq�_kx��b6ո��#*z8i�;���3`3`̯a'M��)E�jj_7�L�fͧ��Q�r�^���gյ�pކKG`jP(�\(̤#� ���Nu��0��U����6��m����u�r��Z�J�T�C��ξ�E=�O�&Uq\��mZH]�{*B�4���G,r��|Q�߲|^��H�7q��.�b�tBݦ�<?6�����)q^;���*�Oi?QF!ޣ� j�{������;��y�,�*hr����4JĘ�)n�S�TFFf�*�^��>=a�[��}e�=!B�0�^�I�-��\��(��E�����T>�T��#W�H5�o����if᧙�O:ś�K: 7-�EM�� �\�&��/l���]��Qg|���њ ���i�,S0��+ ��U��V�^�0�v�3�ށm��y���?Q�<��<>��y2��3�	W�����Z�����e���A�X8�<_C���w&�|g3��IJU����&�U_Nfj=}k����i��b��-����9��3����5.��S�8&N�C@�� 95Ϊ��gn_y�D����*�y=��E��M"����#}�Xo*đ��gX�}�"ѡ*7�2�.cAe������SrH�N��j��d]�˖o�G�!yLGy��]gt��"RÃ@�BM�E9� C�:�x��K�f?Ĺ;��{0���sJ��Vћ�|{w�Wwpb�a�\��C�{��kW��zb}��#�B*<�Е5�e�C���� �������w��TI�^���f�ʻ̊�G���)�/�\� cA���ȚB��>���K794PA���F1�1/y��Gq�i��24G}�G8ĉ`U�J5�Mݶ�z���wō1�pb���'��PbnNZ5~ª5�iͪqQ㬺N���S@0i2gq=��:�T��~���亗!PƩk����Yo�*K�YX�e`�a�
6���5���Ӹ����^�+
:�W�Ï��'�ia)��C���p���ʶj�"���,��h� L ���|�~�h��������I�LcSe a  ����T��;Yc��B�s��}z�6G?jo)Ї[-1�D�=�Hև�]Fy]\����e�A�%�`(��ٽDxT�o���Hx楪���n���Ed���:�7:@���#-�L]�;��HGIq��|L8"��S���
lm.Fy	�m�9��������]!�+/w���T/Ϋ��c��h}��C�կ�>�g�B��!��2d�K���<���E�UeGւ3
򙤟i�8������|��B�Z�)�%AP�W���g�r���J�"��׀�r���7���Ȥ�j,�l�P>Bu��MI��݀ѫ�J���l��9MɹN�z$���L6�,n؅��'?3Ϥ3��j����T�Eb��ߡ�?�w���!g��$�tx���!4�߿`�p� i���� ���*}��ԟ1ᓶ�베o�ѧ�Q���&
Q0�?Ў��0�K��0s+|��w�ǥG�/��/��!oJ���8�����ܟ�q�6
�E��e�)�f/c ���[�5Q.�˥#T&8v�����T ��(ج��.�\�dA;Q��N��sM�53��A$�<�K�U6-��� ��cs��K�����)Qe��T����!fjE�:�������ף�WS�~�"��/W�gKb��FQH,�^�A�V�LE��B"((բ�:e]�|�<�Z/KX��L?�u9����5Z
��Z�F-�;u�1��&�����ԗ.S���i_5�)�e�w�Ob��s����]X����֌�ڊFV�}s��8��ܳ�\z�˩���3:D��Ԙ9*��̳�Lz�:�pf(�Cp&}������� �s��|�:�ڭ5.۱۱t��o�S&��G$^1��5r�d[���k�uqgkF��d$x��B�TQ�IO�s�@������*��ڏᕤƔ���M��1��Xsi����5%c�E��k��E�6{��k�5��*7w?+p��F�k�u>�� �Φ*��!U��\>"�^=�+�^���`������-��Em}Enkm��-�4A�L���iL�q���5��[R�vO2��E�﹏����`�)�"��$t0�L��u0��\Z�|ΤO^�X�!`�&�3�ѨQh"[�x�3�^��	�2/��V�Cۤm�7H��\�������th<���L8B�"J�J��(k�ŕ��.%��ـS7�K��btq�_M��X7�j�����y���U2�^��[�J͘8!�MW���á����ۥ�=\�5�
/:ʪ�;-�lAn����P���ୁ��\�L���gu@q���\�)�f��c�'k毞 8�S	Mk�<&|��	2y(��Q&�+�W�YNߙ�$�����'U�����n����1L      q   T   x�3�p�2�/�I�S�I�K�2�p��.PpM�2��M,��2�N�L�KN�2��O�L�Q 
ps���dgp��qqq �J�      |      x�]�Kj�@���0A����9�!{ ���$'�Ϙ���o�wS2|/��c���g]�	ʐ`�P01�"38
�a�y�_:ddIa�e)c��(dbqHb1H/>��V�9����:�T	ju����M	�	ZG!h3��F�	�Ô�`�tk�9?��%��T�@�XԊJ��4r������5P�[�6bT�S ��@
ρZW	Ժz����eۖ�u���#�������z���_����y/�      }     x�-�ɍ1��`-R�r����z"XEP`|b�G5�ɚY�jvͩ�5� l��n�l��~ � ���� !A��pǁ0�!aC"!"!�/�H��H��H�	1!��xId"��An/?��"�H�������g���������B��~�}�������q�d��)��b�
x*�[8Eu�됬��h�ѥ�CQ�*M�I��*�6�.Y�D~?I?	��hSѥ�CO�JSeR��E�M�K�Clq�9/�nrܢ�ME�v=�*M�I��*��c��rZ�      x   Z   x�e�K
� �񻋉��&Z� �BBZ��>��A)��)���˙��Jq+)��bf��9f���c&�i,��Lw-O<����0� �H>      p   ,  x��UMs�0=7��Q�lB�a�Ӻ8�|�4iKH�d�-�,)���^�`�4�u�����oWo�Okg�O��L���~�a|��/E��Wg�6�gl��l Kp�)$�p�Fj���TZq� QL�R�J2БI���C9P[=��D�`�@��򄅘��q���e���f�ضl�m�v�j�*��f+,xt�}�nT�N=e����0Ƥ��m^ ��MsA1�D���HRm]� �蓨�0A�r��6��,�l�4�L�׮:kѩ��ԮE�E��|F%��泸np�&�SϾB�{x�KcW�ǖ�Ѐe�?�%_�M���}Jp{Y�Y=߿6��G��pb�8%l�}�`��������o�cZ���@}:z�I*�s�Fլ�G 	�1�0�XkH����c&P��G�#�3�����t&3�=|z^u���~�7��6�����y���JN��M�!��-B$��r�}M�}�y��?���d�|���.>�EWB��W��XB��KO_4Y��]�����b����0�-x����J��
aJdNL7��I�[��o�Zn!��H���Qk�\�Jp�Q��-`J[�pz�Ѻзa�������Z����j�ſQ< �U^����iO��7���V}��W���:;$��"}^�J��8��\��
&���6ڵ��4�/�̅�����%^e�i]����^�d�Yv��=1�SJ�_4dú>g��xZ��_��5���u/���P�wn�[���"������h����И9���L�پk��c�m��TL�cڝ��Ѹvtt�meu�      s   �  x�MU]��8}>�
���ǨQQ'`�k^r�^�H�
�����>�kf��g'����x$�ִ%y��mL}�R���a,��o7!ml�Z�8��1����9#�C7-Є��vU8��jޘ��'���w���W�[�P����G�wJI�߀^�mo�'!mͷo�~Go=����J�p�0}D+m���l���L�蜥?a���:�cr~~ �VmW6mٌ�K��J[5%�?D�*�ߟ��h��F3�K�4U�6��35���yw�Q��8����
�?FÅ�v�7S����h��0G���̭i���\�@�����]_�^�.��[́w�A��.��Z4~[m̳F6�D4&CB����ōpV���:�˭�kwF���Qa������wӗ���tL���CU�gTٚcM=ZU�{i�S~1]ǬOGk��5������E���ʱHB�+�S��k��dm��\�4 �T,6��d"h2���⢐
Y��H���|�h�_��1J,
%%�)�q+�X�Y.stS,�:�$N�Ơ�k�łL�x-�mD"��h�d*����\n�/?�Ryf
�@طB�i�pJ[�
ő�x�%��˭L4Z�H��B:
��5L�i�(%�ґ~�b��(i�vd8>��*.���i���>9q��pL���42a�C��7�ŖÄ>!��L��R�,9�'�9ũ�����Qr���-q�Ny!�y��K/�� �4�R���!�r�ȼ@9�tJ7�a4��T�I�?Äj$2�#��H����n��#hV�fK�ЎL���ʎ[Y�Q���3p�c�9����*\���I&�i�mSW���Ą��B�����W�,��$�c��g#�l��,�0���Ե�S0��i�����!{o$�#Ń���Nu��dL�	����@f�o���yH_!o#:�A3��I����c���3<Z`��V}�#�5��0��7�u��'�b�+o<�쮯�� ���C��0/�~!�u��h����t��)��7��^�ywQ<���\5�g��O�y/c2��3���-�v��n7��<�߽��vd�ۮ�x���vtH�������` t�?�BD����šį��ֽ��Sd;�*8��ˑ�"%� �U�7�u�O�gg<��7Ni��������Bki+�7�����d�R����n;ۻ���Md�����o��ܝ���d��(��s�eq����RP�����`�V�o      z      x�3�4�4�2�4�1z\\\ 	      v   /   x�3�JLI�Kw(�+N+-N�KM)�2���OK�M��v@��qqq �8     