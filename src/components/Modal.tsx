import { createPortal } from 'react-dom';

function Modal({ children }: { children: React.ReactNode }) {
  return createPortal(
    children,
        document.getElementById("modal-root") as HTMLElement
    );
}

export default Modal;
