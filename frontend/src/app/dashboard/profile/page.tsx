"use client";

import { oswald } from "@/fonts";
import { useAuthContext } from "@/hooks/useAuthContext";
import profileImage from '/public/profile.svg';
import Image from 'next/image';
import profileBg from '/public/profileBg.svg';
import warningIcon from '/public/alert.svg';
import AnimatedButton from "@/components/AnimatedButton";
import { useState } from "react";
import EditProfile from "@/components/EditProfile";
import { resendVerificationEmail } from "@/lib/profile";
import { Flip, ToastContainer, toast } from "react-toastify";
const Profile = () => {
    const { user, papers, logOut } = useAuthContext();
    const [editProfile, setEditProfile] = useState(false);

    const resendEmailHandler = async () => {
        if (!user)
            return;
        try {
            resendVerificationEmail({
                email: user?.email,
            });
            toast.success("Mail sent successfully", {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            })
        }
        catch (err) {
            toast.error("Something went wrong, Please try again", {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            })
        }
    }


    return (
        <div className="w-full h-screen lg:flex justify-center items-center flex-col gap-5">
            {
                !user?.isVerified && (

                    <div className="w-full lg:w-[900px] h-64 lg:h-10 bg-[#aaaaaa] rounded-lg text-black text-center p-10 pt-32 xl:p-10 relative z-10 shadow-2xl flex flex-col justify-center items-center">
                        <span className="font-semibold text-xl">
                            A verification link has been sent to your account
                        </span>
                        <span className="font-medium">
                            Still can&apos;t find the email? <button className="underline text-blue-600" onClick={resendEmailHandler}> Click here </button>
                        </span>
                    </div>
                )

            }
            <div className="mt-4 lg:mt-0 w-full h-full lg:w-[900px] lg:h-[500px] bg-[#d2d2d2] lg:bg-backgroundprimary rounded-lg text-black p-10 pt-32 xl:p-10 relative overflow-hidden z-10 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full -z-10 hidden lg:block" >
                    <Image src={profileBg} alt="profile-bg" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="p-4 rounded-full bg-black scale-75 lg:scale-100">
                        <Image src={profileImage} alt="profile-image" height={20} width={20} />
                    </div>
                    <div className="text-lg lg:text-2xl">
                        <span className="font-medium">
                            Name: &nbsp;
                        </span>
                        <span className={`${oswald.className} font-bold text-nitconfprimary`}>
                            {user?.firstName} {user?.lastName || 'N/A'}
                        </span>
                    </div>
                    <div className={`${oswald.className} text-lg lg:text-2xl ms-auto hidden lg:block`}>
                        <AnimatedButton onClick={() => setEditProfile(true)}>
                            <span className="font-medium text-center">
                                Edit profile &nbsp;
                            </span>
                        </AnimatedButton>
                    </div>
                </div>
                <span className="block w-full p-[0.05rem] my-4 rounded-sm bg-black" />
                <div className="flex flex-col gap-4 mt-4">
                    <div className="text-lg lg:text-2xl flex items-center gap-1">
                        <span className="font-medium">
                            Email: &nbsp;
                        </span>
                        <span className={`${oswald.className} font-bold text-nitconfprimary`}>
                            {user?.email || 'N/A'}
                        </span>
                        {
                            !user?.isVerified && (
                                <span className="text-red-500 ml-2 flex gap-2 items-center">
                                    <Image className="inline" src={warningIcon} alt="warning-icon" height={25} width={25} />
                                </span>
                            )
                        }
                    </div>

                    <div className="text-lg lg:text-2xl  flex items-center gap-1">
                        <span className="font-medium">
                            Phone number: &nbsp;
                        </span>
                        <span className={`${oswald.className} font-bold text-nitconfprimary`}>
                            {user?.phoneNumber || 'N/A'}
                        </span>
                    </div>

                    <div className="text-lg lg:text-2xl  flex items-center gap-1">
                        <span className="font-medium">
                            Number of papers submitted: &nbsp;
                        </span>
                        <span className={`${oswald.className} font-bold text-nitconfprimary`}>
                            {papers.length || 'N/A'}
                        </span>
                    </div>

                    <div className="text-lg lg:text-2xl  flex items-center gap-1">
                        <span className="font-medium">
                            Role: &nbsp;
                        </span>
                        <span className={`${oswald.className} font-bold text-nitconfprimary`}>
                            {user?.role || 'N/A'}
                        </span>
                    </div>
                </div>
                <div className={`${oswald.className} text-lg lg:text-2xl mt-16 lg:m-0 flex lg:block gap-2 lg:absolute bottom-8 left-8`}>
                    <AnimatedButton onClick={logOut}>
                        <span className="font-medium text-center text-lg lg:text-2xl">
                            Logout &nbsp;
                        </span>
                    </AnimatedButton>
                    <div className={`${oswald.className} text-lg lg:text-2xl ms-auto lg:hidden`}>
                        <AnimatedButton onClick={() => setEditProfile(true)}>
                            <span className="font-medium text-center">
                                Edit profile &nbsp;
                            </span>
                        </AnimatedButton>
                    </div>
                </div>

            </div>
            {
                editProfile && user && (
                    <EditProfile setClose={() => setEditProfile(false)} initialData={user} />
                )
            }
            <ToastContainer />
        </div>
    )
}

export default Profile;