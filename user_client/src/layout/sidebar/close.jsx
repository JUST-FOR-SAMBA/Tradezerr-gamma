import { useRecoilState } from 'recoil';
import { TimesV } from '../../component/_modules/_vetors';
import { toggleSidebar } from '../../lib/atoms';

const CloseToggle = () => {
    const [isToogleDisplayed, setIsToogleDisplayed] =
        useRecoilState(toggleSidebar);
    const openSidebar = () => {
        setIsToogleDisplayed(!isToogleDisplayed);
    }
    return (
        <>
            <button onClick={openSidebar} className='hover:translate-x-1  ease-in-out md:hidden duration-300 '>
                <TimesV className={`w-4 h-4`} />
            </button>
        </>
    )
}

export default CloseToggle;