import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import BgWarna from '@/components/Auth/Login/BgWarna';
import SocialButton from '@/components/Auth/Login/SocialButton';
import { Link } from '@inertiajs/react';
import ContainerLogin from '@/components/Auth/Login/ContainerLogin';
import Header from '@/components/Auth/Register/Header';
import FormRegister from '@/components/Auth/Register/FormRegister';
import ContainerFormLogin from '@/components/Auth/Login/ContainerFormLogin';

export default function Register() {
    return (
        <ContainerLogin>
            <BgWarna />

            <ContainerFormLogin>
                <Header />

                <FormRegister />
            </ContainerFormLogin>
        </ContainerLogin>
    );
}
