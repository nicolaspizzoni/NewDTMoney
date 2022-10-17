import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react'
import { Content, Overlay, CloseButton } from './styles';

export function NewTransactionModal() {
    return (
        <Dialog.Portal>
            {/* Portals servem para que as tags fiquem em outro lugar na build final */}
            <Overlay />
            {/* Dialog.Overlay é o fundo preto da modal */}

            <Content>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <Dialog.Title>Nova Transação</Dialog.Title>

                <form action="">
                    <input type="text" placeholder="Descrição" required />
                    <input type="number" placeholder="Preço" required />
                    <input type="text" placeholder="Categoria" required />

                    <button type="submit">
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}