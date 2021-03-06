import React, { useEffect, useState } from 'react'
import { ArrowLeft } from '../assets/svg';
import ImagePeople from '../assets/image/bunchofpeople.png'
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from '../firebase';
import { validateEmail } from 'function';
import Animated from 'component/animation'

function RegisterPage() {
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [response, setResponse] = useState({ success: true });
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Daftar | BoPiT"
        if (loading) return;
    }, [user, loading, navigate]);

    const handleRegister = () => {
        if (!name || !username || !email || !password) {
            setResponse(
                {
                    success: false,
                    message: "Harap isi semua kolom!",
                }
            )
        } else if (!validateEmail(email)) {
            setResponse(
                {
                    success: false,
                    message: "Alamat Pos-el tidak valid!",
                }
            )
        } else if (password !== confirmPassword) {
            setResponse(
                {
                    success: false,
                    message: "Verifikasi kata sandi tidak sama!",
                }
            )
        } else {
            registerWithEmailAndPassword(name, username, email, password)
                .then((res) => {
                    setResponse(res)
                }).catch(err => {
                    console.log(err);
                })
            navigate('/login');
        }
    }

    return (
        <div className='w-full h-screen grid grid-cols-2'>

            <div onClick={() => navigate(-1)} className='absolute top-8 left-10'>
                <Animated.FromDirection from="right" custom={1} delay={1}>
                    <ArrowLeft />
                </Animated.FromDirection>
            </div>
            <div className="place-self-center">
                <div>
                    <Animated.FromDirection from="left" custom={1} delay={1}>

                        <div className='mt-10 text-3xl font-bold' >
                            Daftar akun baru
                        </div>
                        {!response.success && (
                            <div className="bg-red-100 border mt-4 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Gagal </strong>
                                <span className="block sm:inline">{response.message}</span>
                            </div>
                        )}
                        <div className="mt-5">
                            <p className="text-3xs font-semibold ml-2 ">Nama lengkap</p>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Masukkan nama lengkap"
                                className='mt-2 py-5 px-3 w-full h-5 bg-white rounded-xl border border-lightgrey justify-between items-center focus:outline-none focus:border-lightgrey focus:border-md placeholder:italic'
                            />
                        </div>
                        <div className="mt-5">
                            <p className="text-3xs font-semibold ml-2 ">Nama pengguna</p>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Masukkan nama pengguna"
                                className='mt-2 py-5 px-3 w-full h-5 bg-white rounded-xl border border-lightgrey justify-between items-center focus:outline-none focus:border-lightgrey focus:border-md placeholder:italic'
                            />
                        </div>
                        <div className="mt-5">
                            <p className="text-3xs font-semibold ml-2 ">Alamat pos-el</p>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Masukkan alamat pos-el"
                                className='mt-2 py-5 px-3 w-full h-5 bg-white rounded-xl border border-lightgrey justify-between items-center focus:outline-none focus:border-lightgrey focus:border-md placeholder:italic'
                            />
                        </div>
                        <div className="flex flex-column">
                            <div className="mt-5 w-1/2">
                                <p className="text-3xs font-semibold ml-2 ">Kata Sandi</p>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan kata sandi"
                                    type='password'
                                    className=' mt-2 py-5 px-3 w-full h-5 bg-white rounded-xl border border-lightgrey justify-between items-center focus:outline-none focus:border-lightgrey border-md placeholder:italic'
                                />
                            </div>
                            <div className="w-5"></div>
                            <div className="mt-5 w-1/2">
                                <p className="text-3xs font-semibold ml-2 ">Verifikasi kata Sandi</p>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Verifikasikan kata sandi"
                                    type='password'
                                    className='  mt-2 py-5 px-3 w-full h-5 bg-white rounded-xl border border-lightgrey justify-between items-center focus:outline-none focus:border-lightgrey border-md placeholder:italic'
                                />
                            </div>
                        </div>
                        <div className="mt-6 " >
                            <div onClick={handleRegister} className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-2xl w-xl cursor-pointer">
                                <p className="font-normal text-white dark:text-white-400 text-center" >Daftar</p>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-center">
                            <p className="text-2xs ml-2 inline">Sudah memiliki akun?</p>
                            <Link to='/login' className="text-2xs font-extrabold ml-2 text-blue-500 cursor-pointer inline">Masuk</Link>
                        </div>
                    </Animated.FromDirection>

                </div>
            </div>
            <div>
                <Animated.FromDirection from="bottom" custom={1} delay={0.2}>
                    <div className="mt-10 text-6xl grid leading-tight">
                        Ayo!,<br />bergabung <br />dengan kami.
                    </div>
                </Animated.FromDirection>
                <div className='fixed w-2/5 bottom-0 right-16'>
                    <Animated.FromDirection from="right" custom={1} delay={0.2}>
                        <img src={ImagePeople} className="w-full" alt='' />
                    </Animated.FromDirection>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage