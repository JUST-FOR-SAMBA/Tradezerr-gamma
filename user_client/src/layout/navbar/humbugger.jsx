import { useRecoilState } from 'recoil';
import { HamburgerV, RevHumberger } from '../../component/_modules/_vetors';
import { toggleSidebar } from '../../lib/atoms';

const Humbugger = () => {
    const [isToogleDisplayed, setIsToogleDisplayed] =
        useRecoilState(toggleSidebar);
    const openSidebar = () => {
        setIsToogleDisplayed(!isToogleDisplayed);
    }
    return (
        <>
            <button onClick={openSidebar} className='hover:translate-x-1 ease-in-out xl:hidden duration-300 '>
                <HamburgerV className={`${isToogleDisplayed ? 'hidden' : ''} w-4 h-4  ease-in-out duration-300`} />
                <RevHumberger className={`${isToogleDisplayed ? '' : 'hidden'} w-4 h-4  ease-in-out duration-300`} />
            </button>
        </>
    )
}

export default Humbugger;