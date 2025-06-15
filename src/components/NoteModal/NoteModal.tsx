import { createPortal } from "react-dom"
import NoteForm from "../NoteForm/NoteForm "
import css from "./NoteModal.module.css"
import type { createNoteValues } from "../../types/note"
import { useEffect } from "react"

interface ModalProps {
    onClose: () => void
    onSubmitNote: (note: createNoteValues) => void
}
export default function NoteModal({ onClose, onSubmitNote }: ModalProps) {

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
    };
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            onClose();
          }
        };
        
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
          document.body.style.overflow = "";
        };
    }, [onClose]);
    
    
    return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
        <div className={css.modal}>
            <NoteForm onClose={onClose} onSubmit={onSubmitNote}/>
        </div>
    </div>,
    document.body
    )
};