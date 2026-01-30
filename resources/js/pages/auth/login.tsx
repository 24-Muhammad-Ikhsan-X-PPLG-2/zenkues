import BgWarna from '@/components/Auth/Login/BgWarna';
import Header from '@/components/Auth/Login/Header';
import FormLogin from '@/components/Auth/Login/FormLogin';
import ContainerFormLogin from '@/components/Auth/Login/ContainerFormLogin';
import ContainerLogin from '@/components/Auth/Login/ContainerLogin';

export default function Login() {
    return (
        <ContainerLogin>
            <BgWarna />

            <ContainerFormLogin>
                <Header />

                <FormLogin />
            </ContainerFormLogin>
        </ContainerLogin>
    );
}
