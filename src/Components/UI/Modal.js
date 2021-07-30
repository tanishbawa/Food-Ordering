import ReactDom from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = props => {
    return <div onClick={() => props.onBackdropClick()} className={classes.backdrop}></div>
}
const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const Modal = (props) => {
    const portalElement = document.getElementById('overlays');
    return (
        <>
            {ReactDom.createPortal(<Backdrop onBackdropClick={props.onCloseCart}/>, portalElement)}
            {ReactDom.createPortal(<ModalOverlay >{props.children}</ModalOverlay>, portalElement)}
        </>
    );
}

export default Modal;