
import { useState } from "react";
import useTodo from "../../../store/todo";
import "./style.scss";
import { ToastContainer, toast } from 'react-toastify';

const Modal = ({ setOpenModal, task }) => {
    
    const { todo, editTodo } = useTodo();

    const [name, setName] = useState(task?.name || "");
    const [phone, setPhone] = useState(task?.phone || "");
    const [email, setEmail] = useState(task?.email || "");
    const [telegram, setTelegram] = useState(task?.telegram || "");

    const editContact = () => {
        const newContact = {
            id: task.id,
            name,
            phone,
            email,
            telegram
        }

        const updateContact = todo.map(item => 
            item.id === newContact.id ? newContact : item
        )
        editTodo(updateContact)

        toast.success("Contact successfully edited!", {autoClose: 1000})
        setOpenModal(false);
    }


    return (
        <div className="modal-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center">
             <ToastContainer/>
            <div className="bg-white shadow-lg rounded-md flex flex-col gap-y-5 w-[400px] p-10 relative">
                <h2 className="text-center text-xl tracking-wide font-bold">Edit Contact</h2>
                <i onClick={() => setOpenModal(false)} className='bx bx-x absolute top-[-50px] right-[-50px] text-white text-4xl border rounded-md cursor-pointer hover:text-black hover:bg-white'></i>
                <label htmlFor="name">
                    <p className="text-sm mb-1">Name:</p>
                    <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" placeholder="Name" className="rounded-md w-full" />
                </label>
                <label htmlFor="phone">
                    <p className="text-sm mb-1">Phone:</p>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" type="number" placeholder="Name" className="rounded-md w-full" />
                </label>
                <label htmlFor="email">
                    <p className="text-sm mb-1">Eamil:</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Name" className="rounded-md w-full" />
                </label>
                <label htmlFor="telegram">
                    <p className="text-sm mb-1">Telegram:</p>
                    <input value={telegram} onChange={(e) => setTelegram(e.target.value)} id="telegram" type="text" placeholder="Name" className="rounded-md w-full" />
                </label>
                
                <button onClick={() => editContact()} className="bg-green-600 hover:bg-green-400 hover:text-black border duration-300 hover:border-green-600 text-white py-2 rounded-md text-[18px] font-bold tracking-[1px] outline-none">Edit</button>
            </div>
        </div>
    );
};

export default Modal;