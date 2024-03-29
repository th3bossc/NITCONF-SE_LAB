import { Paper } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import deleteIcon from '/public/trash.svg';
import { useState } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { deletePaper } from '@/lib/papers';
import { ToastContainer, toast, Flip } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import Dialog from '../Dialog';
import { useRouter } from 'next/navigation';
const NavItem = ({ paper, current, onClick }: {
    paper: Paper,
    current: string,
    onClick: () => void
}) => {
    const { jwt, setPapers } = useAuthContext();
    const [hover, setHover] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [toDelete, setToDelete] = useState<string | null>(null);
    const router = useRouter();

    const deleteHandler = async (id: string | null) => {
        if (!id)
            return;
        try {
            await deletePaper(id, jwt);
            setPapers(prev => prev.filter(paper => paper.id !== id));
            router.push("/dashboard/profile")
            toast.success('Deleted paper successfully.', {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            });
        }
        catch (error) {
            toast.error('Something went wrong!', {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip
            });
        }
    }


    return (
        <motion.span
            className="w-full text-center relative font-regular cursor-pointer"
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                color: current === paper.id ? "var(--primary)" : "#fff"
            }}
            onClick={onClick}

        >
            {paper.title}

            {
                current === paper.id && (
                    <motion.span layoutId="current-item" className="absolute top-0 h-full left-0 w-[0.5rem] rounded-r-lg bg-nitconfprimary" />
                )
            }
            <AnimatePresence>
                {
                    hover && (
                        <motion.div
                            className="absolute top-0 h-full right-2"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            onClick={() => {
                                setToDelete(paper.id || null)
                                setDialog(true)
                            }}
                        >
                            <Image src={deleteIcon} alt="delete-icon" height={25} width={25} />
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <ToastContainer />
            <AnimatePresence>
                {
                    dialog && (
                        <motion.div
                            className="fixed top-0 left-0 bg-black/75 w-full h-full z-[100] flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, type: "tween" }}
                        >
                            <Dialog
                                setClose={() => setDialog(false)}
                                eventHandler={() => {
                                    deleteHandler(toDelete);
                                    setDialog(false);
                                }}
                            />
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </motion.span>
    )
}

export default NavItem;