import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";


import LogoSvg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal';

export function Header(){
    return(
        <HeaderContainer>
            <HeaderContent>
                <img src={LogoSvg} alt="" />

                <Dialog.Root>
                    {/* A propriedade asChild impede que o Dialog crie um novo botão e passe para o NewTransactionButton as suas funcionalidades */}
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>Nova transação</NewTransactionButton>
                    </Dialog.Trigger>

                    <NewTransactionModal />
                    
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}