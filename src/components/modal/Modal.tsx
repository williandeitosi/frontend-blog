import style from './Modal.module.css';

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: modalProps) {
  if (!isOpen) return null;
  return (
    <>
      <div className={style.modalOverlay}></div>
      <div className={style.modal}>
        <div>
          <h2>Criar um novo post</h2>
          <p>Preencha o formulário para criar uma nova postagem no blog.</p>
        </div>
        <div className={style.inputsArea}>
          <div className={style.boxInputs}>
            <label htmlFor=''>Titulo</label>
            <input type='text' />
          </div>
          <div className={style.boxInputs}>
            <label htmlFor=''>Counteudo</label>
            <textarea name='' id=''></textarea>
          </div>
          <div className={style.boxInputs}>
            <label htmlFor=''>Autor</label>
            <input type='text' />
          </div>
        </div>
        <div className={style.boxBtns}>
          <button onClick={onClose} className={style.btncancel}>
            Cancelar
          </button>
          <button className={style.btnPublic}>Publicar</button>
        </div>
      </div>
    </>
  );
}
